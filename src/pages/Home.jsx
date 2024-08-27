import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Home Page | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
      </Helmet>
      <div className='page flexcol g5 center'>
        <div className="text">Home page</div>
      </div>
    </Fragment>
  );
};

export default Home;
