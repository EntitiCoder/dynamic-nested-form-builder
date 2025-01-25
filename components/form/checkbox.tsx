import { Checkbox, CheckboxProps } from '@heroui/checkbox';
import { Controller } from 'react-hook-form';

interface FormCheckboxProps extends CheckboxProps {
  name: string;
  control: any;
}

const FormCheckbox = ({ name, control, ...props }: FormCheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid },
      }) => (
        <div>
          <Checkbox
            onChange={onChange}
            isSelected={value}
            defaultSelected
            {...props}
          >
            required
          </Checkbox>
          <div className="text-red-600 text-sm mt-2 ml-2">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default FormCheckbox;
