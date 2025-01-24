import { Input, InputProps } from '@heroui/input';
import { Controller } from 'react-hook-form';

interface FormInputProps extends InputProps {
  control: any;
}

const FormInput = ({ control, ...props }: FormInputProps) => {
  return (
    <Controller
      name="groups"
      control={control}
      render={({ field }) => <Input label="Input" {...props} />}
    />
  );
};

export default FormInput;
