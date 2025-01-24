'use client';

import FormDatePicker from '@/components/form/date-picker';
import FormInput from '@/components/form/input';
import FormSelect from '@/components/form/select';
import FormTextArea from '@/components/form/text-area';
import { useForm } from 'react-hook-form';

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

export default function Home() {
  const { control } = useForm();
  return (
    <>
      <FormInput control={control} />
      <FormTextArea control={control} />
      <FormSelect options={animals} control={control} />
      <FormDatePicker control={control} />
      <FormInput control={control} type="url" label="Link" />
    </>
  );
}
