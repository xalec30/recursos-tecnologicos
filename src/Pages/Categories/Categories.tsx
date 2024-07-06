import { useParams } from 'react-router-dom';
import { useTheme } from '../../Provider/ThemeProvider';
import { changeTitleHeader } from '../../Utils/utils';
import CardResource from '../../Components/CardResource/CardResource';
import ButtonLoading from '../../Components/ButtonLoading/ButtonLoading';


export default function Categories(){

    const params = useParams();
    const theme = useTheme();
    changeTitleHeader('Categoria ' + params.name);

    return(
        <main className={(theme.theme == "light") ? "column is-four-fifths-desktop has-background-light pb-4 vh-100 is-full-mobile" : 'column is-four-fifths-desktop vh-100 has-background-dark pb-4 is-full-mobile'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">{params.name}</span>
                </div>
            </div>

            <div className='columns is-multiline is-mobile p-4'>
                <CardResource/>
                <CardResource/>
                <CardResource/>
                <CardResource/>
                <CardResource/>
                <CardResource/>
                <div className='column is-centered has-text-centered'>
                    <ButtonLoading/>
                </div>
            </div>
        </main>
    )
}