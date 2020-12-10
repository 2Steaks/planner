/** @format */

import React, { FunctionComponent } from 'react';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import { GET_TAGS, PARTIAL_UPDATE_RECIPE } from '@project/graphql';
import { createRecipeQuery } from '@project/services';
import { withField } from '@project/helpers/withField';
import { Select } from '@project/components/organisms/Select';
import { getSuggestions, createOptions, differenceToId } from './model';

export interface TagPickerProps {
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: () => void;
  recordId: string;
  value?: any[];
}

export const TagPicker: FunctionComponent<TagPickerProps> = withField(
  ({ onChange, recordId, value = [], ...props }: TagPickerProps) => {
    const { data, refetch } = useGraphQuery('tags', GET_TAGS);

    const [updateRecipe] = useGraphMutation(PARTIAL_UPDATE_RECIPE, {
      onSuccess: onChange
    });

    async function handleCreate(name: string) {
      await updateRecipe(
        createRecipeQuery({
          id: recordId,
          createTags: [{ name: name.toLowerCase() }]
        })
      );

      refetch();
    }

    async function handleChange(values: any[]) {
      const tags = values.map(({ value, label }: any) => ({
        id: value,
        name: label
      }));

      const connections = differenceToId(tags, value);
      const disconnections = differenceToId(value, tags);

      updateRecipe(
        createRecipeQuery({
          id: recordId,
          connectTags: connections,
          disconnectTags: disconnections
        })
      );
    }

    function handleKeyPress(event: any) {
      if (event.key === 'Enter') {
        handleCreate(event.target.value);
      }
    }

    return (
      <Select
        multiple
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        options={getSuggestions(data)}
        value={createOptions(value)}
        {...props}
      />
    );
  }
);
