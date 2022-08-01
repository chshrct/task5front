import { FC, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useSignUpMutation } from 'api/appApi';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { Messenger } from 'pages/Messenger/Messenger';
import './App.css';
import { useAppDispatch } from 'store';
import { setUser } from 'store/appSlice/appSlice';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const user = sessionStorage.getItem('user') || localStorage.getItem('user') || '';

  useEffect(() => {
    if (user) signUp({ user });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(user));
    }
  }, [isSuccess]);

  if (isLoading) return <FullscreenProgress />;

  return <Messenger />;
};
