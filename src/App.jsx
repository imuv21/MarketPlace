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

//private
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/payment/Cart'));
const FilterPage = lazy(() => import('./pages/FilterPage'));
const Profile = lazy(() => import('./pages/auth/Profile'));
const Discover = lazy(() => import('./pages/social/Discover'));
const FriendList = lazy(() => import('./pages/social/FriendList'));
const FriendReq = lazy(() => import('./pages/social/FriendReq'));
const Notification = lazy(() => import('./pages/social/Notification'));
const Chat = lazy(() => import('./pages/social/Chat'));

function App() {

  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <Routes>

          {/* private */}
          <Route element={<Protector user={user} />}>
            <Route path='/' element={<Layout><Home /></Layout>} />
            <Route path='/cart' element={<Layout><Cart /></Layout>} />
            <Route path='/add-new-movie' element={<Layout><FilterPage /></Layout>} />
            <Route path='/profile' element={<Layout><Profile /></Layout>} />
            <Route path='/discover' element={<Layout><Discover /></Layout>} />
            <Route path='/friend-list' element={<Layout><FriendList /></Layout>} />
            <Route path='/friend-requests' element={<Layout><FriendReq /></Layout>} />
            <Route path='/notifications' element={<Layout><Notification /></Layout>} />
            <Route path='/chat/:receiverId' element={<Layout><Chat /></Layout>} />
          </Route>


          {/* public */}
          <Route element={<Protector user={!user} redirect='/' />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify-otp' element={<Otp />} />
          </Route>

          {/* not found */}
          <Route path='*' element={<div className="page flex center heading">Are you kidding me? Kuchh bhi!</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
