import { changeTitleHeader } from "../../Utils/utils";
import { useEffect } from "react";

export default function Favorites(){

    useEffect(() => {
        changeTitleHeader('Favoritos');
    },[]);

    return(
        <>
        </>
    )

}