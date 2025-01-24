import { DatePicker, DatePickerProps } from '@heroui/date-picker';
import { Controller } from 'react-hook-form';

interface FormDatePickerProps extends DatePickerProps {
  control: any;
}

const FormDatePicker = ({ control, ...props }: FormDatePickerProps) => {
  return (
    <Controller
      name="groups"
      control={control}
      render={({ field }) => (
        <DatePicker className="max-w-[284px]" label="date" {...props} />
      )}
    />
  );
};

export default FormDatePicker;
