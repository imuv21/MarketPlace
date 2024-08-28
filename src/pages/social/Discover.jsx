import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../slices/usersSlice';
import { sendFriendRequest, cancelFriendRequest } from '../../slices/friendsSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Diversity3Icon from '@mui/icons-material/Diversity3';


const Discover = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.users);
    const { sfrError, cfrError } = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const addFriendHandler = async (id) => {
        try {
            const response = await dispatch(sendFriendRequest({ friendId: id })).unwrap();
            if (response.status === 'success') {
                toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getAllUsers());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{sfrError.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }

    const cancelFriendHandler = async (id) => {
        try {
            const response = await dispatch(cancelFriendRequest({ friendId: id })).unwrap();
            if (response.status === 'success') {
                toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getAllUsers());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{cfrError.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }

    return (
        <Fragment>
            <Helmet>
                <title>Find New Friends | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
            </Helmet>
            <div className='page flexcol wh'>

                <Link to='/friend-list' className="flex center g5 hover" style={{ width: 'fit-content' }}>
                    <Diversity3Icon /> <div className="textBig">See Friend List</div>
                </Link>

                <div className="perfect-grid">
                    {loading && <p className="text">Loading...</p>}
                    {error && <p className="text">Error: {error.message}</p>}
                    {!loading && !error && users && users.length === 0 && (
                        <p className="text">There are no users yet.</p>
                    )}
                    {!loading && !error && users && users.length > 0 && users.map((item) => (
                        <div className="grid-item" key={uuidv4()}>
                            <img src={item.image} alt={item.firstName} />
                            <div className="socialDetail">
                                <div className="flexcol start-center wh" style={{ gap: '4px' }}>
                                    <p className="textBig blue flex center-start g5">{item.firstName} {item.lastName} {item.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}</p>
                                    <p className="textBig blue flex center-start g5"> <PersonIcon /> {item.role}</p>
                                    <p className="textBig blue flex center-start g5"> <PublicIcon /> {item.country}</p>
                                </div>
                                {item.friendReq.includes(user._id) ? (<button className='addFriend' onClick={() => cancelFriendHandler(item._id)}>Cancel Request</button>) : <button className='addFriend' onClick={() => addFriendHandler(item._id)}>Add Friend</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
};

export default Discover;