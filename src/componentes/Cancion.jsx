import React, { useState, useEffect } from "react";
import "../estilos/cancion.css";

function Cancion(props) {
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById("musica");

    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
    };

    audioElement.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audioElement.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  const play = () => {
    const audioElement = document.getElementById("musica");

    if (audioLoaded) {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };

  return (
    <div className="cajita-musica">
      <img src={require(`../imagenes/${props.img}.jpg`)} alt="cancion" className="imgs" />
      <h3>{props.nombre}</h3>
      <h4>{props.artista}</h4>
      <div className="movilidad">
        <audio src={require(`../canciones/${props.audio}.mp3`)} type="audio/mp3" id="musica" />
        <img
          className="back"
          alt="back"
          src={require("../imagenes/iconos/back.png")}
          onClick={props.atras}
        />
        <img
          className="play"
          alt="play/pause"
          src={require("../imagenes/iconos/play.png")}
          onClick={play}
        />
        <img
          className="next"
          alt="next"
          src={require("../imagenes/iconos/next.png")}
          onClick={props.next}
        />
      </div>
    </div>
  );
}

export default Cancion;
