import React from 'react';
import Auxa from "../Auxa/Auxa"

const Loading = ({}) => {

    return(
        <Auxa>
            <div className="bunga-loader">
                <div></div>
            </div>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Auxa>
    );
}

export default Loading;