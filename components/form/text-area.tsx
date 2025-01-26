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
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid },
      }) => (
        <div>
          <Textarea
            className="lg:w-[240px]"
            onChange={onChange}
            placeholder="Type something..."
            {...props}
          />
          <div className="text-red-600 text-sm mt-2 ml-2">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default FormTextArea;
