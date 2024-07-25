export default function LicenseAgreement({open,changeOpen}:any){

    return(
        <div className={(open) ? "modal is-active" : 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Acuerdo de licencia y politica de privacidad</p>
                <button className="delete" aria-label="close" onClick={() => changeOpen()}></button>
                </header>
                <section className="modal-card-body" style={{borderBottomLeftRadius:'0.75rem',borderBottomRightRadius:'0.75rem',}}>
                    <h6 className="title is-6">Política de privacidad de Tecnohub</h6>
                    <h6 className="title is-6">INFORMACIÓN PERSONAL QUE RECOPILAMOS</h6>
                    <p>
                        Cuando visita el Sitio, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies que están instaladas en su dispositivo. Además, a medida que navega por el Sitio, recopilamos información sobre las páginas web individuales o los productos que ve, las páginas web o los términos de búsqueda que lo remitieron al Sitio e información sobre cómo interactúa usted con el Sitio. Nos referimos a esta información recopilada automáticamente como “Información del dispositivo”.
                    </p>
                    <br/>
                    <h6 className="title is-6">¿CÓMO UTILIZAMOS SU INFORMACIÓN PERSONAL?</h6>
                    <p>
                        Usamos la Información del USUARIO que recopilamos en general para preparar los pedidos realizados a través del Sitio (incluido el procesamiento de su información de pago, la organización de los envíos y la entrega de facturas y/o confirmaciones de pedido).  Además, utilizamos esta Información del pedido para: comunicarnos con usted;
                    </p>
                    <br/>
                    <h6 className="title is-6">NO RASTREAR</h6>
                    <p>
                        Tenga en cuenta que no alteramos las prácticas de recopilación y uso de datos de nuestro Sitio cuando vemos una señal de No rastrear desde su navegador.
                    </p>
                    <br/>
                    <h6 className="title is-6">RETENCIÓN DE DATOS</h6>
                    <p>
                        Cuando realiza un pedido a través del Sitio, mantendremos su Información del pedido para nuestros registros a menos que y hasta que nos pida que eliminemos esta información.
                    </p>
                    <br/>
                    <p> Maracay, VE-D, 2101, Venezuela</p>
                </section>
            </div>
        </div>
    )
}