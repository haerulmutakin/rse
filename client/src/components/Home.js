import Card from "./Card";

const Home = () => {

    const quotes = [
        {
            id: 1,
            username: 'haerulmutakin',
            theme: '#F7B731',
            quote: 'Two things are infinite: the universe and human stupidity; and Im not sure about the universe.'
        },
        {
            id: 2,
            username: 'ummuzaida',
            theme: '#A5B1C2',
            quote: 'Be yourself; everyone else is already taken.'
        },
        {
            id: 3,
            username: 'fatinzaida',
            theme: '#45AAf2',
            quote: 'A room without books is like a body without a soul.'
        },
    ]
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