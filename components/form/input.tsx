import { Input, InputProps } from '@heroui/input';
import { Controller } from 'react-hook-form';

interface FormInputProps extends InputProps {
  name: string;
  control: any;
}

const FormInput = ({ name, control, ...props }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid },
      }) => (
        <div>
          <Input
            className="lg:w-[240px]"
            onChange={onChange}
            placeholder="Type something..."
            errorMessage={error?.message}
            {...props}
          />
          <div className="text-red-600 text-sm mt-2 ml-2">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default FormInput;
