import Select from '../../UI/Select';

type TableSelectProps = {
  options: string[];
  value: string;
  passSelectedValue: (value: string) => void
}

export default function TableSelect({options, value, passSelectedValue}: TableSelectProps) {

  const handleChangeOption = (option: string) => {
    passSelectedValue(option);
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChangeOption}
      placeholder='Select an option'
    />
  );
}
