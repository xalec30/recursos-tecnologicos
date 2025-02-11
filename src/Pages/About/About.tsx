import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer";

import react from '../../assets/svg/react.svg';
import bulma from '../../assets/svg/bulma.svg';
import codeigniter from "../../assets/svg/codeigniter.svg";
import postgresql from '../../assets/img/postgresql.png';

export default function About(){

    useEffect(() => {
        document.title = "Acerca de este proyecto";
    },[]);

    return (
        <>
            <Navbar hiddenButtonsAuth={1} />
            <div className="container p-4">
                <div className="columns is-multiline is-mobile mt-4">
                    <div className="column is-12">
                        <h1 className="title">Acerca del proyecto</h1>
                    </div>
                    <div className="column is-12">
                        <h2><strong>¿Que es esta portal?</strong></h2>
                    </div>
                    <div className="column is 12">
                        <p>Es un proyecto apasionado por el desarrollo de software, comprometido a brindar a los desarrolladores de todos los niveles las herramientas y recursos que necesitan para crear un software sorprendente. Creemos que el desarrollo de software debe ser accesible, gratificante y divertido.</p>
                    </div>
                    <div className="column is-12">
                        <h2><strong>¿Que hacemos aqui?</strong></h2>
                    </div>
                    <div className="column is-12">
                        <p>Ofrecemos una amplia gama de herramientas tecnológicas y recursos para ayudar a los desarrolladores a ser más productivos y eficientes. Nuestro portal incluye:</p>
                    </div>
                    <div className="content">
                        <ol type="1">
                            <li><strong>Herramientas de desarrollo: </strong> Editores de código, compiladores, depuradores, IDEs, y más.</li>
                            <li><strong>Bibliotecas y marcos de trabajo:</strong> Código pre-escrito que puede ser usado para ahorrar tiempo y esfuerzo.</li>
                            <li><strong>Tutoriales y documentación:</strong> Guías paso a paso y documentación técnica para ayudar a los desarrolladores a aprender a usar las herramientas y tecnologías.</li>
                            <li><strong>Foros y comunidades:</strong> Lugares donde los desarrolladores pueden hacer preguntas, compartir conocimientos y colaborar en proyectos.</li>
                            <li><strong>Noticias y actualizaciones: </strong> Información sobre las últimas herramientas, tecnologías y tendencias en el desarrollo de software.</li>
                        </ol>
                    </div>
                    <div className="column is-12">
                        <h2><strong>¿En que se desarrollo esta pagina?</strong></h2>
                    </div>
                    <div className="content mb-4">
                        <ol type="1">
                            <li><strong>Frontend: </strong>React <img src={react} style={{width:'15px'}} /></li>
                            <li><strong>CSS: </strong>Bulma CSS <img src={bulma} style={{width:'15px'}} /></li>
                            <li><strong>Backend:</strong> Codeigniter <img src={codeigniter} style={{width:'15px'}} /></li>
                            <li><strong>Base de datos:</strong> PostgreSQL <img src={postgresql} style={{width:'15px'}} /></li>
                        </ol>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}