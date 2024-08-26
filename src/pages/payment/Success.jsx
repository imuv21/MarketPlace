import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    <div className="flexcol center page" style={{ height: '100vh' }}>
      <div className="heading">Order placed successfully!</div>
      {details ? (
        <div className='flexcol center wh'>
          <div className="text">Reference no: {paymentId}</div>
          <div className="text">Order id: {details.order_id}</div>
          <div className="text">Order amount: {details.amount / 100}</div>
          <div className="text">Fee: {details.fee / 100}</div>
          <div className="text">Tax: {details.tax / 100}</div>
          <div className="text">Order currency: {details.currency}</div>
          <div className="text">Payment method: {details.method}</div>
          <div className="text">Order description: {details.description}</div>
          <div className="text">Address: {details.notes.address}</div>
        </div>
      ) : (
        <div className="text">No payment details found.</div>
      )}
      <button onClick={backToHome}>Back to Homepage</button>
    </div>
  );
};

export default Success;
