import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL;


const Success = () => {

  const token = useSelector((state) => state.auth.token);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get('reference');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (paymentId) {
          const response = await axios.get(`${BASE_URL}/payment/paymentdetails/${paymentId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDetails(response.data.paymentDetails);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId, token]);

  const backToHome = () => {
    navigate('/');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Payment Success | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
      </Helmet>
      <div className="flexcol center page" style={{ height: '100vh' }}>
        <h1 className="heading">Order placed successfully!</h1>
        {details ? (
          <div className='flexcol center wh'>
            <p className="text">Reference no: {paymentId}</p>
            <p className="text">Order id: {details.order_id}</p>
            <p className="text">Order amount: {details.amount / 100}</p>
            <p className="text">Fee: {details.fee / 100}</p>
            <p className="text">Tax: {details.tax / 100}</p>
            <p className="text">Order currency: {details.currency}</p>
            <p className="text">Payment method: {details.method}</p>
            <p className="text">Order description: {details.description}</p>
            <p className="text">Address: {details.notes.address}</p>
          </div>
        ) : (
          <p className="text">No payment details found.</p>
        )}
        <button onClick={backToHome}>Back to Homepage</button>
      </div>
    </Fragment>

  );
};

export default Success;
