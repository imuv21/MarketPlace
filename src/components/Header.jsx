import React, { Fragment, Suspense, useState, useEffect, lazy, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Login, Logout, Search as SearchIcon, ShoppingCart, AccountCircle } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import images from '../assets/images.json';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../slices/usersSlice';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MovieIcon from '@mui/icons-material/Movie';

const Search = lazy(() => import('./Search'));

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { notifications, loadingNotifications, errorNotifications } = useSelector((state) => state.users);

  const friendReq = 'has sent you friend request.';
  const acceptReq = 'has accepted your friend request.';
  const rejectReq = 'has rejected your friend request.';
  const unfriend = 'has removed you from his friend list.';

  const typeOne = "friend_request";
  const typeTwo = "friend_request_accepted";
  const typeThree = "friend_request_rejected";
  const typeFour = "unfriend";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);


  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(logoutUser()).unwrap();
      toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/login');
    }
  }
  const publicLists = () => {
    navigate('/public-lists');
  }
  const shoping = () => {
    navigate('/shoping');
  }
  const login = () => {
    navigate('/login');
  }
  const profile = () => {
    navigate('/profile');
  }
  const cart = () => {
    navigate('/cart');
  }
  const discover = () => {
    navigate('/discover');
  }
  const openNotification = () => {
    navigate('/notifications');
  }
  const home = () => {
    navigate('/');
  }
  const featureDashboard = () => {
    navigate('/feature-dashboard');
  }

  //burger
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  //search
  const openSearch = () => {
    setIsSearch(prev => !prev);
  }

  //notification
  const [isNotification, setIsNotification] = useState(false);
  const isNotificationRef = useRef(null);
  const popupIsNotificationRef = useRef(null);

  const getMessageForType = (type) => {
    switch (type) {
      case typeOne:
        return friendReq;
      case typeTwo:
        return acceptReq;
      case typeThree:
        return rejectReq;
      case typeFour:
        return unfriend;
      default:
        return '';
    }
  };

  const closeAllPopups = () => {
    setIsNotification(false);
  };

  const handleOpenNotification = (event) => {
    event.preventDefault();
    closeAllPopups();
    setIsNotification(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      (isNotificationRef.current && isNotificationRef.current.contains(event.target)) ||
      (popupIsNotificationRef.current && popupIsNotificationRef.current.contains(event.target))
    ) {
      return;
    }
    closeAllPopups();
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      closeAllPopups();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <Fragment>
      <div className='component header flex center-space wh'>
        <div className='header-burger' onClick={toggleMobileMenu} >
          <Menu />
        </div>
        <img className='logo' src={images.logo} alt="logo" onClick={home} />

        {user && <div className="nav-mobile flex center">
          <div className="textBig hover">{user.firstName} {user.lastName}</div>
          <SearchIcon onClick={openSearch} />
          <AccountCircle onClick={profile} />
          <SmartToyIcon onClick={featureDashboard} />
          <StorefrontIcon onClick={shoping} />
          <ShoppingCart onClick={cart} />
          <PeopleAltIcon onClick={discover} />
          <div ref={isNotificationRef} onClick={handleOpenNotification} className={`notification-btn ${isNotification ? 'clicked' : ''}`}>
            <NotificationsIcon />
            {notifications && notifications.length > 0 && (<div className="notification-number">{notifications.length}</div>)}
            {isNotification && (
              <div ref={popupIsNotificationRef} className="notification-popup">

                {loadingNotifications && <p className='text'>Loading...</p>}
                {errorNotifications && <p className='text'>{errorNotifications.message}</p>}
                {!loadingNotifications && !errorNotifications && notifications && notifications.length === 0 && (
                  <p className="text">There are no notifications.</p>
                )}

                {!loadingNotifications && !errorNotifications && notifications && notifications.length > 0 && (
                  notifications.map(not => (
                    <div key={not._id}>
                      <div className="notification">
                        <img src={not.fromUser.image} alt={not.fromUser.firstName} /> {not.fromUser.firstName} {not.fromUser.lastName} {getMessageForType(not.type)}
                      </div>
                    </div>
                  ))
                )}

                <p className="textSmol hover" onClick={openNotification}>See all</p>
              </div>
            )}
          </div>
          <Logout onClick={logout} />
          {!token && <Login onClick={login} />}
        </div>}

        {!user && <div className="nav-mobile flex center">
          <MovieIcon onClick={publicLists} />
        </div>}
      </div>

      {isSearch && (<Suspense fallback={<div>Loading...</div>}><Search /></Suspense>)}

      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <div className='drawer' onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}>
          {user && <Link to="/">Home</Link>}
          {user && <Link to="/cart">Cart</Link>}
          <Link to="/login">Login</Link>
          <Link to="/signup">Signp</Link>
          <Link to="/public-lists">Public Lists</Link>
          {user && <Link to="/logout">Logout</Link>}
        </div>
      </Drawer>
    </Fragment>
  )
};

export default Header;