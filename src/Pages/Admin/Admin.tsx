import { useEffect } from "react";
import { changeTitleHeader } from "../../Utils/utils";

export default function Admin(){

    useEffect(() => {
        changeTitleHeader('Panel de Aministración');
    },[]);

    return(
        <>
    
        </>
    )
}