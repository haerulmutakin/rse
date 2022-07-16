import { Fragment } from "react";
import { useOutlet } from 'react-router-dom';
import Navbar from "../Navbar";

const Detail = () => {
    const outlet = useOutlet();
    return (
        <Fragment>
            <Navbar />
            {outlet}
        </Fragment>
    );
}
 
export default Detail;