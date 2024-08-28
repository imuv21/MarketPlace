import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Home Page | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/" />
      </Helmet>
      <div className='page flexcol g5 center'>
        <h1 className="text">Home page</h1>
      </div>
    </Fragment>
  );
};

export default Home;
