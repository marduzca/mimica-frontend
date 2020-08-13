import React, {useEffect, useRef, useState} from 'react';
import Peer from 'simple-peer';

import socket from "../../../webSocket";

import './VideoCamera.css';

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <video playsInline autoPlay ref={ref}/>
    );
};

function VideoCamera(props) {
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [roomID, setRoomID] = useState('f7f9df');

    useEffect(() => {
        console.log(props.host);


        const setUpPeer = (host, roomID, streamFormat) => {
            navigator.mediaDevices.getUserMedia(streamFormat).then(stream => {
                if (host) {
                    userVideo.current.srcObject = stream;
                }

                socket.emit("join room", roomID);

                console.log('JOINED ROOM');
                console.log('MY ID: ' + socket.id);

                socket.on("all users", users => {
                    const peers = [];
                    users.forEach(userID => {
                        console.log('CREATE PEER FOR ' + userID);
                        const peer = createPeer(userID, socket.id, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        });
                        peers.push(peer);
                    });
                    setPeers(peers);
                });

                socket.on("user joined", payload => {
                    console.log('NEW USER JOINED');
                    console.log('ADDED PEER FOR ' + payload.callerID);

                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });

                    setPeers(users => [...users, peer]);
                });

                socket.on("receiving returned signal", payload => {
                    console.log('GOT ANSWER FROM PEER');
                    const item = peersRef.current.find(p => p.peerID === payload.id);

                    console.log('SIGNAL PEER');

                    item.peer.signal(payload.signal);
                });

                return stream;
            });
        };

        if (props.host) {
            console.log('HOST PATH');

            setUpPeer(true, roomID, {video: true, audio: false});
        } else {
            console.log('NON HOST PATH');

            setUpPeer(false, roomID, {video: {width: 1, height: 1}});
        }
    }, [props.host, roomID]);

    const createPeer = (userToSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", signal => {
            console.log('SENDING SIGNAL TO ' + userToSignal);
            socket.emit("sending signal", {userToSignal, callerID, signal})
        });

        return peer;
    };

    const addPeer = (incomingSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        console.log('INSIDE ADD PEER FUNCTION');

        peer.on("signal", signal => {
            console.log('RETURNING SIGNAL TO ' + callerID);
            socket.emit("returning signal", {signal, callerID})
        });

        peer.signal(incomingSignal);
        console.log('SIGNAL PEER');

        return peer;
    };

    return (
        <div className="container">
            <video muted ref={userVideo} autoPlay playsInline/>
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer}/>
                );
            })}
        </div>
    );
}

export default VideoCamera;