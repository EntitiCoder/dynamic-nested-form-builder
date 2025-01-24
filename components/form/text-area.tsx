import { Textarea, TextAreaProps } from '@heroui/input';
import { Controller } from 'react-hook-form';

interface FormTextAreaProps extends TextAreaProps {
  control: any;
}

const FormTextArea = ({ control, ...props }: FormTextAreaProps) => {
  return (
    <Controller
      name="groups"
      control={control}
      render={({ field }) => (
        <Textarea className="max-w-xs" label="text area" {...props} />
      )}
    />
  );
};

export default FormTextArea;
