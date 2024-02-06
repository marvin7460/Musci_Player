// App.js

import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ReactLoading from 'react-loading';
import { helpHttp } from './helpers/helpHttp';
import Cancion from './componentes/Cancion';
import List from './componentes/Lista';

function App() {
  const [canciones, setcanciones] = useState([]);
  const [canrep, setcanrep] = useState(null); // Eliminé la verificación innecesaria aquí
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [load, setLoad] = useState(true); // Cambié el nombre de la variable a camelCase
  const [animationClass, setAnimationClass] = useState('');

  let api = helpHttp;
  let url = "http://localhost:3001/canciones";

  useEffect(() => {
    setLoad(true);
    api().get(url).then((res) => {
      if (res.length > 0) {
        setcanciones(res);
        setcanrep(res[0]);
      }
      setLoad(false);
    });
  }, [api, url]);

  useEffect(() => {
    audioRef.current.src = canrep?.audio || '';
  }, [canrep]);


  const back = () => {
    const currentIndex = canciones.findIndex((song) => canrep && song.id === canrep.id);
    const previousIndex = (currentIndex - 1 + canciones.length) % canciones.length;
    setcanrep(canciones[previousIndex]);
    audioRef.current.load(); // Cargar la nueva canción
    setAnimationClass('fadeInOut'); // Aplicar la clase de animación
  };
  
  const cont = () => {
    const currentIndex = canciones.findIndex((song) => canrep && song.id === canrep.id);
    const nextIndex = (currentIndex + 1) % canciones.length;
    setcanrep(canciones[nextIndex]);
    audioRef.current.load(); // Cargar la nueva canción
    setAnimationClass('fadeInOut'); // Aplicar la clase de animación
  };
  
  const play = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    const currentIndex = canciones.findIndex((song) => canrep && song.id === canrep.id);
    const nextIndex = (currentIndex + 1) % canciones.length;
    setcanrep(canciones[nextIndex]);
    audioRef.current.load(); // Cargar la nueva canción
    audioRef.current.play(); // Reproducir la nueva canción
    setAnimationClass('fadeInOut'); // Aplicar la clase de animación
  };

  useEffect(() => {
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.currentTime = 0;
      setAnimationClass(''); // Quitar la clase de animación al finalizar
    };
  }, [canrep, canciones]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
      setAnimationClass(''); // Quitar la clase de animación al finalizar
    };
  }, [audioRef]);

  return (
    <div className="App">
      {load && <ReactLoading type={'balls'} color={'#ffffff'} height={'20%'} width={'20%'} />}
      {canrep && 
        <div className={`CancionContainer ${animationClass}`}>
          <Cancion
            imagen={canrep?.img || 'UnaBala'}
            atras={back}
            next={cont}
            img={canrep?.img}
            play={play}
            nombre={canrep?.nombre}
            artista={canrep?.artista}
            audio={canrep?.audio}
          />
        </div>
      }
      {canrep && <div className="ListaContainer" >
       <List canciones={canciones} setcanrep={setcanrep} canrep={canrep} />
      </div>}
      
    </div>
  );
}

export default App;
