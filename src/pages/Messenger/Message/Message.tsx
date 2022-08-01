import { FC } from 'react';

import { Accordion, Card } from 'react-bootstrap';

import { CustomToggle } from './CustomToggle/CustomToggle';

type MessageType = {
  from: string;
  title: string;
  date: string;
  message: string;
};

export const Message: FC<MessageType> = ({ date, from, message, title }) => {
  return (
    <Accordion className="w-100" style={{ maxWidth: '400px' }}>
      <Card bg="light" key="light" style={{ width: '18rem' }} className="mb-2 w-100">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex text-break w-75">{from}</div>
          <div className="text-end">{date}</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <CustomToggle eventKey="0">{title}</CustomToggle>
          </Card.Title>
          <Accordion.Collapse eventKey="0">
            <Card.Text>{message}</Card.Text>
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
  );
};
