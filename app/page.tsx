'use client';

import FormInput from '@/components/form/input';
import TypeSelect from '@/components/form/type-select';
import { AddIcon, RemoveIcon } from '@/components/icons';
import { FormTypeCreateProfile, schema } from '@/libs/formSchema';
import { Button } from '@heroui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

export default function ProfileForm() {
  const form = useForm<FormTypeCreateProfile>({
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        console.log('Form submitted: 🎉', data);
      })}
    >
      <h1 className="text-lg text-center font-bold">Profile Form Builder</h1>
      <FormProvider {...form}>
        <CreateNewCategory />
      </FormProvider>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

const CreateNewCategory = () => {
  const methods = useFormContext();
  const { control } = methods;
  const { append, remove, fields } = useFieldArray({
    name: 'category',
    control,
    shouldUnregister: true,
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((category, categoryIndex) => (
        <div
          key={category.id}
          className="flex flex-col p-2 border border-gray-200 rounded-lg"
        >
          <div className="flex gap-2">
            <FormInput
              name={`category.${categoryIndex}.title`}
              control={control}
              placeholder="Type your category title ..."
            />
            <Button isIconOnly onPress={() => remove(categoryIndex)}>
              <RemoveIcon />
            </Button>
          </div>
          <CreateNewCategoryField categoryIndex={categoryIndex} />
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
}: {
  categoryIndex: number;
}) => {
  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    name: `category.${categoryIndex}.fields`,
    control,
    shouldUnregister: true,
  });

  return (
    <div className="flex divide-y-2 flex-col gap-4">
      {fields.map((categoryField, categoryFieldIndex) => (
        <div
          key={categoryField.id}
          className="flex flex-col gap-2  pl-5 pt-3 md:flex-row"
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
