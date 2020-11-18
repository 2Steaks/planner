/** @format */

import React, { FunctionComponent } from 'react';
import { Select } from '@project/components/organisms/Select';
import { findByValue } from './model';

export interface TagEditorOption {
  label: string;
  value: string;
}

export interface TagEditorProps {
  className?: string;
  isDisabled?: boolean;
  onChange: (...props: any[]) => void;
  suggestions: TagEditorOption[];
  value?: TagEditorOption[];
}

export const TagEditor: FunctionComponent<TagEditorProps> = ({
  isDisabled = false,
  onChange,
  suggestions = [],
  value = []
}: TagEditorProps) => {
  const filteredSuggestions = suggestions;

  function handleSelectChange(value: string) {
    onChange(findByValue(value, suggestions));
  }

  return (
    <Select
      disabled={isDisabled}
      multiple
      options={filteredSuggestions}
      onChange={handleSelectChange}
      value={value}
    />
  );
};
