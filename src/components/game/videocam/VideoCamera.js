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


let client = {}

function VideoCamera(props) {
    // eslint-disable-next-line no-unused-vars
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    // eslint-disable-next-line no-unused-vars
    const peersRef = useRef([]);
    // eslint-disable-next-line no-unused-vars
    const [roomID, setRoomID] = useState('f7f9df');

    useEffect(() => {
        console.log(props.host);

        function CreateVideo(stream){
            userVideo.current.srcObject = stream
            userVideo.current.play()
        }

        // const setUpPeer = (host, roomID, streamFormat) => {
        //     navigator.mediaDevices.getUserMedia(streamFormat).then(stream => {
        //         if (host) {
        //             userVideo.current.srcObject = stream;
        //         }
        //
        //         socket.emit("join room", roomID);
        //
        //         console.log('JOINED ROOM');
        //         console.log('MY ID: ' + socket.id);
        //
        //         socket.on("all users", users => {
        //             const peers = [];
        //             users.forEach(userID => {
        //                 console.log('CREATE PEER FOR ' + userID);
        //                 let peer;
        //                 if(host) {
        //
        //                     peer = createPeer(userID, socket.id, stream);
        //                 }
        //                 else{
        //
        //                     peer = createPeer(userID, socket.id);
        //                 }
        //                 peersRef.current.push({
        //                     peerID: userID,
        //                     peer,
        //                 });
        //                 peers.push(peer);
        //             });
        //             setPeers(peers);
        //         });
        //
        //         socket.on("user joined", payload => {
        //             console.log('NEW USER JOINED');
        //             console.log('ADDED PEER FOR ' + payload.callerID);
        //
        //             let peer;
        //
        //             if(host) {
        //
        //                 peer = addPeer(payload.signal, payload.callerID, stream);
        //             }
        //             else{
        //
        //                 peer = addPeer(payload.signal, payload.callerID);
        //             }
        //             peer.signal(payload.signal);
        //
        //             peersRef.current.push({
        //                 peerID: payload.callerID,
        //                 peer,
        //             });
        //
        //             setPeers(users => [...users, peer]);
        //         });
        //
        //         socket.on("receiving returned signal", payload => {
        //             console.log('GOT ANSWER FROM PEER');
        //             const item = peersRef.current.find(p => p.peerID === payload.id);
        //
        //             console.log('SIGNAL PEER');
        //
        //             item.peer.signal(payload.signal);
        //         });
        //
        //         return stream;
        //     });
        // };

        if (props.host) {
            console.log('HOST PATH');

            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then(stream => {
                    socket.emit('NewClientStreamer')
                    userVideo.current.srcObject = stream;
                    userVideo.current.play()

                    socket.on('CreateClientStreamerPeer', function () {
                        let peer = new Peer({
                            initiator: true,
                            // config: configuration,
                            // iceTransportPolicy: 'relay',
                            stream: stream,
                            trickle: true
                        })
                        peer.on('stream', function (stream) {
                            CreateVideo(stream)
                        })
                        peer.on('close', function () {
                            document.getElementById("peerVideo").remove()
                            peer.destroy()
                        })
                        peer.on('signal', function (data) {
                            if (!client.gotAnswer)
                                socket.emit('Offer', data)
                        })
                        client.peer = peer
                    })

                    socket.on('Answer', function (answer) {
                        client.gotAnswer = true
                        client.peer.signal(answer)
                    })

                })
                .catch(err => document.write(err))

            // setUpPeer(true, roomID, {video: true, audio: false});
        } else {
            console.log('NON HOST PATH');

            // setUpPeer(false, roomID, {video: true, audio: false});

            socket.emit('NewClientReceiver')

            socket.on('Offer',function(offer){
                let peer = new Peer({
                    initiator: false,
                    trickle:true
                })
                peer.on('stream',function(stream){
                    CreateVideo(stream)
                })
                peer.on('signal', function(data){
                    socket.emit('ClientAnswer',data)
                })
                peer.signal(offer)
                client.peer=peer
            })
        }
    }, [props.host, roomID]);

    // eslint-disable-next-line no-unused-vars
    const createPeer = (userToSignal, callerID, stream) => {
        let peer;

        if (props.host) {
            peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            });
        } else {
            peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            });
        }

        peer.on("signal", signal => {
            console.log('SENDING SIGNAL TO ' + userToSignal);
            socket.emit("sending signal", {userToSignal, callerID, signal})
        });

        return peer;
    };

    // eslint-disable-next-line no-unused-vars
    const addPeer = (incomingSignal, callerID, stream) => {

        let peer;

        if (props.host) {
            peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream
            });
        } else {
            peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            });
        }

        console.log('INSIDE ADD PEER FUNCTION');

        peer.on("signal", signal => {
            console.log('RETURNING SIGNAL TO ' + callerID);
            socket.emit("returning signal", {signal, callerID})
        });

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