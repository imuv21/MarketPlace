import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendReqs } from '../../slices/usersSlice';
import { responseToFriendRequest } from '../../slices/friendsSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Diversity3Icon from '@mui/icons-material/Diversity3';


const FriendReq = () => {

    const dispatch = useDispatch();
    const { friendReqs, loadingFriendReqs, errorFriendReqs } = useSelector((state) => state.users);
    const { rtrError } = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(getFriendReqs());
    }, [dispatch]);

    const acceptFriendHandler = async (id) => {
        try {
            const result = await dispatch(responseToFriendRequest({ response: 'accept', friendId: id })).unwrap();
            if (result.status === 'success') {
                toast(<div className='flex center g5'> < VerifiedIcon />{result.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getFriendReqs());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{rtrError.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }

    const rejectFriendHandler = async (id) => {
        try {
            const result = await dispatch(responseToFriendRequest({ response: 'reject', friendId: id })).unwrap();
            if (result.status === 'success') {
                toast(<div className='flex center g5'> < VerifiedIcon />{result.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getFriendReqs());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{rtrError.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }


    return (
        <Fragment>
            <Helmet>
                <title>Friend Requests | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
                <link rel="canonical" href="https://imuv21.netlify.app/friend-requests" />
            </Helmet>
            <div className='page flexcol wh'>

                <Link to='/friend-list' className="flex center g5 hover" style={{ width: 'fit-content' }}>
                    <Diversity3Icon /> <h1 className="textBig">See Friend List</h1>
                </Link>

                <div className="perfect-grid">
                    {loadingFriendReqs && <p className="text">Loading...</p>}
                    {errorFriendReqs && <p className="text">Error: {errorFriendReqs.message}</p>}
                    {!loadingFriendReqs && !errorFriendReqs && friendReqs && friendReqs.length === 0 && (
                        <p className="text"> No one wants to be your friend.</p>
                    )}
                    {!loadingFriendReqs && !errorFriendReqs && friendReqs && friendReqs.length > 0 && friendReqs.map((item) => (
                        <div className="grid-item" key={uuidv4()}>
                            <img src={item.image} alt={item.firstName} />
                            <div className="socialDetail">
                                <div className="flexcol start-center wh" style={{ gap: '4px' }}>
                                    <p className="textBig blue flex center-start g5">{item.firstName} {item.lastName} {item.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}</p>
                                    <p className="textBig blue flex center-start g5"> <PersonIcon /> {item.role}</p>
                                    <p className="textBig blue flex center-start g5"> <PublicIcon /> {item.country}</p>
                                </div>
                                <button className='response-btn response-btnTwo' onClick={() => acceptFriendHandler(item._id)}>Accept</button>
                                <button className='response-btn response-btnOne' onClick={() => rejectFriendHandler(item._id)}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Fragment>
    )
};

export default FriendReq;