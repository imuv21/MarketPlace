import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, deleteUser } from '../../slices/authSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // edit profile
  // profile photo upload functionality
  const defImg = 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg';
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(defImg);

  useEffect(() => {
    if (user && user.image) {
      setImageUrl(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadClick = () => {
    document.getElementById('avatar').click();
  };

  //countries
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
        const data = response.data;
        const uniqueCountries = [...new Set(data.map(city => city.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };
    fetchCountries();
  }, []);

  //clicks
  const [isClickedFooter, setIsClickedFooter] = useState(false);
  const [isClickedAvatar, setIsClickedAvatar] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleClickFooter = (event) => {
    event.preventDefault();
    setIsClickedFooter(true);
  };
  const handleClickAvatar = (event) => {
    event.preventDefault();
    setIsClickedAvatar(true);
  }
  const closepopup = (event) => {
    event.preventDefault();
    setIsClickedFooter(false);
  }
  const closepopupAvatar = (event) => {
    event.preventDefault();
    setIsClickedAvatar(false);
  }

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    country: '',
    image: null
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        image: user.image || defImg
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    try {

      const formData = new FormData();
      formData.append('firstName', formValues.firstName);
      formData.append('lastName', formValues.lastName);
      formData.append('country', formValues.country);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await dispatch(updateProfile(formData)).unwrap();
      if (response.status === "success") {
        toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      } else {
        toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setIsClickedFooter(false);
      setIsSubmitted(false);
    }
  };

  //toasts
  const deleteProfile = async () => {
    try {
     let email = user.email;
     let password = user.password;
     let role = user.role;
     const response = await dispatch(deleteUser({ email, password, role })).unwrap();
     if (response.status === "success"){
      toast(<div className='flex center g5'> < VerifiedIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      navigate('/login');
     } else {
      toast(<div className='flex center g5'> < NewReleasesIcon /> {response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
     }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon /> Something went wrong!</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    }
  }
 
  useEffect(() => {
    const handleScroll = () => {
      if (isClickedFooter || isClickedAvatar) {
        setIsClickedFooter(false);
        setIsClickedAvatar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClickedFooter, isClickedAvatar]);

  //password protect
  const [showPassword, setShowPassword] = useState(false);
  const seePassword = () => {
    setShowPassword( prev => !prev);
  }


  return (
    <Fragment>
      <Helmet>
        <title>Profile | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/profile" />
      </Helmet>
      <div className="page flex center-start" style={{height: '100vh'}}>
        <div className="profile flexcol start">
          <h1 className="heading black">Profile</h1>
          <div className="pagebox10 flexcol start-center">

            <div className={`popup-avatar ${isClickedAvatar ? 'clicked' : ''}`}>
              <img onClick={handleClickAvatar} src={imageUrl} alt="Profile" className="avatar" />
              {isClickedAvatar && (
                <div className="popup">
                  <div className="popup-wrapper-avatar">
                    <img src={imageUrl} alt="Full Picture" className='bigAvatar' />
                    <ClearIcon onClick={closepopupAvatar} />
                  </div>
                </div>
              )}
            </div>

            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Name :</p>
              <p className="textBig blue">{user.firstName} {user.lastName}</p>
            </div>
            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Email :</p>
              <p className="textBig blue verify flex center-start g5">{user.email}
                {user.isVerified === 1 ? <VerifiedIcon /> : <NewReleasesIcon style={{ color: 'orange' }} />}
              </p>
            </div>
            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Phone Number :</p>
              <p className="textBig blue">+{user.countryCode} {user.phone}</p>
            </div>
            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Role :</p>
              <p className="textBig blue">{user.role}</p>
            </div>
            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Password :</p>
              <div className="textBig blue" style={{ cursor: 'pointer'}} onClick={seePassword}> { showPassword ? user.password : '***********' } </div>
            </div>
            <div className="pagebox20 flex center-space">
              <p className="textBig blue">Country :</p>
              <p className="textBig blue">{user.country}</p>
            </div>
          </div>

          <div className="pagebox20 flex center">
            <button className='btn' style={{whiteSpace: 'nowrap'}} onClick={deleteProfile}>Delete Profile</button>

            <div className={`popup-btn ${isClickedFooter ? 'clicked' : ''}`}>
              <button className='btn' onClick={handleClickFooter}>Edit Profile</button>
              {isClickedFooter && (
                <div className="popup">
                  <form className="popup-wrapper" onSubmit={handleSubmit}>
                    <h2 className="heading blue">Update Profile</h2>

                    <div className="flexcol center">
                      <div className="relative">
                        <img src={imageUrl ? imageUrl : defImg} alt="Profile" className="avatar" />
                        <div className="avatar-edit-icon" onClick={handleUploadClick}>
                          <img src="https://res.cloudinary.com/dfsohhjfo/image/upload/v1721197484/MarketPlace/Assets/4850478_upload_uploading_save_arrow_up_icon_haje1x.png" alt="edit-icon" />
                        </div>
                      </div>
                      <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>

                    <input type="text" name='firstName' autoComplete='name' placeholder='Enter your first name...' value={formValues.firstName} onChange={handleInputChange} required />
                    <input type="text" name='lastName' autoComplete='name' placeholder='Enter your last name...' value={formValues.lastName} onChange={handleInputChange} required />

                    <select name='country' value={formValues.country} onChange={handleInputChange} required>
                      <option value="">Choose your country</option>
                      {countries.map((country) => (
                        <option key={uuidv4()} value={country}>{country}</option>
                      ))}
                    </select>

                    <div className="flex center g20 wh">
                      <button type='submit' disabled={isSubmitted}>{isSubmitted ? 'Updating...' : 'Update'}</button>
                      <button type="button" onClick={closepopup} className="btn">Cancel</button>
                    </div>

                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile