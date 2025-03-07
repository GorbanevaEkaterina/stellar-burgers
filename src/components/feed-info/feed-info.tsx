import { FC } from 'react';
import { useSelector } from '../../../src/services/store';
import {
  getAllOrders,
  getTotalOrders,
  getTotalOrdersToday
} from '../../slices/feedSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);
  const total = useSelector(getTotalOrders);
  const totalToday = useSelector(getTotalOrdersToday);

  const readyOrders = getOrdersByStatus(orders, 'done');

  const pendingOrders = getOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total: total, totalToday: totalToday }}
    />
  );
};
