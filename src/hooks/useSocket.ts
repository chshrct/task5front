import { useEffect, useRef } from 'react';

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

import { AppDispatch } from 'store';
import { addMessage } from 'store/appSlice/appSlice';

export const useSocket = (
  dispatch: AppDispatch,
  isGetAllMessagesSuccess: boolean,
  user: string,
): void => {
  const tempSocket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  useEffect(() => {
    if (isGetAllMessagesSuccess && user && !tempSocket.current) {
      const socket = io('https://itransition-task5-back.herokuapp.com/', {
        path: '/socket',
      });

      tempSocket.current = socket;
      socket.on('connect', () => {
        socket.emit('userName', user);
        socket.on('newMessage', message => {
          dispatch(addMessage(message));
        });
      });
    }
    if (!user && tempSocket.current) {
      tempSocket.current.disconnect();
      tempSocket.current = null;
    }
  }, [dispatch, isGetAllMessagesSuccess, user]);
};
