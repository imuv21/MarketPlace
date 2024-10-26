import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const StreamVideo = () => {

  const fileId = '1VyelNOZElir0K3dhs8yTa9pp_h2wem1x';
  const videoUrl = `${BASE_URL}/service/streamvideo/${fileId}`;
  const videos = [
    "1TwGbBRigaolL5IJR8D51XUI0F7Wkr5XJ",
    "1VyelNOZElir0K3dhs8yTa9pp_h2wem1x"
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Stream Videos | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/stream-videos" />
      </Helmet>
      <div className='page flexcol g5 center'>
        <h1 className="text">Stream Videos</h1>

        <ReactPlayer url={videoUrl} controls width="640px" height="360px" />
      </div>
    </Fragment>
  );
};

export default StreamVideo;
