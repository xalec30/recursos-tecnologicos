import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";

import ItemMenu from "../ItemMenu/ItemMenu";

export default function PanelAdmin(){
    
    const Auth = useAuth();
    const user =  JSON.parse(Auth.user);

    return(
        <aside className="column is-one-fifth menu p-3 border-right">
             <div className="p-3">
                <ul className="menu-list">
                    <ItemMenu name="Pagina Principal" href="/dashboard/overview"/>
                    {
                        (user.role_id == 1) ? (
                            <>
                            <ItemMenu name="Recursos" href="/dashboard/resources"/>
                            <ItemMenu name="Categorias" href="/dashboard/categories"/>
                            <ItemMenu name="Etiquetas" href="/dashboard/tags"/>
                            <ItemMenu name="Usuarios Registrados" href="/dashboard/users"/>
                            <ItemMenu name="Roles" href="/dashboard/roles"/>
                            </>
                        ): ''
                    }
                </ul>
             </div>
        </aside>
    )
}