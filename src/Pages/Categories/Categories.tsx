import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useTheme } from '../../Provider/ThemeProvider';
import { changeTitleHeader } from '../../Utils/utils';
import CardResource from '../../Components/CardResource/CardResource';
import ButtonLoading from '../../Components/ButtonLoading/ButtonLoading';
import ModalResourceDetails from '../../Components/ModalResourceDetails/ModalResourceDetails';
import codeigniter from '../../Utils/axios';


export default function Categories(){

    const params = useParams();
    const theme = useTheme();
    const [openModalDetails,setOpenModalDetails] = useState(false);
    const [page,setPage] = useState(1);
    const [resources,setResources] = useState([]);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    changeTitleHeader('Categoria ' + params.name);

    const getResources = async() => {
        await codeigniter.post('/assets/resource/' + params.name + '/' + page).then((response) => {
            setResources(response.data);
        })
    }

    useEffect(() => {
        getResources();
    },[]);

    const openModal = (e:any) => {
        setDescription(e.currentTarget.getAttribute('data-description'));
        setShortDescription(e.currentTarget.getAttribute('data-short-description'));
        setName(e.currentTarget.getAttribute('data-name'));
        setUrl(e.currentTarget.getAttribute('data-url'));
        setOpenModalDetails(true);
    }

    const closeModal = () => {
        setOpenModalDetails(false);
    }

    return(
        <main className={`column is-four-fifths-desktop ${(theme.theme == "light") ? 'has-background-light' : 'has-background-dark'} pb-4 vh-100 is-full-mobile`}>
            
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag">{params.name}</span>
                </div>
            </div>

            <div className='columns is-multiline is-mobile p-4'>
                {
                    (resources.length > 0) ?

                        resources.map((resource:any) => {
                            return <CardResource name={resource.name} url={resource.url} shortDescription={resource.short_description} description={resource.description} key={resource.id} eventModal={openModal}/>
                        })
                    :
                    ''
                }
                <div className={(resources.length >= 6) ? 'column is-12 is-centered has-text-centered' : 'column is-12 is-centered has-text-centered is-hidden'}>
                    <ButtonLoading/>
                </div>
            </div>
            <ModalResourceDetails title={name} url={url} shortDescription={shortDescription} description={description} open={openModalDetails} changeModal={closeModal} />
        </main>
    )
}