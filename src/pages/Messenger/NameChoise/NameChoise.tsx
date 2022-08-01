import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';

import { Button, Container, Form, Stack } from 'react-bootstrap';

import { useSignUpMutation } from 'api/appApi';
import { useAppDispatch } from 'store';
import { setUser } from 'store/appSlice/appSlice';

export const NameChoise: FC = () => {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const [userInput, setUserInput] = useState('');
  const [remeber, setRemember] = useState(false);
  const isSendDisable = isLoading || !userInput;

  useEffect(() => {
    if (isSuccess) {
      if (remeber) localStorage.setItem('user', userInput);
      dispatch(setUser(userInput));
    }
  }, [isSuccess]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const onSignUpClick = (): void => {
    signUp({ user: userInput });
    sessionStorage.setItem('user', userInput);
  };

  const onSignUpEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      if (e.currentTarget.value) signUp({ user: userInput });
    }
  };

  const onRememberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRemember(e.currentTarget.checked);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div>
        <Stack gap={3} className="align-items-start">
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={onNameChange}
            value={userInput}
            disabled={isLoading}
            onKeyDown={onSignUpEnter}
          />
          <label htmlFor="qwerty">
            <input
              type="checkbox"
              id="qwerty"
              checked={remeber}
              onChange={onRememberChange}
            />
            {'     '}Remember me
          </label>
          <Button onClick={onSignUpClick} disabled={isSendDisable}>
            Sign Up
          </Button>
        </Stack>
      </div>
    </Container>
  );
};
