import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

const TypeSelector = ({ handleClick }) => {
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
