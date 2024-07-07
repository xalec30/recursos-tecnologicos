import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import ItemMenu from "../ItemMenu/ItemMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "../../Provider/ThemeProvider";
import { NavLink } from "react-router-dom";

export default function PanelAdmin(){
    
    const Auth = useAuth();
    const user =  JSON.parse(Auth.user);
    const theme = useTheme();
    const [menuDropdown,setMenuDropdown] = useState(false);

    const handlerDropdown = () => {
        setMenuDropdown(prevState => {
            return !prevState;
        })
    }
    
    return(
        <>
            <aside className="column is-one-fifth menu p-3 border-right is-hidden-mobile">
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
            <aside className={(theme.theme == "light") ?  "column is-one-fifth menu p-3 is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only has-background-light" : "column has-background-dark is-one-fifth menu p-3 is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"}>

                <div className={(menuDropdown) ? "dropdown w-100 pt-4 pr-4 pl-4 is-active" : 'dropdown w-100 pt-4 pr-4 pl-4'}>
                    <div className="dropdown-trigger w-100">
                        <button className="button is-link w-100" onClick={() => handlerDropdown()} aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Panel de administraci&oacute;n</span>
                        <span className="icon is-small is-position-right">
                        { (menuDropdown) ?  <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} /> }
                        </span>
                        </button>
                    </div>
                    <div className="dropdown-menu w-100 pb-4 pr-4 pl-4" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <NavLink className={({isActive}) => { return isActive ?  'dropdown-item is-active' : 'dropdown-item'}} to={ '/dashboard/resources'}>Recursos</NavLink>
                            <NavLink className={({isActive}) => { return isActive ?  'dropdown-item is-active' : 'dropdown-item'}} to={ '/dashboard/categories'}>Categorias</NavLink>
                            <NavLink className={({isActive}) => { return isActive ?  'dropdown-item is-active' : 'dropdown-item'}} to={ '/dashboard/tags'}>Etiquetas</NavLink>
                            <NavLink className={({isActive}) => { return isActive ?  'dropdown-item is-active' : 'dropdown-item'}} to={ '/dashboard/users'}>Usuarios Registrados</NavLink>
                            <NavLink className={({isActive}) => { return isActive ?  'dropdown-item is-active' : 'dropdown-item'}} to={ '/dashboard/roles'}>Roles</NavLink>
                        </div>
                    </div>
                </div> 
            </aside>
        </>
    )
}