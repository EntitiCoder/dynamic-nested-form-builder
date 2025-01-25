import {
  DatePicker,
  DatePickerProps,
  DateRangePicker,
} from '@heroui/date-picker';
import { Controller } from 'react-hook-form';

interface FormDatePickerProps extends DatePickerProps {
  name: string;
  control: any;
  isTimeRange?: boolean;
}

const FormDatePicker = ({
  name,
  control,
  isTimeRange,
  ...props
}: FormDatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {isTimeRange ? (
            <DateRangePicker aria-label="datePicker" className="md:w-[300px]" />
          ) : (
            <DatePicker
              aria-label="datePicker"
              className="md:w-[300px]"
              {...props}
            />
          )}
        </>
      )}
    />
  );
};

export default FormDatePicker;
