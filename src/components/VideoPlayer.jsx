import React from 'react';


const VideoPlayer = ({ fileId }) => {

    const videoUrl = `${BASE_URL}/service/streamvideo/${fileId}`;
    
    return (
        <div className='flexcol center g20'>
            <video controls width="640" height="360" src={videoUrl}>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default VideoPlayer