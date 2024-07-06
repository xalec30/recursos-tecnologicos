import { NavLink } from "react-router-dom";

export default function ItemMenu(props:any){

    return(
        <li>
            <NavLink className={({ isActive }) => { return isActive ? 'category has-text-weight-medium is-active' : 'category has-text-weight-medium'}} to={props.href}>{ props.name }</NavLink>
        </li>
    ) 
}