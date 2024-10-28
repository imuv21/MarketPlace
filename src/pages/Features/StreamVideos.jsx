import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StreamVideo = () => {
  const publicId = 'Ulink_Gulf1_pjc9b0';
  const [quality, setQuality] = useState('720p');
  const videoUrl = `${BASE_URL}/service/streamVideo/${publicId}/${quality}`;

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  return (
    <div className='page flexcol g5 center wh'>
      <Helmet>
        <title>Stream Videos | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/stream-videos" />
      </Helmet>

      <video key={videoUrl} src={videoUrl} controls className='video' preload="auto" />
      <select id="quality" className='quality' value={quality} onChange={handleQualityChange}>
        <option value="720p">Select quality</option>
        <option value="360p">360p</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
      </select>
    </div>
  );
};

export default StreamVideo;
