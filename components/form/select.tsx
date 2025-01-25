import { Select, SelectItem } from '@heroui/select';
import { Controller, useFieldArray } from 'react-hook-form';

interface FormSelectProps {
  name: string;
  control: any;
  options: { key: string; label: string }[];
}

const FormSelect = ({ name, control, options, ...props }: FormSelectProps) => {
  const { append, remove, fields } = useFieldArray({
    name: 'select',
    control,
    shouldUnregister: true,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select className="max-w-xs" aria-label="select" {...props}>
          <>
            {fields.map((category, categoryIndex) => (
              <SelectItem key={category.id}>abc</SelectItem>
            ))}
          </>
          <SelectItem key="add" onPress={() => append({ label: 'New Option' })}>
            Add Option
          </SelectItem>
        </Select>
      )}
    />
  );
};

export default FormSelect;
