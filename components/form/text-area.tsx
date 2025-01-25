import { Textarea, TextAreaProps } from '@heroui/input';
import { Controller } from 'react-hook-form';

interface FormTextAreaProps extends TextAreaProps {
  name: string;
  control: any;
}

const FormTextArea = ({ name, control, ...props }: FormTextAreaProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          className="md:max-w-[300px]"
          placeholder="Type something..."
          {...props}
        />
      )}
    />
  );
};

export default FormTextArea;
