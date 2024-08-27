import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


const Failed = () => {

    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    }

    return (
        <Fragment>
            <Helmet>
                <title>Payment Failed</title>
            </Helmet>
            <div className="flexcol center page" style={{ height: '100vh' }}>
                <div className="heading">Something went wrong!</div>
                <button onClick={backToHome}>Back to Homepage</button>
            </div>
        </Fragment>
    )
};

export default Failed;