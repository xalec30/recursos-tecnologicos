import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import codeigniter from '../../Utils/axios';
import CardResource from '../../Components/CardResource/CardResource';
import ButtonLoading from '../../Components/ButtonLoading/ButtonLoading';
import ModalResourceDetails from '../../Components/ModalResourceDetails/ModalResourceDetails';

export default function Search(){

    const params = useParams();
    const [page,setPage] = useState<number>(1);
    const [result,setResult] = useState<any[]>([]);
    const [name,setName] = useState("");
    const [url,setUrl] = useState("");
    const [description,setDescription] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [imageUrl,setImageURL] = useState("");
    const [openModalDetails,setOpenModalDetails] = useState(false);
    
    useEffect(() => {
        document.title = "Busqueda " + params.search;
        getResults(params.search,page);
    },[]);

    const getResults = async(search:any,page:number) => {

        await codeigniter.post('/assets/resource/search/' + search + '/' + page).then((response) => {
            setResult(prevState => {
                return prevState.concat(response.data)
            });
        })
    } 

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

    const moreResults = () => {

        setPage(prevState => {

            prevState += 1;
            getResults(params.search,page);(prevState);
            return prevState;
        });
    }

    return(
        <>
            <Navbar hiddenButtonsAuth={1} />
                <div className="container p-4">
                    <div className="columns is-multiline is-mobile mt-4">
                        <div className="column is-12">
                            <h1 className="title is-4">{"Busqueda: " + params.search}</h1>
                        </div>
                        <div className="column is-12">
                            {
                                (result.length > 0 ) ? 

                                    result.map((resource:any) => {
                                        return <CardResource image={resource.image} name={resource.name} url={resource.url} shortDescription={resource.short_description} description={resource.description} key={resource.id} eventModal={openModal}/>
                                    })
                                :
                                <article className=" column is-12 message is-link" style={{borderBottomLeftRadius:'0.375rem',borderBottomRightRadius:'0.375rem',}}>
                                    <div className="message-header" style={{borderBottomLeftRadius:'0.375rem',borderBottomRightRadius:'0.375rem',}}>
                                        <p>Sin resultados.</p>
                                    </div>
                                </article>
                            }
                        </div>
                        <div className={(result.length == (page * 9)) ? 'column is-12 is-centered has-text-centered' : 'column is-12 is-centered has-text-centered is-hidden'}>
                            <ButtonLoading onClick={moreResults}/>
                        </div>
                    </div>
                </div>
                <ModalResourceDetails image={imageUrl} title={name} url={url} shortDescription={shortDescription} description={description} open={openModalDetails} changeModal={closeModal} />
            <Footer />
        </>
    )
}