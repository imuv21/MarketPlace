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
                <title>Friend Requests</title>
            </Helmet>
            <div className='page flexcol wh'>

                <Link to='/friend-list' className="flex center g5 hover" style={{ width: 'fit-content' }}>
                    <Diversity3Icon /> <div className="textBig">See Friend List</div>
                </Link>


                <div className="perfect-grid">
                    {loadingFriendReqs && <div className="text">Loading...</div>}
                    {errorFriendReqs && <div className="text">Error: {errorFriendReqs.message}</div>}
                    {!loadingFriendReqs && !errorFriendReqs && friendReqs && friendReqs.length === 0 && (
                        <div className="text"> No one wants to be your friend.</div>
                    )}
                    {!loadingFriendReqs && !errorFriendReqs && friendReqs && friendReqs.length > 0 && friendReqs.map((item) => (
                        <div className="grid-item" key={uuidv4()}>
                            <img src={item.image} alt={item.firstName} />
                            <div className="socialDetail">
                                <div className="flexcol start-center wh" style={{ gap: '4px' }}>
                                    <div className="textBig blue flex center-start g5">{item.firstName} {item.lastName} {item.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}</div>
                                    <div className="textBig blue flex center-start g5"> <PersonIcon /> {item.role}</div>
                                    <div className="textBig blue flex center-start g5"> <PublicIcon /> {item.country}</div>
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