import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';
import { getUserInfo } from '../../slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserInfo);

  return (
    <>
      <AppHeaderUI userName={userName?.name} />
    </>
  );
};
