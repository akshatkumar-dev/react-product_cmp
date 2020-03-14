import React from 'react'
import Backdrop from './backdrop'
const Spinner = ()=>{
    return (
        <React.Fragment>
            <Backdrop/>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </React.Fragment>

    );
}
export default Spinner;