import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h4>{title}</h4>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div className="accordion-content" style={!isOpen ? {display: 'none'} : undefined}>{children}</div>
    </div>
  );
};

export default Accordion;
