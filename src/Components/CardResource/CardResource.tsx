import placeholder from "../../assets/img/placeholder.png";

export default function CardResource(){
    
    return(
        <div className="column is-one-third-desktop is-full-mobile">
            <div className="card pulse">
                <div className="card-image">
                    <a target="_blank" href="https://polyhaven.com/">
                        <figure className="image is-3by2">
                            <img src={placeholder} />
                        </figure>
                    </a>
                </div>
                <div className="card-content">
                    <div className="content">
                        <div className="content-description">
                            <div className="w-50">
                            <h6 className="mb-0">Itchio</h6>
                            </div>
                            <div className="w-50 has-text-right">
                                
                            
                            </div>
                            <div className="w-100 mt-2">
                                <p>Itch.io, también conocida como Itch.io, es una plataforma en línea que permite a los usuarios subir, distribuir y descargar videojuegos de forma gratuita o con un precio determinado por el desarrollador</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}