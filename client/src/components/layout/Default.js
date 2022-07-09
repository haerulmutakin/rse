import { Fragment } from "react";
import Navbar from "../Navbar";

const Detail = ({children}) => {
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
}
 
export default Detail;