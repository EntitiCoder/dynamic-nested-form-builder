import { Select, SelectItem } from '@heroui/select';
import { Controller } from 'react-hook-form';

interface FormSelectProps {
  control: any;
  options: { key: string; label: string }[];
}

const FormSelect = ({ control, options, ...props }: FormSelectProps) => {
  return (
    <Controller
      name="groups"
      control={control}
      render={({ field }) => (
        <Select className="max-w-xs" label="select" {...props}>
          {options.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default FormSelect;
