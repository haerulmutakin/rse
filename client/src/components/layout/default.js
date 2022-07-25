import { Fragment } from "react";
import { useOutlet } from "react-router-dom";
import Navbar from "components/common/Navbar";

const DefaultLayout = () => {
    const outlet = useOutlet();
    return ( 
        <Fragment>
            <Navbar />
            {outlet}
        </Fragment>
    );
}
 
export default DefaultLayout;