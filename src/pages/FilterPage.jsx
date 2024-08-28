import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, getMovies, deleteMovie } from '../slices/movieSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const FilterPage = () => {

  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  //clicks
  const [isClickedFooter, setIsClickedFooter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClickFooter = (event) => {
    event.preventDefault();
    setIsClickedFooter(true);
  };
  const closepopup = (event) => {
    event.preventDefault();
    setIsClickedFooter(false);
  }

  const [formValues, setFormValues] = useState({
    title: '',
    rating: '',
    comment: '',
    poster: null,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster' && files.length > 0) {
      setFormValues({ ...formValues, poster: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    try {
      const movieData = new FormData();
      movieData.append('title', formValues.title);
      movieData.append('rating', formValues.rating);
      movieData.append('comment', formValues.comment);
      movieData.append('poster', formValues.poster);

      const response = await dispatch(addMovie(movieData)).unwrap();
      if (response.status === "success") {
        dispatch(getMovies());
        toast(<div className='flex center g5'> < VerifiedIcon/>{response.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'rgb(0, 189, 0)'}, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite'} });
        setIsClickedFooter(false);
        setIsSubmitted(false);
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon/> {response.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'red'}, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite'} });
        setIsClickedFooter(false);
        setIsSubmitted(false);
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon/> {error.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'red'}, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite'} });
    } finally {
      setFormValues({ title: '', rating: '', comment: '', poster: null });
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await dispatch(deleteMovie(movieId)).unwrap();
      if (response.status === 'success') {
        dispatch(getMovies());
        toast(<div className='flex center g5'> < VerifiedIcon/>{response.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'red'}, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite'} });
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon/> {response.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'red'}, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite'} });
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon/> {error.message}</div>, { duration: 3000, position: 'top-center', style: {color: 'red'}, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite'} });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isClickedFooter) {
        setIsClickedFooter(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClickedFooter]);


  // drag and drop




  return (
    <Fragment>
      <Helmet>
        <title>MCU - Marvel Cinematic Universe | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/add-new-movie" />
      </Helmet>

      <div className="page flexcol wh">

        <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
          <button onClick={handleClickFooter}>
            <AddBoxIcon /> <div className="headingSmol">Add new movie</div>
          </button>
          {isClickedFooter && (
            <div className="popup">
              <form className="popup-wrapper" onSubmit={handleSubmit}>
                <h1 className="heading blue">Add new movie</h1>

                <input type="text" name='title' placeholder='Enter the title' value={formValues.title} onChange={handleChange} required />
                <input type="number" name='rating' placeholder='Give your rating' value={formValues.rating} onChange={handleChange} required />
                <input type="text" name='comment' placeholder='Any comment on it' value={formValues.comment} onChange={handleChange} />
                <input type="file" name='poster' onChange={handleChange} required />

                <div className="flex center g20 wh">
                  <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Adding...' : 'Add'}</button>
                  <button type="button" onClick={closepopup} className="btn">Cancel</button>
                </div>

              </form>
            </div>
          )}
        </div>

        <div className="perfect-grid">
          {movies && movies.length === 0 && <p className="text">There are no movies yet.</p>}
          {movies && movies.length > 0 && movies.map((item, index) => (

            <div className="grid-item" key={uuidv4()}>
              <img src={item.poster} alt={item.title} />
              <div className="iconsOnImage flexcol center g5">
                <div className="flex center">
                  <ModeEditIcon />
                </div>
                <div className="flex center">
                  <ClearIcon onClick={() => handleDelete(item._id)} />
                </div>
              </div>
              <div className="detail">
                <div className="flex center-start g5">
                  <StarIcon /> <div className="textBig">{item.rating}</div>
                </div>
                <p className="textBig">{index + 1}. {item.title}</p>
                {item.comment && <p className="textSmol">{item.comment}.</p>}
              </div>
            </div>

          ))}
        </div>
      </div>
    </Fragment>
  )
};

export default FilterPage;