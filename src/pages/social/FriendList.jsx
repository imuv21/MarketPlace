import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../slices/usersSlice';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const FriendList = () => {

    const dispatch = useDispatch();
    const { friends, loadingFriends, errorFriends } = useSelector((state) => state.users);


    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);



    return (
        <Fragment>
            <Helmet>
                <title>Friend List</title>
            </Helmet>
            <div className='page flexcol wh'>

                <Link to="/friend-requests" className="flex center g5 hover" style={{ width: 'fit-content' }}>
                    <Diversity3Icon /> <div className="textBig">See Friend Requests</div>
                </Link>


                <div className="perfect-grid">
                    {loadingFriends && <div className="text">Loading...</div>}
                    {errorFriends && <div className="text">Error: {errorFriends.message}</div>}
                    {!loadingFriends && !errorFriends && friends && friends.length === 0 && (
                        <div className="text">You have no friends here too.</div>
                    )}
                    {!loadingFriends && !errorFriends && friends && friends.length > 0 && friends.map((item) => (
                        <div className="grid-item" key={uuidv4()}>
                            <img src={item.image} alt={item.firstName} />
                            <div className="socialDetail">
                                <div className="flexcol start-center wh" style={{ gap: '4px' }}>
                                    <div className="textBig blue flex center-start g5">{item.firstName} {item.lastName} {item.isVerified === 1 ? <VerifiedIcon style={{ color: 'var(--footer)' }} /> : <NewReleasesIcon style={{ color: 'orange' }} />}</div>
                                    <div className="textBig blue flex center-start g5"> <AlternateEmailIcon /> {item.email}</div>
                                    <div className="textBig blue flex center-start g5"> <PersonIcon /> {item.role}</div>
                                    <div className="textBig blue flex center-start g5"> <PublicIcon /> {item.country}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
};

export default FriendList;