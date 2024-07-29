import Select from '../UI/Select';
import styles from './TaskCard.module.css';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function CardSelect({
  options,
  value,
  onChange,
  placeholder,
}: SelectProps) {
  return (
    <div className={styles.selectWrapper}>
      <Select
        value={value}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}
