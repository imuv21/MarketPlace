import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, getMovies, deleteMovie } from '../../slices/movieSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const AddProducts = () => {

    const dispatch = useDispatch();

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'poster' && files.length > 0) {
            setFormValues({ ...formValues, poster: files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
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



    return (
        <Fragment>
            <Helmet>
                <title>Add Products | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/add-products" />
            </Helmet>

            <div className="page flexcol wh">

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    <button onClick={handleClickFooter}>
                        <AddBoxIcon /> <div className="headingSmol">Add new product</div>
                    </button>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper">
                                <h1 className="heading blue">Add new product</h1>

                                <input type="text" name='name' placeholder='Enter the name' value='' onChange={handleChange} required />
                                <input type="number" name='amount' placeholder='Enter the amount' value='' onChange={handleChange} required />
                                <input type="number" name='disAmount' placeholder='Enter the amount after discount' value='' onChange={handleChange} />
                                <input type="file" name='img' onChange={handleChange} required />

                                <div className="flex center g20 wh">
                                    <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Adding...' : 'Add'}</button>
                                    <button type="button" onClick={closepopup} className="btn">Cancel</button>
                                </div>

                            </form>
                        </div>
                    )}
                </div>

                {/* <div className="perfect-grid">
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
                </div> */}

            </div>
        </Fragment>
    )
};

export default AddProducts;