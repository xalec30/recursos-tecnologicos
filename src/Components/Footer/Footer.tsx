import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Footer(){

    return(
        <footer className="footer p-4">
            <div className="content">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-6">
                        <p>Desarrollado por Alexander Rodriguez.</p>
                    </div>
                    <div className="column is-6 has-text-right">
                        <a target="_blank" className='p-1' href="https://github.com/xalec30">
                            <FontAwesomeIcon icon={faGithub} size="lg" />
                        </a>
                        <a target="_blank" className='p-1' href="https://www.linkedin.com/in/alexander-rodriguez-79aa01a6/">
                            <FontAwesomeIcon icon={faLinkedin} size="lg" />
                        </a>
                    </div>
                </div>
            </div>      
        </footer>
    )
}