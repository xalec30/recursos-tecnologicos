export default function ModalDelete({title,open,changeOpen,description,deleteFunction,id}:any){

    return(
        <div className={(open) ? "modal is-active": 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head border-bottom p-4">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={() => changeOpen(false)}></button>
                </header>
                <section className="modal-card-body">
                    <p>{description}</p>
                </section>
                <footer className="modal-card-foot p-4">
                    <div className="buttons">
                        <button className="button is-danger has-text-white" onClick={() => deleteFunction(id)}>Eliminar</button>
                        <button className="button" onClick={() => changeOpen(false)}>Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}