import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearErrors, setSignupData } from '../../slices/authSlice';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { allCountryCodes } from '../../assets/ccSchema';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors, generalError } = useSelector((state) => state.auth);

  // profile photo upload functionality
  const defImg = 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg';
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(defImg);
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
  const [formValues, setFormValues] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
    confirmPassword: '',
    country: '',
  });

  //password hide and show
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conPasswordVisible);
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

  //country codes
  const [ccode, setCcode] = useState([]);

  useEffect(() => {
    const formattedCountryCodes = allCountryCodes.map(country => ({
      name: country[0],
      iso2: country[1],
      dialCode: country[2]
    }));

    setCcode(formattedCountryCodes);
  }, []);

  //handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'countryCode') {
      const selectedCountry = ccode.find(country => country.dialCode === value);

      if (selectedCountry) {
        setFormValues({
          ...formValues,
          countryCode: selectedCountry,
        });
      }
   
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

    dispatch(clearErrors());
  };

  const roleError = Array.isArray(errors) ? errors.find(error => error.path === 'role') : null;
  const firstNameError = Array.isArray(errors) ? errors.find(error => error.path === 'firstName') : null;
  const lastNameError = Array.isArray(errors) ? errors.find(error => error.path === 'lastName') : null;
  const emailError = Array.isArray(errors) ? errors.find(error => error.path === 'email') : null;
  const phoneError = Array.isArray(errors) ? errors.find(error => error.path === 'phone') : null;
  // const ccError = Array.isArray(errors) ? errors.find(error => error.path === 'countryCode') : null;
  const passwordError = Array.isArray(errors) ? errors.find(error => error.path === 'password') : null;
  const confirmPasswordError = Array.isArray(errors) ? errors.find(error => error.path === 'confirmPassword') : null;
  const countryError = Array.isArray(errors) ? errors.find(error => error.path === 'country') : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (roleError || firstNameError || lastNameError || emailError || phoneError || passwordError || confirmPasswordError || countryError || generalError) {
      toast(<div className='flex center g5'> < NewReleasesIcon />Please fix the errors before submitting the form.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('role', formValues.role);
      formData.append('firstName', formValues.firstName);
      formData.append('lastName', formValues.lastName);
      formData.append('email', formValues.email);
      formData.append('phone', formValues.phone);
      formData.append('countryCode', formValues.countryCode.dialCode);
      formData.append('password', formValues.password);
      formData.append('confirmPassword', formValues.confirmPassword);
      formData.append('country', formValues.country);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
   
      const response = await dispatch(signupUser(formData)).unwrap();
      if (response.status === "success") {
        await dispatch(setSignupData({
          email: formValues.email, role: formValues.role, firstName: formValues.firstName, lastName: formValues.lastName, phone: formValues.phone, countryCode: formValues.countryCode.dialCode,
          country: formValues.country, password: formValues.password, confirmPassword: formValues.confirmPassword, image: selectedImage || null
        }));

        toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        navigate('/verify-otp');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Signup | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
        <link rel="canonical" href="https://imuv21.netlify.app/signup" />
      </Helmet>
      <div className='authpage flex center'>
        <form className="box flexcol center" onSubmit={handleSignup}>
          <h1 className="heading blue">Create your account</h1>

          <div className="flexcol center">
            <div className="relative">
              <img src={imageUrl ? imageUrl : defImg} alt="Profile" className="avatar" />
              <div className="avatar-edit-icon" onClick={handleUploadClick}>
                <img src="https://res.cloudinary.com/dfsohhjfo/image/upload/v1721197484/MarketPlace/Assets/4850478_upload_uploading_save_arrow_up_icon_haje1x.png" alt="edit-icon" />
              </div>
            </div>
            <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </div>

          <select name='role' value={formValues.role} onChange={handleChange}>
            <option value="">Register as a...</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {roleError && <p className="error">{roleError.msg}</p>}

          <input type="text" name='firstName' autoComplete='name' placeholder='Enter your first name...' value={formValues.firstName} onChange={handleChange} />
          {firstNameError && <p className="error">{firstNameError.msg}</p>}

          <input type="text" name='lastName' autoComplete='name' placeholder='Enter your last name...' value={formValues.lastName} onChange={handleChange} />
          {lastNameError && <p className="error">{lastNameError.msg}</p>}

          <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleChange} />
          {emailError && <p className="error">{emailError.msg}</p>}

          <input type="text" name='phone' autoComplete='tel' placeholder='Enter your number...' value={formValues.phone} onChange={handleChange} />
          {phoneError && <p className="error">{phoneError.msg}</p>}

          <select name="countryCode" value={formValues.countryCode.dialCode} onChange={handleChange} required>
            <option value="">Choose your country code</option>
            {ccode.map(country => (
              <option key={country.iso2} value={country.dialCode}>
                {`${country.name} (+${country.dialCode})`}
              </option>
            ))}
          </select>
          {/* {ccError && <p className="error">{ccError.msg}</p>} */}

          <div className="wh relative">
            <input type={passwordVisible ? "text" : "password"} style={{ textTransform: 'none' }} className='wh' name='password' autoComplete="new-password" placeholder='Enter your password...' value={formValues.password} onChange={handleChange} />
            <span onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {passwordError && <p className="error">{passwordError.msg}</p>}

          <div className="wh relative">
            <input type={conPasswordVisible ? "text" : "password"} style={{ textTransform: 'none' }} className='wh' name="confirmPassword" autoComplete="new-password" placeholder='Enter your password again...' value={formValues.confirmPassword} onChange={handleChange} />
            <span onClick={toggleConPasswordVisibility}>
              {conPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {confirmPasswordError && <p className="error">{confirmPasswordError.msg}</p>}

          <select name='country' value={formValues.country} onChange={handleChange}>
            <option value="">Choose your country</option>
            {countries.map((country) => (
              <option key={uuidv4()} value={country}>{country}</option>
            ))}
          </select>
          {countryError && <p className="error">{countryError.msg}</p>}

          <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Signup'}</button>
          {errors?.length > 0 && <p className="error flex center">Please correct the above errors.</p>}
          {generalError && <p className="error flex center">{generalError}</p>}
          <p className="text blue">Already have an account? <Link className='text blue hover' to='/login'>Click here</Link></p>
        </form>
      </div>
    </Fragment>
  )
};

export default Signup;
