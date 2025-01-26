'use client';

import { Select, SelectItem, SelectSection } from '@heroui/select';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormDatePicker from './date-picker';
import FormDropdown from './dropdown';
import FormInput from './input';
import FormTextArea from './text-area';

interface TypeSelectProps {
  name: string;
  control: any;
}

const inputTypes = [
  {
    key: 'input',
    label: 'Input',
    items: [
      {
        key: 'text',
        label: 'Text',
      },
      { key: 'textArea', label: 'Text Area' },
      { key: 'url', label: 'URL' },
    ],
  },
  {
    key: 'select',
    label: 'Select',
    items: [
      {
        key: 'select',
        label: 'Select',
      },
    ],
  },
  {
    key: 'date',
    label: 'Date',
    items: [
      {
        key: 'singleDate',
        label: 'Single Date',
      },
      {
        key: 'dateRange',
        label: 'Date Range',
      },
    ],
  },
];

const TypeSelect = ({ name, control, ...props }: TypeSelectProps) => {
  const [selectedKey, setSelectedKey] = useState<string>('text');

  const renderComponent = (key: string) => {
    switch (key) {
      case 'text':
        return <FormInput name={name} control={control} label="Value" />;
      case 'textArea':
        return <FormTextArea name={name} control={control} label="Value" />;
      case 'url':
        return (
          <FormInput
            name={name}
            type="url"
            control={control}
            placeholder="Type your link..."
            label="Value"
          />
        );
      case 'select':
        return <FormDropdown name={name} control={control} />;
      case 'singleDate':
        return <FormDatePicker name={name} control={control} label="Value" />;
      case 'dateRange':
        return (
          <FormDatePicker
            name={name}
            control={control}
            label="Value"
            isTimeRange
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 md:flex-row">
      {renderComponent(selectedKey)}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid } }) => (
          <Select
            className="lg:w-[240px]"
            aria-label="select"
            label="Input Type"
            defaultSelectedKeys={['text']}
            onSelectionChange={(keys) =>
              setSelectedKey(keys.currentKey as string)
            }
            {...props}
          >
            {inputTypes.map((section) => (
              <SelectSection key={section.key} title={section.label}>
                {section.items.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </SelectSection>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default TypeSelect;
