export default function ButtonLoading({onClick}:any){


    return (
        <button className="button is-link" onClick={onClick}>
            <span>Cargar Mas</span>
        </button>
    )
}