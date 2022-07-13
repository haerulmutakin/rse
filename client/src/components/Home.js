import { useEffect, useState } from "react";
import Card from "./Card";
import Api from "../_api/ApiInstance";

const Home = () => {
    const [ quotes, setQuotes ] = useState([])

    const fetchQuotes = async () => {
        const resp = await Api.get('/quote');
        const data = resp.data;
        const {result} = data;
        setQuotes(result);
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
        </div>
     );
}
 
export default Home;