import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../slices/usersSlice';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { unfriendTheUser } from '../../slices/friendsSlice';
import { toast } from 'react-hot-toast';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const FriendList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { friends, loadingFriends, errorFriends } = useSelector((state) => state.users);
    const { utuError } = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    const unfriendHandler = async (id) => {
        try {
            const response = await dispatch(unfriendTheUser({ friendId: id })).unwrap();
            if (response.status === 'success') {
                toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
                dispatch(getFriends());
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{utuError.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    }

    const chatHandler = (receiverId) => {
        navigate(`/chat/${receiverId}`);
    }

    return (
        <Fragment>
            <Helmet>
                <title>Friend List | MarketPlace</title>
                <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
            </Helmet>
            <div className='page flexcol wh'>

                <Link to="/friend-requests" className="flex center g5 hover" style={{ width: 'fit-content' }}>
                    <Diversity3Icon /> <h1 className="textBig">See Friend Requests</h1>
                </Link>


                <div className="perfect-grid">
                    {loadingFriends && <p className="text">Loading...</p>}
                    {errorFriends && <p className="text">Error: {errorFriends.message}</p>}
                    {!loadingFriends && !errorFriends && friends && friends.length === 0 && (
                        <p className="text">You have no friends here too.</p>
                    )}
                    {!loadingFriends && !errorFriends && friends && friends.length > 0 && friends.map((item) => (
                        <div className="grid-item" key={uuidv4()}>
                            <img src={item.image} alt={item.firstName} />
                            <div className="socialDetail">
                                <div className="flexcol start-center wh" style={{ gap: '4px' }}>
                                    <p className="textBig blue flex center-start g5">{item.firstName} {item.lastName} {item.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}</p>
                                    <p className="textBig blue flex center-start g5"> <AlternateEmailIcon /> {item.email}</p>
                                    <p className="textBig blue flex center-start g5"> <PersonIcon /> {item.role}</p>
                                    <p className="textBig blue flex center-start g5"> <PublicIcon /> {item.country}</p>
                                </div>
                                <button className='addFriend' onClick={() => chatHandler(item._id)}>Chat</button>
                                <button className='addFriend' onClick={() => unfriendHandler(item._id)}>Unfriend</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
};

export default FriendList;