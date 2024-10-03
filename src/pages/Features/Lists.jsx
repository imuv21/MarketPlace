import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, addList, editList } from '../../slices/movieSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const List = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lists, getListsLoading, getListsError, editListLoading, editListError } = useSelector((state) => state.movies);
    const isLoading = getListsLoading || editListLoading;
    const isError = getListsError || editListError;
    const imgPlaceHoler = 'https://res.cloudinary.com/dfsohhjfo/image/upload/v1727950830/MarketPlace/istockphoto-1642381175-612x612_kkotha.jpg';

    const gotoMovies = (listId) => {
        navigate(`/movies/${listId}`);
    }

    //clicks
    const [listId, setListId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [isClickedFooter, setIsClickedFooter] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleClickFooter = (event) => {
        event.preventDefault();
        setIsClickedFooter(true);
    };
    const handleEditList = (id) => {
        setListId(id);
        setEditMode(true);
        setIsClickedFooter(true);
    }
    const closepopup = (event) => {
        event.preventDefault();
        setIsClickedFooter(false);
        if (editMode) {
            setEditMode(false);
        }
    }

    const [formValues, setFormValues] = useState({
        listName: '',
        description: '',
        privacy: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitted) return;
        setIsSubmitted(true);

        try {
            const listData = {
                listName: formValues.listName,
                description: formValues.description,
                privacy: formValues.privacy
            };

            let response;
            if (editMode) {
                response = await dispatch(editList({ listData, listId })).unwrap();
            } else {
                response = await dispatch(addList(listData)).unwrap();
            }

            if (response.status === "success") {
                dispatch(getLists());
                toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
                setIsSubmitted(false);
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
                setIsSubmitted(false);
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon /> {error.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        } finally {
            setFormValues({ listName: '', description: '', privacy: '' });
            if (editMode) {
                setEditMode(false);
            }
        }
    };

    useEffect(() => {
        if (editMode && listId) {
            const currentList = lists.find(list => list._id === listId);
            if (currentList) {
                setFormValues({
                    listName: currentList.listName,
                    description: currentList.description,
                    privacy: currentList.privacy,
                });
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon /> {"List not found. Please try again."}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                setIsClickedFooter(false);
            }
        }
    }, [editMode, listId, lists]);

    useEffect(() => {
        dispatch(getLists());
    }, [dispatch]);

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
                <title>Lists | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/lists" />
            </Helmet>
            <div className='page flexcol wh'>

                <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
                    <button onClick={handleClickFooter} className='popupButton'>
                        <PlaylistAddIcon /> <div className="headingSmol">Add a list</div>
                    </button>
                    {isClickedFooter && (
                        <div className="popup">
                            <form className="popup-wrapper" onSubmit={handleSubmit}>
                                <h1 className="heading blue">{editMode ? `Edit the list` : `Create new list`}</h1>
                                <input type="text" name='listName' placeholder='Enter the name' value={formValues.listName} onChange={handleChange} required />
                                <input type="text" name='description' placeholder='Enter the description' value={formValues.description} onChange={handleChange} required />
                                <select name="privacy" value={formValues.privacy} onChange={handleChange} required>
                                    <option value="">Select Privacy</option>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                                <div className="flex center g20 wh">
                                    <button type='submit' disabled={isSubmitted}>{editMode ? (isSubmitted ? 'Saving...' : 'Save') : (isSubmitted ? 'Creating...' : 'Create')}</button>
                                    <button type="button" onClick={closepopup} className="btn">Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className="lists">
                    {isLoading && <p className="text">Loading lists...</p>}
                    {isError && <p className="text">Error loading lists. Please try again later.</p>}
                    {!isLoading && !isError && lists && lists.length === 0 && (
                        <p className="text">There are no lists yet.</p>
                    )}
                    {!isLoading && !isError && lists && lists.length > 0 && lists.map((list) => (
                        <div className="list" key={list._id}>
                            <img src={list.listPoster || imgPlaceHoler} className="poster" alt="game-of-thrones" />
                            <article className="list-detail" onClick={() => gotoMovies(list._id)}>
                                <h1 className="textBig">{list.listName}</h1>
                                <p className="text fontGray">{list.numberOfProjects} {list.numberOfProjects <= 1 ? 'Project' : 'Projects'}</p>
                                <p className="text">{list.privacy === 'public' ? <PublicIcon /> : <LockIcon />}</p>
                                <p className="textSmol fontGray">{list.description}.</p>
                            </article>
                            <div className="list-action">
                                <ModeEditIcon onClick={() => handleEditList(list._id)} />
                                <RemoveCircleIcon />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
};

export default List;