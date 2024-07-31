import React, { Fragment, Suspense, useState, useEffect, lazy, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Login, Logout, Search as SearchIcon, ShoppingCart, AccountCircle } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import images from '../assets/images.json';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Search = lazy(() => import('./Search'));

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const defImg = 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg';

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

  //burger
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  //search
  const openSearch = () => {
    setIsSearch(prev => !prev);
  }

  //notification
  const userName = 'John Doe';
  const notificationNumbers = 3;
  const [isNotification, setIsNotification] = useState(false);
  const isNotificationRef = useRef(null);
  const popupIsNotificationRef = useRef(null);

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
        <div className="nav-mobile flex center">
          <div className="textBig hover">{user.firstName} {user.lastName}</div>
          <SearchIcon onClick={openSearch} />
          <AccountCircle onClick={profile} />
          {user.role === 'buyer' && <ShoppingCart onClick={cart} />}
          <PeopleAltIcon onClick={discover} />


          <div ref={isNotificationRef} onClick={handleOpenNotification} className={`notification-btn ${isNotification ? 'clicked' : ''}`}>
            <NotificationsIcon />
            <div className="notification-number">{notificationNumbers}</div>
            {isNotification && (
              <div ref={popupIsNotificationRef} className="notification-popup">
                <div className="notification"><img src={defImg} alt="User" /> {`${userName} sent you friend request.`} </div>
                <div className="notification"><img src={defImg} alt="User" /> {`${userName} sent you a message.`} </div>
                <div className="notification"><img src={defImg} alt="User" /> {`${userName} sent you friend request.`} </div>
                <div className="textSmol hover" onClick={openNotification}>See all</div>
              </div>
            )}
          </div>


          <Logout onClick={logout} />
          {!token && <Login onClick={login} />}
        </div>
      </div>

      {isSearch && (<Suspense fallback={<div>Loading...</div>}><Search /></Suspense>)}

      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <div className='drawer' onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signp</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </Drawer>
    </Fragment>
  )
};

export default Header;