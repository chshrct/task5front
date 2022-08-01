/* eslint-disable no-param-reassign */
import { FC } from 'react';

import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { useCreateMessageMutation, useGetAllUserNameQuery } from 'api/appApi';
import { MessageType } from 'api/types';
import { useAppSelector } from 'store';
import { selectUser } from 'store/appSlice/selectors';

export const SendMessage: FC = () => {
  const { data: options } = useGetAllUserNameQuery();
  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const user = useAppSelector(selectUser);

  const formik = useFormik({
    initialValues: {
      to: '',
      title: '',
      message: '',
    },
    validate({ message, to, title }) {
      const errors = {} as MessageType;

      if (!message) errors.message = 'Required';
      if (!to) errors.to = 'Required';
      if (options && !options.includes(to)) errors.to = 'There is no such user';
      if (!title) errors.title = 'Required';

      return errors;
    },
    onSubmit(values) {
      const message = { ...values } as MessageType;

      message.from = user;
      createMessage(message);
      values.title = '';
      values.message = '';
    },
  });

  const sendDisabled =
    !!formik.errors.message ||
    !!formik.errors.title ||
    !!formik.errors.to ||
    !formik.values.message ||
    !formik.values.title ||
    !formik.values.to ||
    isLoading;

  if (!options) return null;

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="w-75 mt-5"
      style={{ maxWidth: '400px' }}
    >
      <Typeahead
        id="to"
        placeholder="to"
        multiple={false}
        disabled={isLoading}
        onChange={selected => {
          const value = selected.length > 0 ? selected[0] : '';

          formik.setFieldValue('to', value);
        }}
        onInputChange={text => formik.setFieldValue('to', text, true)}
        onBlur={() => formik.setTouched({ to: true }, true)}
        allowNew={false}
        labelKey="to"
        options={options}
      />
      <div className="mb-1" style={{ height: '20px' }}>
        {formik.getFieldMeta('to').touched && formik.getFieldMeta('to').error ? (
          <Form.Text className="text-danger">{formik.getFieldMeta('to').error}</Form.Text>
        ) : null}
      </div>
      <Form.Control
        type="title"
        placeholder="title"
        disabled={isLoading}
        {...formik.getFieldProps('title')}
      />
      <div className="mb-1" style={{ height: '20px' }}>
        {formik.touched.title && formik.errors.title ? (
          <Form.Text className="text-danger">{formik.errors.title}</Form.Text>
        ) : null}
      </div>
      <Form.Control
        as="textarea"
        rows={4}
        type="message"
        disabled={isLoading}
        placeholder="message"
        {...formik.getFieldProps('message')}
      />
      <div className="mb-1" style={{ height: '20px' }}>
        {formik.touched.message && formik.errors.message ? (
          <Form.Text className="text-danger">{formik.errors.message}</Form.Text>
        ) : null}
      </div>
      <Button type="submit" disabled={sendDisabled}>
        Send
      </Button>
    </Form>
  );
};
