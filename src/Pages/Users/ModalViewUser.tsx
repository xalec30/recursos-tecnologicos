export default function ModalViewUser({open,changeOpen,username,firstName,middleName,lastName,email}:any){

    document.querySelectorAll('.modal-background').forEach(($el) => {

        $el.addEventListener('click',() => {
            changeOpen(false);
        })
    });

    return(
        <div className={(open) ? "modal is-active": 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head border-bottom">
                    <p className="modal-card-title">Detalles del Usuario</p>
                    <button className="delete" aria-label="close" onClick={() => changeOpen(false)}></button>
                </header>
                <section className="modal-card-body">
                    <form method='post'>
                        <div className="field-body">    
                            <div className="field mt-4">
                                <label className="label">Usuario</label>
                                <span>{username}</span>
                            </div>
                        </div>
                        <div className="field-body">    
                            <div className="field mt-4">
                                <label className="label">Primer Nombre</label>
                                <span>{firstName}</span>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Segundo Nombre</label>
                                <span>{middleName}</span>
                            </div>
                        </div>
                        <div className="field-body">
                            <div className="field mt-4">
                                <label className="label">Apellido</label>
                                <span>{lastName}</span>
                            </div>
                            <div className="field mt-4">
                                <label className="label">Correo Electronico</label>
                                <span>{email}</span>
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot p-1">
                
                </footer>
            </div>
        </div>
    )
}