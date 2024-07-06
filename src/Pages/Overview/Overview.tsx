import { useTheme } from '../../Provider/ThemeProvider';
import { changeTitleHeader } from '../../Utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faGithub,faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Overview(){

    const theme = useTheme();
    changeTitleHeader('Pagina Principal');


    return(
        <main className={(theme.theme == "light") ? "column is-four-fifths-desktop has-background-light pb-4 vh-100 is-full-mobile mt-4" : 'column is-four-fifths-desktop vh-100 has-background-dark pb-4 is-full-mobile mt-4'}>
            <div className="columns is-multiline p-3">
                <div className='column is-12 mt-4'>
                    <div className="tags are-large">
                        <h1 className='title is-4'>Bienvenidos a tu Centro de Recursos Tecnológicos! &nbsp;<FontAwesomeIcon icon={faRocket} /></h1>
                    </div>
                </div>
                
                <div className='column is-12'>
                   <p>En este espacio encontrarás una amplia gama de recursos para ayudarte a aprovechar al máximo la tecnología en tu vida personal y profesional.</p>
                </div>
                <div className='column is-12'>
                   <h2 className="title is-5">¿Qué puedes encontrar aquí?</h2>
                </div>
                <div className='column is-12'>
                    <div className="content">
                        <ul>
                            <li><strong>Herramientas de desarrollo: </strong> Editores de código, compiladores, depuradores, IDEs, y más.</li>
                            <li><strong>Bibliotecas y marcos de trabajo:</strong> Código pre-escrito que puede ser usado para ahorrar tiempo y esfuerzo.</li>
                            <li><strong>Tutoriales y documentación:</strong> Guías paso a paso y documentación técnica para ayudar a los desarrolladores a aprender a usar las herramientas y tecnologías.</li>
                            <li><strong>Foros y comunidades:</strong> Lugares donde los desarrolladores pueden hacer preguntas, compartir conocimientos y colaborar en proyectos.</li>
                            <li><strong>Noticias y actualizaciones: </strong> Información sobre las últimas herramientas, tecnologías y tendencias en el desarrollo de software.</li>
                        </ul>
                    </div>
                </div>
                <div className='column is-12'>
                   <h2 className="title is-5">¿Tienes alguna pregunta?</h2>
                </div>
                <div className='column is-12'>
                    <p>No dudes en contactarnos a través de nuestro formulario de contacto o en nuestras redes.</p>
                </div>
                <div className='column is-12'>
                    <div className="column is-6">
                        <a target="_blank" className='p-2' href="https://github.com/xalec30">
                            <FontAwesomeIcon icon={faGithub} size="3x" />
                        </a>
                        <a target="_blank" className='p-2' href="https://www.linkedin.com/in/alexander-rodriguez-79aa01a6/">
                            <FontAwesomeIcon icon={faLinkedin} size="3x" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}