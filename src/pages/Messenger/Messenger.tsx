import { FC, useEffect } from 'react';

import { Button, Container, Stack } from 'react-bootstrap';

import { Message } from './Message/Message';
import { SendMessage } from './SendMessage/SendMessage';

import { useGetAllMessagesMutation } from 'api/appApi';
import { useSocket } from 'hooks/useSocket';
import { NameChoise } from 'pages/Messenger/NameChoise/NameChoise';
import { useAppDispatch, useAppSelector } from 'store';
import { setMessages, setUser } from 'store/appSlice/appSlice';
import { selectMessages, selectUser } from 'store/appSlice/selectors';

export const Messenger: FC = () => {
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  const [getAllMessages, { data: allMessages, isSuccess: isGetAllMessagesSuccess }] =
    useGetAllMessagesMutation();

  useSocket(dispatch, isGetAllMessagesSuccess, user);

  useEffect(() => {
    if (allMessages) {
      dispatch(setMessages(allMessages));
    }
  }, [allMessages, dispatch, isGetAllMessagesSuccess]);

  useEffect(() => {
    if (user) {
      getAllMessages({ user });
    }
  }, [getAllMessages, user]);

  const onSignOutClick = (): void => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    dispatch(setUser(''));
    dispatch(setMessages([]));
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      {user ? (
        <>
          <Button
            className="mt-2 me-2 position-absolute top-0 end-0"
            onClick={onSignOutClick}
          >
            Sign Out
          </Button>
          <SendMessage />
          <div className="w-75 mt-3" style={{ maxWidth: '400px' }}>
            <Stack gap={3}>
              {messages.map(message => (
                <Message
                  key={message.id}
                  date={new Date(message.date).toLocaleString()}
                  from={message.from}
                  message={message.message}
                  title={message.title}
                />
              ))}
            </Stack>
          </div>
        </>
      ) : (
        <NameChoise />
      )}
    </Container>
  );
};
