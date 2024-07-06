import { useEffect,useState } from "react";
import codeigniter from "../../Utils/axios";

export default function ModalRole({open,title,changeOpen,titleButton,name,capabilitiesRole,id}:any){

    const [rolId,setRolId] = useState(0);
    const [notificationError,setNotificationError] = useState<any>("");
    const [notificationSuccess,setNotificationSuccess] = useState<any>("");
    const [buttonIsLoading,setButtonisLoading] = useState(false);
    const [rolName,setRolName] = useState("");
    const [capabilities,setCapabilities] = useState([]);

    const getCapabilities = async() => {
        await codeigniter.get('/capabilities').then((response) => {
            setCapabilities(response.data);
        })
    }

    useEffect(() => {
        getCapabilities();
    },[]);

    useEffect(() => {

        if(name == ""){

            setRolName("");
            setRolId(0);

            document.querySelectorAll('.capabilitie').forEach((cap:any) => {
                cap.checked = false;
            })
            
        }else{
           
            setRolName(name);
            setRolId(id);

            document.querySelectorAll('.capabilitie').forEach((cap:any) => {
    
                if(capabilitiesRole.includes(cap.getAttribute('data-id'))){
                    cap.checked = true;
                }else{
                    cap.checked = false;
                }
            }); 
        }


    },[name]);

    const handlerName = (e:any) => {
        setRolName(e.currentTarget.value);
        setNotificationError("");
    }

    const handlerCapabilitie = () => {
        setNotificationError("");
    }

    const updateRole = async() => {

        let $capabilitiesGroup:any = [];

        setButtonisLoading(true);
        setNotificationError(false);

        if(!rolName){
            setButtonisLoading(false);
            setNotificationError("Campo Nombre es requerido");
            return
        }

        document.querySelectorAll('.capabilitie').forEach((capabilitie:any) => {

            if(capabilitie.checked == true){
                $capabilitiesGroup.push(capabilitie.getAttribute('data-id'));
            }
        }) 
     
        if($capabilitiesGroup.length == 0){
            setNotificationError("Debe seleccionar una(s) capacidad(es)");
            setButtonisLoading(false);
            return;
        }

        //create;
        if(rolId == 0){

            await codeigniter.post('/roles',{
                'name' : rolName,
                'capabilities': $capabilitiesGroup, 
              }).then(() => {
                setNotificationSuccess("Rol Creado");
            
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
        
        //update
        }else{
             
            await codeigniter.put('/roles/' + rolId,{
                'name' : rolName,
                'capabilities': $capabilitiesGroup, 
            }).then(() => {
                
                setNotificationSuccess("Rol Actualizado");
                
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
                            <label className="label">Nombre de Rol <span className="has-text-danger">*</span></label>
                            <div className="control">
                                <input className="input" onKeyUp={(e) => handlerName(e)} defaultValue={rolName} type="text" placeholder="" />
                            </div>
                        </div>
                        <div className="field mt-4">
                            <label className="label">Capacidades<span className="has-text-danger">*</span></label>
                            
                        </div>
                        {

                            (capabilities.length > 0) ? 

                                capabilities.map((capabilitie:any) => {

                                    return(
                                        <div key={capabilitie.id}>
                                            <label className="checkbox">
                                                <input className="capabilitie" onChange={() => handlerCapabilitie()} data-id={capabilitie.id} type="checkbox" />
                                                &nbsp; {capabilitie.name}
                                            </label>
                                        </div>
                                    )
                                })



                            : (
                                ""
                            )
                        }
                       

                    </form>
                </section>
                <footer className="modal-card-foot p-4">
                    <div className="buttons">
                        <button className={(buttonIsLoading) ? "button is-link is-loading" : 'button is-link'} onClick={() => updateRole()}>{titleButton}</button>
                        <button className="button" onClick={() => changeOpen(false)}>Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}