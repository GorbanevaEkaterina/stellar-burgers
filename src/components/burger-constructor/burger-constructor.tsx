import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import {
  clearOrder,
  createOrder,
  getConstructorItems,
  getLoading,
  getOrderModalData,
  getOrderRequest
} from '../../slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useNavigate } from 'react-router-dom';
import { getIsAuthenticated } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isLoading = useSelector(getLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isLoading) {
    return <Preloader />;
  }

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter((id): id is string => !!id);

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
