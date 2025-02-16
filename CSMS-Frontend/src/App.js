import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Register from './components/authentication/Register';
import { ToastContainer } from 'react-toastify';
import AuthContext, { CustomContext } from './context/AuthContext';
import Home from './components/home/Home';
import AddCrop from './components/crop-details/page/AddCrop';
import CropGallery from './components/crop-details/page/CropGallery';
import CropDetails from './components/crop-details/page/CropDetails';
import UserProfile from './components/user/UserProfile';
import PageNotFound from './utilities/PageNotFound';

export const TOAST_PROP = { position: 'top-center', hideProgressBar: true };

export default function App() {

  // Private route wrapper for authenticated users
  const AuthenticatedRoute = () => {
    const context = CustomContext();
    if (context?.isAuthenticated || context?.isAuthenticated === undefined) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext>
          <ToastContainer />
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/crop-gallery' element={<CropGallery />} />
            <Route path='/crop/:slug' element={<CropDetails />} />

            <Route path='/AddCrop' element={<AddCrop />} />
            <Route path='/CropDetails' element={<CropDetails />} />

            {/* 404 Page */}
            <Route path='*' element={<PageNotFound />} />

            {/* Private Routes */}
            <Route path='/users' element={<AuthenticatedRoute />}>
              <Route path='profile' element={<UserProfile />} />
            </Route>

            <Route element={<AuthenticatedRoute />}>
              <Route path='/AddCrop' element={<AddCrop />} />
            </Route>
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}

