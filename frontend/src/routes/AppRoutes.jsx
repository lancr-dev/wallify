import { Navigate, Route, Routes } from 'react-router-dom';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

import WallifyFeed from '../pages/wallify/WallifyFeed';
import MyWallifies from '../pages/wallify/MyWallifies';
import WallifyUsers from '../pages/wallify/WallifyUsers';

import ViewMyProfile from '../pages/profile/ViewMyProfile';
import ChangePassword from '../pages/profile/ChangePassword';

import NeedHelp from '../pages/help/NeedHelp';

import NotFound from '../pages/errors/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/register' replace />} />

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/wallify-feed' element={<WallifyFeed />} />
      <Route path='/my-wallifies' element={<MyWallifies />} />
      <Route path='/wallify-users' element={<WallifyUsers />} />

      <Route path='/view-profile' element={<ViewMyProfile />} />
      <Route path='/change-password' element={<ChangePassword />} />

      <Route path='/need-help' element={<NeedHelp />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
