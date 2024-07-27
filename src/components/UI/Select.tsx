import { useState, useEffect, useRef } from 'react';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className='custom-select' ref={selectRef}>
      <div
        className='custom-select__trigger'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
        <span className='arrow'></span>
      </div>
      {isOpen && (
        <div className='custom-select__options'>
          {options.map((option, index) => (
            <div
              key={index}
              className={`custom-select__option ${selectedValue === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
