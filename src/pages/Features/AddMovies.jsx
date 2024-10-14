import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, getMovies, deleteMovie, editMovie } from '../../slices/movieSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const AddMovies = () => {

  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const imgPlaceHoler = 'https://res.cloudinary.com/dfsohhjfo/image/upload/v1727950830/MarketPlace/Assets/istockphoto-1642381175-612x612_kkotha.jpg';

  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const { listId } = useParams();

  const [isClickedFooter, setIsClickedFooter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [movieId, setMovieId] = useState('');

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };
  const handleClickFooter = (event) => {
    event.preventDefault();
    setIsClickedFooter(true);
  };
  const closepopup = (event) => {
    event.preventDefault();
    setIsClickedFooter(false);
    setEditMode(false); 
    setFormValues({ title: '', rating: '', comment: '', poster: null });
  }

  const handleEditMovie = (id) => {
    const movie = movies.find(m => m._id === id); 
    setMovieId(id);
    setEditMode(true);
    setFormValues({
      title: movie.title,
      rating: movie.rating,
      comment: movie.comment,
    });
    setIsClickedFooter(true);
  };

  const [formValues, setFormValues] = useState({
    title: '',
    rating: '',
    comment: '',
    poster: null,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'rating' && value > 10) {
      return;
    }
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

      let response;
      if (editMode) {
        response = await dispatch(editMovie({ movieData, listId, movieId })).unwrap();
      } else {
        response = await dispatch(addMovie({ movieData, listId })).unwrap();
      }


      if (response.status === "success") {
        dispatch(getMovies(listId));
        toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        setIsClickedFooter(false);
        setIsSubmitted(false);
        setEditMode(false);
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        setIsClickedFooter(false);
        setIsSubmitted(false);
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setFormValues({ title: '', rating: '', comment: '', poster: null });
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await dispatch(deleteMovie({ movieId, listId })).unwrap();
      if (response.status === 'success') {
        dispatch(getMovies(listId));
        toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    }
  };



  useEffect(() => {
    dispatch(getMovies(listId));
  }, [dispatch, listId]);

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



  return (
    <Fragment>
      <Helmet>
        <title>MCU - Marvel Cinematic Universe | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/movies" />
      </Helmet>

      <div className="page flexcol wh">
        <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
          <button onClick={handleClickFooter} className='popupButton'>
            <AddBoxIcon /> <div className="headingSmol">Add new movie</div>
          </button>
          {isClickedFooter && (
            <div className="popup">
              <form className="popup-wrapper" onSubmit={handleSubmit}>
                <h1 className="heading blue">{editMode ? `Update the movie` : `Add new movie`}</h1>

                <input type="text" name='title' placeholder='Enter the title' value={formValues.title} onChange={handleChange} required />
                <input type="number" name='rating' placeholder='Give your rating (0 to 10)' value={formValues.rating} onChange={handleChange} required max={10} />
                <input type="text" name='comment' placeholder='Any comment on it' value={formValues.comment} onChange={handleChange} />
                <input type="file" name='poster' onChange={handleChange} required={editMode ? false : true} />

                <div className="flex center g20 wh">
                  <button type='submit' disabled={isSubmitted}> {isSubmitted ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update' : 'Add')}</button>
                  <button type="button" onClick={closepopup} className="btn">Cancel</button>
                </div>

              </form>
            </div>
          )}
          <div className="viewIcons">
            <ViewModuleIcon onClick={() => toggleViewMode('grid')} /> <ViewListIcon onClick={() => toggleViewMode('list')} />
          </div>
        </div>

        {viewMode === 'grid' ?
          (<Fragment>
            {loading && <p className="text wh centertext">Loading movies...</p>}
            {error && <p className="text wh centertext">There are no movies yet.</p>}
            {!error && !loading && movies && movies.length === 0 && <p className="text wh centertext">There are no movies yet.</p>}
            <div className="perfect-grid">
              {!error && !loading && movies && movies.length > 0 && movies.map((movie, index) => (
                <div className="grid-item" key={movie._id}>
                  <img src={movie.poster || imgPlaceHoler} alt={movie.title} />
                  <div className="iconsOnImage flexcol center g5">
                    <div className="flex center">
                      <ModeEditIcon onClick={() => handleEditMovie(movie._id)} />
                    </div>
                    <div className="flex center">
                      <ClearIcon onClick={() => handleDeleteMovie(movie._id)} />
                    </div>
                  </div>
                  <div className="detail">
                    <div className="flex center-start g5">
                      <StarIcon /> <div className="textBig">{movie.rating}</div>
                    </div>
                    <p className="textBig">{index + 1}. {movie.title}</p>
                    {movie.comment && <p className="textSmol">{movie.comment}.</p>}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>)
          :
          (<div className="lists">
            {loading && <p className="text">Loading movies...</p>}
            {error && <p className="text">There are no movies yet.</p>}
            {!error && !loading && movies && movies.length === 0 && <p className="text">There are no movies yet.</p>}

            {!error && !loading && movies && movies.length > 0 && movies.map((movie, index) => (
              <div className="list" key={movie._id}>
                <img src={movie.poster || imgPlaceHoler} className="poster" alt={movie.title} />
                <article className="list-detail">
                  <h1 className="textBig">{index + 1}. {movie.title}</h1>
                  <div className="flex center-start g5">
                    <StarIcon style={{ color: 'yellow', filter: 'drop-shadow(1px 1px 1px black)' }} /> <div className="textBig fontGray">{movie.rating}</div>
                  </div>
                  {movie.comment && <p className="textSmol fontGray">{movie.comment}.</p>}
                </article>

                <div className="list-action">
                  <ModeEditIcon onClick={() => handleEditMovie(movie._id)} />
                  <RemoveCircleIcon onClick={() => handleDeleteMovie(movie._id)} />
                </div>
              </div>
            ))}
          </div>)
        }
      </div>
    </Fragment>
  )
};

export default AddMovies;