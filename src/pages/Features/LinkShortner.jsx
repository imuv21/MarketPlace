import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getLink, clearShortUrl, getAnalysis } from '../../slices/featuresSlice';
import toast from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const LinkShortner = () => {

  const dispatch = useDispatch();
  const { shortUrl, analytics, shortId } = useSelector((state) => state.features);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [url, setUrl] = useState('https://');


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!url || !url.startsWith('https://')) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> URL is required and must start with 'https://'</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await dispatch(getLink({ url })).unwrap();
      if (response.status === 'success') {
        toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      }

    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setUrl('https://');
      setIsSubmitting(false);
    }
  }

  const clear = () => {
    dispatch(clearShortUrl());
  }

  const seeAnalytics = async () => {
    if (analysing) return;
    setAnalysing(true);
    if (shortId) {
      try {
        await dispatch(getAnalysis('aD01GO12')).unwrap();
      } catch (error) {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      } finally {
        setAnalysing(false);
      }
    } else {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Short Id is missing</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    }
  }

  const showDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }



  return (
    <Fragment>
      <Helmet>
        <title>URL Shortner | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/play-games" />
      </Helmet>

      <div className='page flex start-center'>
        <div className="flexcol start-center g10 wh">

          <form className="flex center g10 wh" onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter the url...' value={url}
              onChange={(e) => {
                const value = e.target.value;
                setUrl(value.startsWith('https://') ? value : `https://${value}`);
              }}
            />
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
          </form>

          <div className="flex center g10">
            {shortUrl && <div className="text hover red" onClick={clear}>Clear</div>}
            <div className="text">
              Short URL : &nbsp;&nbsp;&nbsp;
              <a href={shortUrl ? shortUrl : ``} className={`hover ${shortUrl ? 'green' : 'blue'}`} style={{ textTransform: 'lowercase' }} target="_blank" rel="noopener noreferrer">
                {shortUrl ? shortUrl : `https://www.example.com/api/v1/service/redirect/{shortId}`}
              </a>
            </div>
          </div>

          <button onClick={seeAnalytics} style={{display: 'none'}} disabled={analysing}>{analysing ? 'Analysing...' : 'See Analytics'}</button>

          <div className="text" style={{display: 'none'}}>{analytics && analytics.length && analytics.length}</div>
          {analytics && analytics.map((time) => {
            <div className="text" style={{display: 'none'}} key={time._id}>{showDate(time.timestamp)}</div>
          })}

        </div>
      </div>
    </Fragment>
  )
};

export default LinkShortner;