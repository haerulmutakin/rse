import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faPalette } from '@fortawesome/free-solid-svg-icons';
import QuoteColorConstant from '../_constant/QuoteColor.constant';
import UserContext from '../_context/UserContext';
import Api from "../_api/ApiInstance";
import { useNavigate } from 'react-router-dom';

const AddQuote = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [color, setColor] = useState(0);
    const [quote, setQuote] = useState('');

    const handlePaletteClick = () => {
        if(color < QuoteColorConstant.length) {
            setColor(color + 1);
        } else {
            setColor(0)
        }
    }

    const handleSubmit = async () => {
        const payload = {
            theme: QuoteColorConstant[color],
            body: quote,
            userId: user._id
        }

        const resp = await Api.post('/quote', payload)
        const data = resp.data;
        if(data.status === true) {
            navigate(-1);
        } else {
            console.log('gagal tambah quote')
        }
    }
    return ( 
        <div className="add-quote mx-5 mt-5">
            <div className="area-container" style={{backgroundColor: QuoteColorConstant[color]}}>
                <textarea onChange={(e) => setQuote(e.target.value)}></textarea>
            </div>
            <button onClick={handlePaletteClick} className='color-palette'><FontAwesomeIcon icon={faPalette} /></button>
            {quote !== '' && (
                <button onClick={handleSubmit} className='submit-btn'><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            )}
        </div>
     );
}
 
export default AddQuote;