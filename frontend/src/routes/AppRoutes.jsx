import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

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

      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path='/wallify-feed'
        element={
          <ProtectedRoute>
            <WallifyFeed />
          </ProtectedRoute>
        }
      />

      <Route
        path='/my-wallifies'
        element={
          <ProtectedRoute>
            <MyWallifies />
          </ProtectedRoute>
        }
      />

      <Route
        path='/wallify-users'
        element={
          <ProtectedRoute>
            <WallifyUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path='/view-profile'
        element={
          <ProtectedRoute>
            <ViewMyProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path='/change-password'
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route path='/need-help' element={<NeedHelp />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
