import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeatureDashboard = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  const features = [
    {
      name: "Link Shortner",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725081570/MarketPlace/Assets/1_j3xVt5zsYuAB19-QATkk_w_g7eqos.png",
      id: 21
    },
    {
      name: "Text To Speech",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725081416/MarketPlace/Assets/img-1_wgzgc7.png",
      id: 22
    },
    {
      name: "Snake",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1724418689/MarketPlace/Assets/pngwing.com_fbzye6.png",
      id: 23
    },
    {
      name: "Lists & Movies",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725696042/MarketPlace/Assets/7627_w44xsq.png",
      id: 24
    },
    {
      name: "Add Products",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725696145/MarketPlace/Assets/325-3256246_fa-fa-product-icon-transparent-cartoons-fa-fa_pttnh7.png",
      id: 25
    },
    {
      name: "Discover Cinema",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1729337455/MarketPlace/Assets/360_F_133443361_CFWR0cAYXAItwh3njbYKXBfKazNQda3f_zthng5.jpg",
      id: 26
    },
    {
      name: "Send Emails in Bulk",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1729337450/MarketPlace/Assets/VRSN_CompanyBrandedEmail_BlogImage8_201712-670x446_oz7joo.png",
      id: 27
    }
  ]; 

  const open = (id) => {
    switch (id) {
      case 21:
        navigate('/url-shortner');
        break;
      case 22:
        navigate('/text-to-speech');
        break;
      case 23:
        navigate('/snake');
        break;
      case 24:
        navigate('/lists');
        break;
      case 25:
        navigate('/add-products');
        break;
      case 26:
        navigate('/public-lists');
        break;
      case 27:
        navigate('/send-bulk-emails');
        break;
      default:
        navigate('/feature-dashboard');
    }
  };


  return (
    <Fragment>
      <Helmet>
        <title>Feature Dashboard | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/play-games" />
      </Helmet>
      <div className='page flexcol wh'>

        <h1 className="textBig">Feature Dashboard</h1>
        <div className="game-dashboard-grid">
          {userRole === 'buyer' && features && features.length > 0 && features.filter((feature) => feature.id !== 25).map((feature) => (
            <div className="game-dashboard-item" key={feature.id}>
              <img src={feature.img} alt={feature.name} />
              <div className="game-detail">
                <p className="textBig blue">{feature.name}</p>
                <button className='addFriend' onClick={() => open(feature.id)}>Open</button>
              </div>
            </div>
          ))}
          {userRole === 'seller' && features && features.length > 0 && features.filter((feature) => feature.id === 25).map((feature) => (
            <div className="game-dashboard-item" key={feature.id}>
              <img src={feature.img} alt={feature.name} />
              <div className="game-detail">
                <p className="textBig blue">{feature.name}</p>
                <button className='addFriend' onClick={() => open(feature.id)}>Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
};

export default FeatureDashboard;