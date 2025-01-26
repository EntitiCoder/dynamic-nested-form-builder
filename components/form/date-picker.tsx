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

const formatDate = (date: any) => {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
};

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
      render={({ field: { onChange }, fieldState: { error, invalid } }) => (
        <div>
          {isTimeRange ? (
            <DateRangePicker
              onChange={(newValue: any) => {
                const formattedValue = JSON.stringify({
                  start: formatDate(newValue.start),
                  end: formatDate(newValue.end),
                });
                onChange(formattedValue);
              }}
              aria-label="datePicker"
              className="lg:w-[240px]"
            />
          ) : (
            <DatePicker
              onChange={(newValue: any) => {
                const formattedValue = formatDate(newValue);
                onChange(formattedValue);
              }}
              aria-label="datePicker"
              className="lg:w-[240px]"
              {...props}
            />
          )}
          <div className="text-red-600 text-sm mt-2 ml-2">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default FormDatePicker;
