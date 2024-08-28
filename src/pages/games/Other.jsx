import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Other = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Cart Page | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/play-games" />
      </Helmet>
      <div className='page flex center'>
        cart
      </div>
    </Fragment>
  )
};

export default Other;