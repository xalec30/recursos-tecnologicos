import { useState,useEffect } from "react";
import codeigniter from "../../Utils/axios";

export default function ModalTag({title,open,changeOpen,titleButton,tagName,id}:any){

    const [tagId,setTagId] = useState(id);
    const [notificationError,setNotificationError] = useState<any>("");
    const [notificationSuccess,setNotificationSuccess] = useState<any>("");
    const [buttonIsLoading,setButtonisLoading] = useState(false);
    const [name,setName] = useState(""); 

    useEffect(() => {

        if(tagName != ""){
            setName(tagName);
            setTagId(id);
        }else{
            setName("");
            setTagId(0);
        }

    },[tagName]);

    const handlerName = (e:any) => {
        setNotificationError("");
        setName(e.currentTarget.value);
    }

    const updateTag = async() => {
        setButtonisLoading(true);
        setNotificationError('');

        if(!name){
            setNotificationError("Campo nombre es requerido");
            setButtonisLoading(false);
        }

        //create
        if(tagId == 0){

            await codeigniter.post('/tags',{
                'name':name,
            }).then(() => {
                setNotificationSuccess('Etiqueta creada');
                
                setTimeout(() => {
                  setNotificationSuccess('');
                  window.location.reload();
        
                },1000);
                return;
                
            }).catch((error) => {
        
                if(error.response){
                  let errors = error.response.data.messages;
                  setNotificationError(Object.values(errors)[0]);
                  setButtonisLoading(false);
                }
            });

        //update
        }else{

            await codeigniter.put('/tags/' + tagId,{
                'name' : name,
            }).then(() => {
                setNotificationSuccess('Etiqueta actualizada');

                setTimeout(() => {
                  setNotificationSuccess("");
                  window.location.reload();
        
                },1000);
                return;
            }).catch((error) => {
        
                if(error.response){
                  let errors = error.response.data.messages;
                  setNotificationError(Object.values(errors)[0]);
                  setButtonisLoading(false);
                }
            });
        }
    }

    return(
        <div className={(open) ? "modal is-active": 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head border-bottom">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={() => changeOpen(false)}></button>
                </header>
                <section className="modal-card-body">
                    <div className={(notificationError) ? "notification has-text-white is-danger" : 'notification is-danger has-text-white is-hidden'}>{notificationError}</div>
                    <div className={(notificationSuccess) ? "notification has-text-white is-success" : 'notification is-success has-text-white is-hidden'}>{notificationSuccess}</div>
                    <form method='post'>
                        <div className="field mt-4">
                            <label className="label">Nombre de Etiqueta</label>
                            <div className="control">
                                <input className="input" type="text" onChange={(e) => handlerName(e)} defaultValue={name} placeholder="" />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot p-4">
                    <div className="buttons">
                        <button className={(buttonIsLoading) ? "button is-link is-loading" : 'button is-link'} onClick={() => updateTag()}>{titleButton}</button>
                        <button className="button" onClick={() => changeOpen(false)}>Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}