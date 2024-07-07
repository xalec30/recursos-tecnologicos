import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../Provider/ThemeProvider';
import { changeTitleHeader } from '../../Utils/utils';
import CardResource from '../../Components/CardResource/CardResource';
import ButtonLoading from '../../Components/ButtonLoading/ButtonLoading';
import ModalResourceDetails from '../../Components/ModalResourceDetails/ModalResourceDetails';


export default function Categories(){

    const params = useParams();
    const theme = useTheme();
    const [openModalDetails,setOpenModalDetails] = useState(false);
    changeTitleHeader('Categoria ' + params.name);

    const openModal = () => {
        console.log('paso por aqui');
        setOpenModalDetails(true);
    }

    const closeModal = () => {
        setOpenModalDetails(false);
    }

    return(
        <main className={(theme.theme == "light") ? "column is-four-fifths-desktop has-background-light pb-4 vh-100 is-full-mobile" : 'column is-four-fifths-desktop vh-100 has-background-dark pb-4 is-full-mobile'}>
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">{params.name}</span>
                </div>
            </div>

            <div className='columns is-multiline is-mobile p-4'>
                <CardResource eventModal={openModal} />
                <CardResource eventModal={openModal}/>
                <CardResource eventModal={openModal}/>
                <CardResource eventModal={openModal}/>
                <CardResource eventModal={openModal}/>
                <CardResource eventModal={openModal}/>
                <div className='column is-centered has-text-centered'>
                    <ButtonLoading/>
                </div>
            </div>
            <ModalResourceDetails title="prueba" shortDescription="texto corto" description="texto largo" open={openModalDetails} changeModal={closeModal} />
        </main>
    )
}