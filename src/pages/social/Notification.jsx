import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getNotifications, deleteNotification } from '../../slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import ClearIcon from '@mui/icons-material/Clear';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const Notification = () => {

    const dispatch = useDispatch();
    const { notifications, loadingNotifications, errorNotifications, errorDeletingNotification } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const handleDelete = async (notificationId) => {
        try {
            const response = await dispatch(deleteNotification(notificationId)).unwrap();
            if (response && response.status === "success") {
                toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            } else {
                toast(<div className='flex center g5'> < NewReleasesIcon />{errorDeletingNotification.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
            }
        } catch (error) {
            toast(<div className='flex center g5'> < NewReleasesIcon />{error.message || 'Something went wrong'}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        }
    };

    const friendReq = 'has sent you friend request.';
    const acceptReq = 'has accepted your friend request.';
    const rejectReq = 'has rejected your friend request.';

    const typeOne = "friend_request";
    const typeTwo = "friend_request_accepted";
    const typeThree = "friend_request_rejected";

    const getMessageForType = (type) => {
        switch (type) {
            case typeOne:
                return friendReq;
            case typeTwo:
                return acceptReq;
            case typeThree:
                return rejectReq;
            default:
                return '';
        }
    };



    return (
        <Fragment>
            <Helmet>
                <title>Notifications</title>
            </Helmet>
            <div className='page flexcol g15 wh'>
                {loadingNotifications && <div className='text'>Loading...</div>}
                {errorNotifications && <div className='text'>{errorNotifications.message}</div>}
                {!loadingNotifications && !errorNotifications && notifications && notifications.length === 0 && (
                    <div className="text">There are no notifications.</div>
                )}
                <div className="flexcol start-center g5 wh">
                    {!loadingNotifications && !errorNotifications && notifications && notifications.length > 0 && (
                        notifications.map(not => (
                            <div key={not._id}>
                                <div className="notification">
                                    <img src={not.fromUser.image} alt={not.fromUser.firstName} /> {not.fromUser.firstName} {not.fromUser.lastName} {getMessageForType(not.type)}
                                    <ClearIcon onClick={() => handleDelete(not._id)} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Notification