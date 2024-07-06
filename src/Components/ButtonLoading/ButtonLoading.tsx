import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

export default function ButtonLoading({}:any){
    return (
        <button className="button is-link">
             <span className="icon">
                <FontAwesomeIcon icon={faArrowsRotate} />
            </span>
            <span>Cargar Mas</span>
        </button>
    )
}