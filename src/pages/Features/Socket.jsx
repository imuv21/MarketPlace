import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';


const Socket = () => {

  
  return (
    <Fragment>
      <Helmet>
        <title>Socket Page | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/socket" />
      </Helmet>
      <div className='page flex center'>
        Socket
        <input type="text" placeholder='Enter something...' />
      </div>
    </Fragment>
  )
};

export default Socket;