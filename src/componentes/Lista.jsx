import React from "react";
import "../estilos/lista.css";

const List = ({ canciones, handleDelete , canrep}) => {
    //saber que cancion de canciones se esta reproduciendo y cambiar el icono
    const cancionActual = canrep;

    const handleClick = (item) => {
        // Suponiendo que tienes una función para establecer la canción que se está reproduciendo actualmente
        console.log(item)
    };

    return (
        <div className="list">
            <div className="list-main">
                <ul>
                    {canciones.map((item, index) => (
                        <li key={index} className={item.nombre===cancionActual.nombre?'es':'noes' } onClick={() => handleClick(item)}> 
                            <img src={require(`../imagenes/${item.img}.jpg`)} alt="cancion" className="imgs" />
                            <h3>{item.nombre}</h3>
                            <h4>{item.artista}</h4>
                            <audio src={require(`../canciones/${item.audio}.mp3`)} type="audio/mp3" id="musica" />
                        
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default List;