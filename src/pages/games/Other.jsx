import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

const Other = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <div className='page flex center'>
        cart
      </div>
    </Fragment>
  )
};

export default Other;