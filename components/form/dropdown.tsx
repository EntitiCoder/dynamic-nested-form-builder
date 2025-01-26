import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Input } from '@heroui/input';
import { useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { RemoveIcon } from '../icons';

interface FormDropdownProps {
  name: string;
  control: any;
}

const FormDropdown = ({ name, control }: FormDropdownProps) => {
  const { append, remove, fields, update } = useFieldArray({
    name,
    control,
    shouldUnregister: true,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error, invalid },
      }) => (
        <div>
          <Dropdown className="lg:w-[240px]" closeOnSelect={false}>
            <DropdownTrigger>
              <Button className="lg:w-[240px]">Options</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Options">
              <>
                {fields.map((option, index) => (
                  <DropdownItem key={option.id}>
                    {editingIndex === index ? (
                      <Input
                        type="text"
                        variant="bordered"
                        value={option.value}
                        onChange={(e) =>
                          update(index, { ...option, value: e.target.value })
                        }
                        onBlur={() => setEditingIndex(null)}
                        autoFocus
                      />
                    ) : (
                      <div className="flex justify-between items-center w-full">
                        <span onClick={() => setEditingIndex(index)}>
                          {option.value}
                        </span>
                        <Button isIconOnly onPress={() => remove(index)}>
                          <RemoveIcon />
                        </Button>
                      </div>
                    )}
                  </DropdownItem>
                ))}
              </>
              <DropdownItem
                key="add"
                onPress={() => append({ value: 'New Option' })}
              >
                Add Option
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="text-red-600 text-sm mt-2 ml-2">{error?.message}</div>
        </div>
      )}
    />
  );
};

export default FormDropdown;
