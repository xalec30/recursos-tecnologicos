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
    const [page,setPage] = useState<number>(1);
    const [resources,setResources] = useState<any[]>([]);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [imageUrl,setImageURL] = useState("");
    changeTitleHeader('Categoria ' + params.name);

    const getResources = async(page:number) => {
        await codeigniter.post('/assets/resource/' + params.name + '/' + page).then((response) => {
            setResources(prevState => {
                return prevState.concat(response.data)
            });
        })
    }

    useEffect(() => {
        setResources([]);
        setPage(1);
        getResources(page);
    },[params]);

    const openModal = (e:any) => {
        setDescription(e.currentTarget.getAttribute('data-description'));
        setShortDescription(e.currentTarget.getAttribute('data-short-description'));
        setName(e.currentTarget.getAttribute('data-name'));
        setUrl(e.currentTarget.getAttribute('data-url'));
        setImageURL(e.currentTarget.getAttribute('data-image'));
        setOpenModalDetails(true);
    }

    const closeModal = () => {
        setOpenModalDetails(false);
    }

    const moreResources = () => {

        setPage(prevState => {

            prevState += 1;
            getResources(prevState);
            return prevState;
        });
    }

    return(
        <main className={`column is-four-fifths-desktop ${(theme.theme == "light") ? 'has-background-light' : 'has-background-dark'} pb-4 vh-100 is-full-mobile`}>
            
            <div className="column is-6">
                <div className="tags are-large">
                    <span className="tag is-link">{params.name}</span>
                </div>
            </div>

            <div className='columns is-multiline is-mobile p-4'>
                {
                    (resources.length > 0) ?
                        
                        resources.map((resource:any) => {
                            return <CardResource image={resource.image} name={resource.name} url={resource.url} shortDescription={resource.short_description} description={resource.description} key={resource.id} eventModal={openModal}/>
                        })
                    :
                    ''
                }
                <div className={(resources.length == (page * 9)) ? 'column is-12 is-centered has-text-centered' : 'column is-12 is-centered has-text-centered is-hidden'}>
                    <ButtonLoading onClick={moreResources}/>
                </div>
            </div>
            <ModalResourceDetails image={imageUrl} title={name} url={url} shortDescription={shortDescription} description={description} open={openModalDetails} changeModal={closeModal} />
        </main>
    )
}