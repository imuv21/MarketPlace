import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className='page flexcol g5 center'>
        <div className="text">Home page</div>
      </div>
    </Fragment>
  );
};

export default Home;
