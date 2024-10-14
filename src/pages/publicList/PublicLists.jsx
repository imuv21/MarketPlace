import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicLists } from '../../slices/movieSlice';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';


const PublicLists = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { publicLists, gplLoading, gplError } = useSelector((state) => state.movies);
    const imgPlaceHoler = 'https://res.cloudinary.com/dfsohhjfo/image/upload/v1727950830/MarketPlace/Assets/istockphoto-1642381175-612x612_kkotha.jpg';
    
    const gotoMovies = (listId) => {
        navigate(`/public-movies/${listId}`);
    }

    useEffect(() => {
        dispatch(getPublicLists());
    }, [dispatch]);


    return (
        <Fragment>
            <Helmet>
                <title>Public Lists | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/public-lists" />
            </Helmet>
            <div className='page flexcol wh'>
                <div className="lists">
                    {gplLoading && <p className="text">Loading lists...</p>}
                    {gplError && <p className="text">There are no lists yet.</p>}
                    {!gplLoading && !gplError && publicLists && publicLists.length === 0 && (
                        <p className="text">There are no lists yet.</p>
                    )}
                    {!gplLoading && !gplError && publicLists && publicLists.length > 0 && publicLists.map((list) => (
                        <div className="list" key={list._id}>
                            <img src={list.listPoster || imgPlaceHoler} className="poster" alt="game-of-thrones" />
                            <article className="list-detail" onClick={() => gotoMovies(list._id)}>
                                <h1 className="textBig">{list.listName}</h1>
                                <p className="text fontGray">{list.numberOfProjects} {list.numberOfProjects <= 1 ? 'Project' : 'Projects'}</p>
                                <p className="text">{list.privacy === 'public' ? <PublicIcon /> : <LockIcon />}</p>
                                <p className="textSmol fontGray">{list.description}.</p>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default PublicLists