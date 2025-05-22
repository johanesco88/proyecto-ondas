import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './CSS/Home.css';
import { Carousel, Card } from 'react-bootstrap';

export const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    const noticias = [
        {
            titulo: "Convocatoria Sakura Program 2024",
            descripcion: "El Gobierno de Japón, a través de la Agencia de Ciencia y Tecnología del Japón (JST), con el apoyo del Ministerio de Educación, Cultura, Deporte...",
            imagen: "https://ondas.minciencias.gov.co/sites/default/files/styles/imagen_noticia/public/2024-03/convocatoria_sakura.jpg"
        },
        {
            titulo: "Misión Ondas México",
            descripcion: "¡Inscríbete hasta el 16 de abril! En el marco de las estrategias de movilidad y divulgación el programa Ondas en alianza con universidades mexicanas...",
            imagen: "https://ondas.minciencias.gov.co/sites/default/files/styles/imagen_noticia/public/2024-03/mision_ondas_mexico.jpg"
        },
        {
            titulo: "Convocatorias 2024",
            descripcion: "El programa Ondas inicia el 2024 abriendo 7 convocatorias departamentales para la conformación de grupos de investigación. No te pierdas la oportunidad...",
            imagen: "https://ondas.minciencias.gov.co/sites/default/files/styles/imagen_noticia/public/2024-03/convocatorias_2024.jpg"
        },
        {
            titulo: "Revive el 2023 del programa Ondas en fotos",
            descripcion: "Nuestro año de investigación en fotos tomadas por nuestros asesores Ondas en todo Colombia...",
            imagen: "https://ondas.minciencias.gov.co/sites/default/files/styles/imagen_noticia/public/2024-03/revive_2023.jpg"
        }
    ];

    return (
        <div>
            {/* Carrusel */}
            <div className="CarruselContainer">
                <Carousel fade controls indicators>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.istockphoto.com/id/2079713132/es/vector/certificaci%C3%B3n-forestal-a-partir-del-concepto-de-esquema-de-inspecci%C3%B3n-est%C3%A1ndar-ambiental.jpg?s=612x612&w=0&k=20&c=8xN7-9-T4ztouKFJly9ZYzyRg_-IxSkVWTdil4dWylk="
                            alt="Convocatoria Sakura Program 2024"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Convocatoria Sakura Program 2024</h3>
                                <p>El Gobierno de Japón, a través de la Agencia de Ciencia y Tecnología del Japón (JST), con el apoyo del Ministerio de Educación, Cultura, Deporte...</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://ondas.minciencias.gov.co/sites/default/files/styles/imagen_noticia/public/2024-03/mision_ondas_mexico.jpg"
                            alt="Misión Ondas México"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Misión Ondas México</h3>
                                <p>¡Inscríbete hasta el 16 de abril! En el marco de las estrategias de movilidad y divulgación el programa Ondas en alianza con universidades mexicanas...</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Noticias */}
            <h2 className="tituloNoticias">Noticias Recientes</h2>
            <div className="CardsNoticias">
                {noticias.map((noticia, index) => (
                    <Card className="CardNoticia" key={index}>
                        <Card.Img variant="top" src={noticia.imagen} />
                        <Card.Body>
                            <Card.Title>{noticia.titulo}</Card.Title>
                            <Card.Text>{noticia.descripcion}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};