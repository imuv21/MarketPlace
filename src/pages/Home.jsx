import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className='page flex center'>
        home
      </div>
    </Fragment>
  )
};

export default Home;