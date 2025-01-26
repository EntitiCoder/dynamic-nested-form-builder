'use client';

import FormCheckbox from '@/components/form/checkbox';
import FormInput from '@/components/form/input';
import TypeSelect from '@/components/form/type-select';
import { AddIcon, MoveIcon, RemoveIcon } from '@/components/icons';
import { FormTypeCreateProfile, schema } from '@/libs/formSchema';
import { Button } from '@heroui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

// Dynamic import for disable loading react beautiful dnd on ssr mode

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);

const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

// Reused buttons

const RemoveButton = ({ onPress, ...props }) => (
  <Button color="danger" isIconOnly onPress={onPress} {...props}>
    <RemoveIcon />
  </Button>
);

const MoveButton = ({ ...props }) => (
  <Button isIconOnly {...props}>
    <MoveIcon />
  </Button>
);

export default function ProfileForm() {
  const form = useForm<FormTypeCreateProfile>({
    defaultValues: {
      category: [
        {
          title: '',
          fields: [
            {
              title: '',
              isRequired: true,
            },
          ],
        },
      ],
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = form;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        alert('Form submitted: 🎉');
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
  const { append, remove, move, fields } = useFieldArray({
    name: 'category',
    control,
    shouldUnregister: true,
  });

  const handleDragDrop = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
    <div className="">
      <DragDropContext onDragEnd={handleDragDrop}>
        <ul>
          <Droppable
            droppableId="category"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={true}
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((category, categoryIndex) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={categoryIndex}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={clsx(
                          snapshot.isDragging && 'bg-blue-500',
                          'flex flex-col p-4 border border-gray-200 rounded-lg mb-4'
                        )}
                      >
                        <div className="flex gap-2">
                          <FormInput
                            name={`category.${categoryIndex}.title`}
                            control={control}
                            placeholder="Type your category title ..."
                          />
                          <RemoveButton onPress={() => remove(categoryIndex)} />
                          <MoveButton {...provided.dragHandleProps} />
                        </div>
                        <CreateNewCategoryField categoryIndex={categoryIndex} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
      <Button
        className="mt-2"
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
  const { append, remove, fields, move } = useFieldArray({
    name: `category.${categoryIndex}.fields`,
    control,
    shouldUnregister: true,
  });

  const handleDragDropField = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDropField}>
      <div>
        <ul className="flex divide-y-2 flex-col gap-4">
          <Droppable
            droppableId="categoryFields"
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={true}
            direction="vertical"
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((categoryField, categoryFieldIndex) => (
                  <Draggable
                    key={categoryField.id}
                    draggableId={categoryField.id}
                    index={categoryFieldIndex}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={clsx(
                          snapshot.isDragging && 'bg-blue-500',
                          'flex flex-col gap-2  px-5 pt-3  rounded-lg  md:flex-row'
                        )}
                      >
                        <div className="flex gap-2 md:block">
                          <FormInput
                            name={`category.${categoryIndex}.fields.${categoryFieldIndex}.title`}
                            control={control}
                            placeholder="Type your field title ..."
                            label="Field"
                          />
                          <RemoveButton
                            className="md:hidden"
                            onPress={() => remove(categoryFieldIndex)}
                          />
                          <MoveButton
                            className="md:hidden"
                            {...provided.dragHandleProps}
                          />
                        </div>
                        <div className="block md:flex md:gap-2 md:items-start">
                          <TypeSelect
                            name={`category.${categoryIndex}.fields.${categoryFieldIndex}.value`}
                            control={control}
                          />
                          <FormCheckbox
                            className="mt-2 md:mt-0"
                            name={`category.${categoryIndex}.fields.${categoryFieldIndex}.isRequired`}
                            control={control}
                          />
                          <RemoveButton
                            className="hidden md:flex"
                            onPress={() => remove(categoryFieldIndex)}
                          />
                          <MoveButton
                            className="hidden md:flex"
                            {...provided.dragHandleProps}
                          />
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
        <Button
          className="mt-2 mx-5"
          radius="lg"
          variant="shadow"
          endContent={<AddIcon />}
          onPress={() => append({ title: '', value: '', isRequired: true })}
        >
          Create a new field
        </Button>
      </div>
    </DragDropContext>
  );
};
