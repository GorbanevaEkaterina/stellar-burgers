import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUserInfo } from '../../slices/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader/preloader';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};
