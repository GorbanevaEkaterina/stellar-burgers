import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersHistory,
  getOrdersHistoryLoading,
  userOrderHistory
} from '../../slices/userOrderHistorySlice';
import { useDispatch, useSelector } from '../../../src/services/store';
import { Preloader } from '@ui';
import { getAllFeeds } from '../../slices/feedSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersHistory);
  const dispatch = useDispatch();
  const isLoading = useSelector(getOrdersHistoryLoading);

  useEffect(() => {
    dispatch(userOrderHistory());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
