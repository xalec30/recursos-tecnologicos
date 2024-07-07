import placeholder from "../../assets/img/placeholder.webp";

export default function ModalResourceDetails({title,open,changeModal,shortDescription,description,url}:any){

    return(
        <div className={(open) ? "modal is-active": 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card p-4">
                <header className="modal-card-head ">
                    <p className="modal-card-title">Detalles</p>
                    <button className="delete" aria-label="close" onClick={() => changeModal(false)}></button>
                </header>
                <section className="modal-card-body p-4">
                   <div className="columns is-multiline">
                        <div className="column is-12">
                            <h3 className="subtitle is-3">{title}</h3>
                        </div>
                        <div className="column is-12">
                            <figure className="image is-5by3">
                                <img src={placeholder} />
                            </figure>
                        </div>
                        <div className="column is-12 ">
                            <a target="_blank" className="button is-ghost p-0" href={url}>Ver URL</a>
                        </div>
                        <div className="column is-12 mt-2">
                            <p>{shortDescription}</p>
                        </div>
                        <div className="column is-12 mt-2">
                            <p>{description}</p>
                        </div>
                   </div>
                </section>
                <footer className="modal-card-foot p-4">
                    
                </footer>
            </div>
        </div>
    )
}