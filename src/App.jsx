import './App.css';
import './Responsive.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';


const Protector = lazy(() => import('./components/Protector'));
const Layout = lazy(() => import('./components/Layout'));

//public
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Otp = lazy(() => import('./pages/auth/Otp'));
const Socket = lazy(() => import('./pages/Features/Socket'));

//private
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/payment/Cart'));
const AddMovies = lazy(() => import('./pages/Features/AddMovies'));
const Profile = lazy(() => import('./pages/auth/Profile'));
const Discover = lazy(() => import('./pages/social/Discover'));
const FriendList = lazy(() => import('./pages/social/FriendList'));
const FriendReq = lazy(() => import('./pages/social/FriendReq'));
const Notification = lazy(() => import('./pages/social/Notification'));
const Chat = lazy(() => import('./pages/social/Chat'));
const Shoping = lazy(() => import('./pages/payment/Shoping'));
const Order = lazy(() => import('./pages/payment/Order'));
const FeatureDashboard = lazy(() => import('./pages/Features/FeatureDashboard'));
const Snake = lazy(() => import('./pages/Features/Snake'));
const TextToSpeech = lazy(() => import('./pages/Features/TextToSpeech'));
const LinkShortner = lazy(() => import('./pages/Features/LinkShortner'));
const Success = lazy(() => import('./pages/payment/Success'));
const Failed = lazy(() => import('./pages/payment/Failed'));

//private (seller)
const AddProducts = lazy(() => import('./pages/payment/AddProducts'));



function App() {

  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <Routes>

          {/* private (seller) */}
          <Route element={<Protector user={user} role={userRole} requiredRole="seller" redirect='/' />}>
            <Route path='/add-products' element={<Layout><AddProducts /></Layout>} />
          </Route>

          {/* private */}
          <Route element={<Protector user={user} />}>
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/shoping' element={<Layout><Shoping /></Layout>} />
            <Route path='/order' element={<Layout><Order /></Layout>} />
            <Route path='/add-new-movie' element={<Layout><AddMovies /></Layout>} />
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/discover' element={<Layout><Discover /></Layout>} />
            <Route path='/friend-list' element={<Layout><FriendList /></Layout>} />
            <Route path='/friend-requests' element={<Layout><FriendReq /></Layout>} />
            <Route path='/notifications' element={<Layout><Notification /></Layout>} />
            <Route path='/chat/:receiverId' element={<Layout><Chat /></Layout>} />
            <Route path='/feature-dashboard' element={<Layout><FeatureDashboard /></Layout>} />
            <Route path='/snake' element={<Snake />} />
            <Route path='/text-to-speech' element={<Layout><TextToSpeech /></Layout>} />
            <Route path='/url-shortner' element={<Layout><LinkShortner /></Layout>} />
            <Route path='/payment-success' element={<Success />} />
            <Route path='/payment-failed' element={<Failed />} />
          </Route>


          {/* public */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify-otp' element={<Otp />} />
            <Route path='/socket' element={<Socket />} />
          </Route>

          {/* not found */}
          <Route path='*' element={<div className="page flex center heading">Are you kidding me? Kuchh bhi!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
