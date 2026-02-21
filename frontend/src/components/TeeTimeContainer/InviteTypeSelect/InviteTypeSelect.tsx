import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

interface TypeSelectorProps {
  handleClick: (value: string) => void;
}

const TypeSelector = ({ handleClick }: TypeSelectorProps) => {
  const [value, setValue] = useState('private');

  return (
    <SegmentedControl
      value={value}
      onChange={(val) => {
        setValue(val);
        handleClick(val);
      }}
      data={[
        { label: 'Friends', value: 'private' },
        { label: 'Public', value: 'public' },
      ]}
    />
  );
};

export default TypeSelector;
