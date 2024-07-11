import placeholder from "../../assets/img/placeholder.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

export default function CardResource({eventModal,name,shortDescription,description,url}:any){
    
    return(
        <div className="column is-one-third-desktop is-full-mobile">
            <div className="card card-resource pulse">
                <div className="card-image">
                    <a target="_blank" href={url}>
                        <figure className="image is-3by2">
                            <img src={placeholder} />
                        </figure>
                    </a>
                </div>
                <div className="card-content">
                    <div className="content">
                        <div className="content-description">
                            <div className="w-50">
                                <h6 className="mb-0">{name}</h6>
                            </div>
                            <div className="w-50 has-text-right">
                                <span className="p-1 button-like">
                                    <FontAwesomeIcon className="color-filled-red" icon={faHeart} />
                                </span>
                                <span className="p-1 button-comment">
                                    <FontAwesomeIcon className="color-filled-yellow" icon={faComment}/>
                                </span>
                            </div>
                            <div className="w-100 mt-2">
                                <p>{shortDescription}</p>
                            </div>
                            <div className="w-100 mt-1">
                                <button data-name={name} data-url={url} data-short-description={shortDescription} data-description={description} onClick={(e) => eventModal(e)} className="button is-ghost p-0">Ver mas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}