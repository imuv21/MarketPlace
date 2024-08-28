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
                <title>Payment Failed | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/payment-failed" />
            </Helmet>
            <div className="flexcol center page" style={{ height: '100vh' }}>
                <h1 className="heading">Something went wrong!</h1>
                <button onClick={backToHome}>Back to Homepage</button>
            </div>
        </Fragment>
    )
};

export default Failed;