import { useEffect } from "react";
import { changeTitleHeader } from "../../Utils/utils";
import { useTheme } from "../../Provider/ThemeProvider";

export default function Admin(){

    const theme = useTheme();

    useEffect(() => {
        changeTitleHeader('Panel de Aministración');
    },[]);

    return(
        <main className={(theme.theme == "light") ? "column is-four-fifths-desktop has-background-light pb-4 vh-100 is-full-mobile" : 'column is-four-fifths-desktop vh-100 has-background-dark pb-4 is-full-mobile '}>

        </main>
    )
}