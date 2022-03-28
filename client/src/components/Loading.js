import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <ReactLoading type="spinningBubbles" color={'#000000'} height={'50px'} width={'50px'} />
        </div>
    );
};

export default Loading;
