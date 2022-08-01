import { FC, ReactNode } from 'react';

import { useAccordionButton } from 'react-bootstrap';

type PropsType = {
  children: ReactNode;
  eventKey: string;
};

export const CustomToggle: FC<PropsType> = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <span role="button" aria-hidden="true" onClick={decoratedOnClick}>
      {children}
    </span>
  );
};
