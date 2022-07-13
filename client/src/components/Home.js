import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from "./Card";
import Api from "../_api/ApiInstance";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [ quotes, setQuotes ] = useState([])

    const fetchQuotes = async () => {
        const resp = await Api.get('/quote');
        const data = resp.data;
        const {result} = data;
        setQuotes(result);
    }

    const handleNewQuote = () => {
        navigate(`/detail/new`)
    }

    useEffect(() => {
        fetchQuotes();
    }, [])
    return ( 
        <div className="home">
            <div className="card-container">
                {quotes.map((item, index) => (
                    <Card key={index} quote={item} />
                ))}
            </div>
            <div className="new-quote-btn">
                <button onClick={handleNewQuote}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
     );
}
 
export default Home;