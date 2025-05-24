import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './CSS/Home.css';
import { Carousel, Card } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
            titulo: "Estudiantes cosechan sus primeros alimentos en la huerta escolar.",
            descripcion: "Luego de meses de trabajo colaborativo, los estudiantes lograron recolectar la primera cosecha de lechugas, zanahorias y aromáticas, lo cual demuestra el éxito del aprendizaje práctico en agricultura sostenible.",
            imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/semana/LVUAQGWWWBB5LAS3QACL7QRN7I.jpg"
        },
        {
            titulo: "Niños de primaria presentan sus videojuegos creados en Scratch.",
            descripcion: "En una feria tecnológica escolar, los estudiantes mostraron juegos interactivos desarrollados por ellos mismos, aplicando conceptos básicos de programación y lógica matemática.",
            imagen: "https://miro.medium.com/v2/resize:fit:1200/0*76NpWjSxoxgmlKxX.png"
        },
        {
            titulo: "Campaña estudiantil logra reducir el consumo de agua en un 30%.",
            descripcion: "Gracias a la campaña “Cuidemos cada gota”, liderada por los estudiantes, la institución logró reducir significativamente el uso del agua mediante acciones educativas y rutinas de ahorro.",
            imagen: "https://w3.fcq.unc.edu.ar/sites/default/files/styles/noticias/public/noticias/placa_campana_agua.png?itok=KOxYhv4_"
        },
        {
            titulo: "Club de lectura lanza su primera antología de cuentos estudiantiles.",
            descripcion: "Los integrantes del club publicaron una recopilación de cuentos escritos por ellos, como resultado de los encuentros literarios y ejercicios de escritura creativa realizados durante el semestre.",
            imagen: "https://biblored.gov.co/sites/default/files/2022-10/CLUBES.jpg"
        }
    ];
  if (!user) {
    return (
      <Box className="Cargando">
        <CircularProgress />
      </Box>
    );
  }
    return (
        <div>
            {/* Carrusel */}
            <div className="CarruselContainer">
                <Carousel fade controls indicators>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://afaesmolinar.com/wp-content/uploads/2023/03/hort-escolar-amipa-es-molinar.jpg"
                            alt="Huerta Escolar Agroecológica"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Huerta Escolar Agroecológica</h3>
                                <p>Promueve el aprendizaje práctico sobre agricultura sostenible mediante la creación y cuidado de una huerta escolar.</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://digikids-wp.s3.eu-west-1.amazonaws.com/wp-content/uploads/2023/06/28130844/Blog-Scratch-Digikids.png"
                            alt="Aprendamos a Programar con Scratch"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Aprendamos a Programar con Scratch</h3>
                                <p>Introduce a los estudiantes en la programación básica usando Scratch, fomentando lógica y creatividad.</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.www.gob.pe/uploads/document/file/4269040/standard_WhatsApp-Image-2023-03-14-at-17.24.51-1.jpeg.jpeg"
                            alt="Guardianes del Agua"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Guardianes del Agua</h3>
                                <p>Sensibiliza sobre el uso responsable del agua a través de campañas dirigidas por los estudiantes.</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://media.timeout.com/images/102777848/750/422/image.jpg"
                            alt="Club de Lectura Juvenil"
                        />
                        <Carousel.Caption>
                            <div className="CarruselTexto">
                                <h3>Club de Lectura Juvenil</h3>
                                <p>Fomenta la lectura y la escritura creativa mediante encuentros literarios entre estudiantes.</p>
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
            {/* Redes sociales */}
            <div className="RedesSociales">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-square"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-tiktok"></i>
                </a>
            </div>

            {/* Credenciales */}
            <footer className="Credenciales">
                Plataforma desarrollada por [Tu Nombre o Institución] - 2025. Todos los derechos reservados.
            </footer>

        </div>
    );
};