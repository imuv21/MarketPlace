import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StreamVideo = () => {
  
  const publicId = 'Ulink_Gulf1_pjc9b0';
  const videoUrl = `${BASE_URL}/service/streamVideo/${publicId}`;

  return (
    <div className='page flexcol g5 center'>
      <Helmet>
        <title>Stream Videos | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/stream-videos" />
      </Helmet>

      <h1 className="text">Stream Videos</h1>
      <video src={videoUrl} controls width="640px" height="360px" preload="auto" />
    </div>
  );
};

export default StreamVideo;

