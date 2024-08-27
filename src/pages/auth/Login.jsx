import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { loginUser, clearErrors } from '../../slices/authSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors, generalError } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    role: '',
    email: '',
    password: ''
  });

  //password hide and show
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //handlers
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    dispatch(clearErrors());
  };

  const roleError = Array.isArray(errors) ? errors.find(error => error.path === 'role') : null;
  const emailError = Array.isArray(errors) ? errors.find(error => error.path === 'email') : null;
  const passwordError = Array.isArray(errors) ? errors.find(error => error.path === 'password') : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (roleError || emailError || passwordError || generalError) {
      toast(<div className='flex center g5'> < NewReleasesIcon />Please fix the errors in the form.</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await dispatch(loginUser(formValues)).unwrap();
      if (response.status === "success") {
        toast(<div className='flex center g5'> < VerifiedIcon />{response.message}</div>, { duration: 3000, position: 'top-center', style: { color: 'rgb(0, 189, 0)' }, className: 'success', ariaProps: { role: 'status', 'aria-live': 'polite' } });
        navigate('/');
      }
    } catch (error) {
      toast(<div className='flex center g5'> < NewReleasesIcon />Error logging in...</div>, { duration: 3000, position: 'top-center', style: { color: 'red' }, className: 'failed', ariaProps: { role: 'status', 'aria-live': 'polite' } });
    } finally {
      setIsSubmitting(false);
    }
  }


  //Login with google
  // const loginWithGoogle = () => {
  //   window.open(`http://localhost:8000/auth/google/callback`, '_self');
  // }


  return (
    <Fragment>
      <Helmet>
        <title>Login | MarketPlace</title>
        <meta name="description" content="One stop for everything you need on MaarketPlace"></meta>
      </Helmet>
      <div className='authpage flex center'>
        <form className="box flexcol center" onSubmit={handleLogin}>
          {/* <button onClick={loginWithGoogle}>Sign in with google</button>
          <div className="heading wh blue" style={{textAlign: 'center'}}>OR</div> */}
          <div className="heading blue">Login to your account</div>

          <select name='role' value={formValues.role} onChange={handleChange}>
            <option value="">Login as a...</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {roleError && <div className="error">{roleError.msg}</div>}

          <input type="email" name='email' autoComplete='email' placeholder='Enter your email...' value={formValues.email} onChange={handleChange} />
          {emailError && <div className="error">{emailError.msg}</div>}

          <div className="wh relative">
            <input type={passwordVisible ? "text" : "password"} className='wh' name='password' autoComplete="new-password" placeholder='Enter your password...' value={formValues.password} onChange={handleChange} />
            <span onClick={togglePasswordVisibility}>
              {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {passwordError && <div className="error">{passwordError.msg}</div>}

          <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
          {errors?.length > 0 && <div className="error flex center">Please correct the above errors.</div>}
          {generalError && <div className="error flex center">{generalError}</div>}
          <div className="text blue">Don't have an account? <Link className='text blue hover' to='/signup'>Click here</Link></div>
          <div className="text blue">Now what? <Link className='text blue hover' to='/forgot-password'>Forgot your password again!!</Link></div>
        </form>
      </div>
    </Fragment>
  )
};

export default Login;