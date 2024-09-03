import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


const FeatureDashboard = () => {

  const navigate = useNavigate();

  const features = [
    {
      name: "Link Shortner",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725081570/MarketPlace/1_j3xVt5zsYuAB19-QATkk_w_g7eqos.png",
      id: 21
    },
    {
      name: "Text To Speech",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1725081416/MarketPlace/img-1_wgzgc7.png",
      id: 22
    },
    {
      name: "Snake",
      img: "https://res.cloudinary.com/dfsohhjfo/image/upload/v1724418689/MarketPlace/pngwing.com_fbzye6.png",
      id: 23
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
          {features && features.length > 0 && features.map((feature) => (
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