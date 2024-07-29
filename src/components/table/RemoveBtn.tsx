import { FormEvent } from 'react';

export default function RemoveButton({
  onClick,
}: {
  onClick: (event: FormEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button className='red-btn' onClick={onClick}>
      Remove
    </button>
  );
}
