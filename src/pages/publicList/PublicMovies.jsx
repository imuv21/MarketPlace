import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicMovies } from '../../slices/movieSlice';
import StarIcon from '@mui/icons-material/Star';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';


const PublicMovies = () => {

  const dispatch = useDispatch();
  const { publicMovies, gpmLoading, gpmError } = useSelector((state) => state.movies);
  const { listId } = useParams();
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const imgPlaceHoler = 'https://res.cloudinary.com/dfsohhjfo/image/upload/v1727950830/MarketPlace/Assets/istockphoto-1642381175-612x612_kkotha.jpg';

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    dispatch(getPublicMovies(listId));
  }, [dispatch, listId]);


  return (
    <Fragment>
      <Helmet>
        <title>Public Movies | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/public-movies" />
      </Helmet>

      <div className="page flexcol wh">
        <div className='flex center-end'>
          <div className="viewIcons">
            <ViewModuleIcon onClick={() => toggleViewMode('grid')} /> <ViewListIcon onClick={() => toggleViewMode('list')} />
          </div>
        </div>

        {viewMode === 'grid' ?
          (<Fragment>
            {gpmLoading && <p className="text wh centertext">Loading movies...</p>}
            {gpmError && <p className="text wh centertext">There are no movies yet.</p>}
            {!gpmError && !gpmLoading && publicMovies && publicMovies.length === 0 && <p className="text wh centertext">There are no movies yet.</p>}
            <div className="perfect-grid">
              {!gpmError && !gpmLoading && publicMovies && publicMovies.length > 0 && publicMovies.map((movie) => (
                <div className="grid-item" key={movie._id}>
                  <img src={movie.poster || imgPlaceHoler} alt={movie.title} />
                  <div className="detail">
                    <div className="flex center-start g5">
                      <StarIcon /> <div className="textBig">{movie.rating}</div>
                    </div>
                    <p className="textBig">{movie.index}. {movie.title}</p>
                    {movie.comment && <p className="textSmol">{movie.comment}.</p>}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>)
          :
          (<div className="lists">
            {gpmLoading && <p className="text">Loading movies...</p>}
            {gpmError && <p className="text">There are no movies yet.</p>}
            {!gpmError && !gpmLoading && publicMovies && publicMovies.length === 0 && <p className="text">There are no movies yet.</p>}

            {!gpmError && !gpmLoading && publicMovies && publicMovies.length > 0 && publicMovies.map((movie) => (
              <div className="list" key={movie._id}>
                <img src={movie.poster || imgPlaceHoler} className="poster" alt={movie.title} />
                <article className="list-detail">
                  <h1 className="textBig">{movie.index}. {movie.title}</h1>
                  <div className="flex center-start g5">
                    <StarIcon style={{ color: 'yellow', filter: 'drop-shadow(1px 1px 1px black)' }} /> <div className="textBig fontGray">{movie.rating}</div>
                  </div>
                  {movie.comment && <p className="textSmol fontGray">{movie.comment}.</p>}
                </article>
              </div>
            ))}
          </div>)
        }
      </div>
    </Fragment>
  )
}

export default PublicMovies