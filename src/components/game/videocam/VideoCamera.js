import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Peer from "simple-peer";

import socket from "../../../webSocket";

import "./VideoCamera.css";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <video playsInline autoPlay ref={ref} />;
};

function VideoCamera(props) {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    console.log(props.host);
    console.log(props.currentPlayers);

    if (props.host) {
      console.log("HOST PATH");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (props.host) {
            userVideo.current.srcObject = stream;
          }
          console.log("JOINED ROOM");
          console.log("MY ID: " + socket.id);

          props.currentPlayers.forEach((player) => {
            if (
              player.id !== socket.id &&
              !peersRef.current.find((p) => p.peerID === player.id)
            ) {
              console.log("CREATE PEER FOR " + player.id);
              const peer = createPeer(player.id, socket.id, stream);
              peersRef.current.push({
                peerID: player.id,
                peer,
              });
              peers.push(peer);
              setPeers(peers);
            }
          });

          socket.on("user left", (player) => {
            console.log("USER LEFT WITH ID " + player.id);
            const item = peersRef.current.find((p) => p.peerID === player.id);

            item.peer.destroy();
            peersRef.current.splice(peersRef.current.indexOf(item), 1);
            setPeers(peers.splice(peers.indexOf(item.peer), 1));
          });

          socket.on("user joined", (payload) => {
            console.log("NEW USER JOINED");
            console.log("ADDED PEER FOR " + payload.callerID);

            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((users) => [...users, peer]);
          });

          socket.on("receiving returned signal", (payload) => {
            console.log("GOT ANSWER FROM PEER");
            const item = peersRef.current.find((p) => p.peerID === payload.id);

            console.log("SIGNAL PEER");

            item.peer.signal(payload.signal);
          });

          return stream;
        });
    } else {
      console.log("NON-HOST PATH");

      console.log("JOINED ROOM");
      console.log("MY ID: " + socket.id);

      socket.on("user joined", (payload) => {
        console.log("NEW USER JOINED");
        console.log("ADDED PEER FOR " + payload.callerID);

        const peer = addPeer(payload.signal, payload.callerID);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers((users) => [...users, peer]);
      });
    }
  }, [peers, props.currentPlayers, props.host, props.roomID]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {
      console.log("SENDING SIGNAL TO " + userToSignal);
      socket.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    console.log("INSIDE ADD PEER FUNCTION");

    peer.on("signal", (signal) => {
      console.log("RETURNING SIGNAL TO " + callerID);
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);
    console.log("SIGNAL PEER");

    return peer;
  };

  return (
    <div className="container">
      <video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
}

VideoCamera.propTypes = {
  host: PropTypes.bool.isRequired,
  currentPlayers: PropTypes.array.isRequired,
  roomID: PropTypes.string.isRequired,
};

export default VideoCamera;
