'use client';

import { FormTypeCreateProfile } from '@/components/form';
import FormInput from '@/components/form/input';
import TypeSelect from '@/components/form/type-select';
import { AddIcon, RemoveIcon } from '@/components/icons';
import { Button } from '@heroui/button';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

export const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' },
];

export default function ProfileForm() {
  const form = useForm<FormTypeCreateProfile>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          console.log('Form submitted: 🎉', data);
        })}
      >
        <h1 className="text-lg text-center font-bold">Profile Form</h1>
        <FormProvider {...form}>
          <CreateNewCategory />
        </FormProvider>
        <button
          className="px-4 py-2 bg-blue-600 rounded-lg text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
}

const CreateNewCategory = () => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;
  const { append, remove, fields } = useFieldArray({
    name: 'category',
    control,
    shouldUnregister: true,
  });

  return (
    <div className="flex flex-col gap-4 ">
      {fields.map((category, categoryIndex) => (
        <div
          key={category.id}
          className="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg"
        >
          <div className="flex gap-2 ">
            <FormInput
              name={`category.${categoryIndex}.title`}
              control={control}
              placeholder="Type your category title ..."
            />
            <Button isIconOnly onPress={() => remove(categoryIndex)}>
              <RemoveIcon />
            </Button>
          </div>
          <CreateNewCategoryField
            control={control}
            categoryIndex={categoryIndex}
          />
        </div>
      ))}
      <Button
        endContent={<AddIcon />}
        onPress={() => append({ fields: [], title: '' })}
      >
        Create a new category
      </Button>
    </div>
  );
};

const CreateNewCategoryField = ({
  categoryIndex,
  control,
}: {
  categoryIndex: number;
  control: any;
}) => {
  const { append, remove, fields } = useFieldArray({
    name: `category.${categoryIndex}.fields`,
    control,
    shouldUnregister: true,
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((categoryField, categoryFieldIndex) => (
        <div
          key={categoryField.id}
          className="flex flex-col gap-2  pl-5 md:flex-row"
        >
          <div className="flex gap-2 md:block">
            <FormInput
              name={`category.${categoryIndex}.fields.${categoryFieldIndex}.title`}
              control={control}
              placeholder="Type your field title ..."
            />
            <Button
              className="md:hidden"
              isIconOnly
              onPress={() => remove(categoryFieldIndex)}
            >
              <RemoveIcon />
            </Button>
          </div>

          <div className="block md:flex md:gap-2 md:items-start">
            <TypeSelect
              name={`category.${categoryIndex}.fields.${categoryFieldIndex}.value`}
              control={control}
            />
            <Button
              className="hidden md:flex"
              isIconOnly
              onPress={() => remove(categoryFieldIndex)}
            >
              <RemoveIcon />
            </Button>
          </div>
        </div>
      ))}
      <Button
        radius="lg"
        variant="shadow"
        endContent={<AddIcon />}
        onPress={() => append({ title: '', value: '' })}
      >
        Create a new field
      </Button>
    </div>
  );
};
