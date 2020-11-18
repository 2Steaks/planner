/** @format */

import React, { FunctionComponent } from 'react';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import { GET_TAGS, UPDATE_TAG } from '@project/graphql';
import { createTagQuery } from '@project/services';
import { withField } from '@project/helpers/withField';
import {
  TagEditor,
  TagEditorOption
} from '@project/components/organisms/TagEditor';
import { getSuggestions, createOptions } from './model';

export interface TagPickerProps {
  onChange: () => void;
  recordId: string;
  value: any[];
}

export const TagPicker: FunctionComponent<TagPickerProps> = withField(
  ({ onChange, recordId, value = [], ...props }: TagPickerProps) => {
    const { data, refetch } = useGraphQuery('tags', GET_TAGS);
    const suggestions = getSuggestions(data);

    // const [createTag] = useGraphMutation(CREATE_TAG, {
    //   onSuccess: handleCompleted
    // });
    const [updateTag] = useGraphMutation(UPDATE_TAG, {
      onSuccess: handleCompleted
    });

    // function handleCreate(name: string) {
    //   createTag(
    //     createTagQuery({
    //       name,
    //       connectRecipe: recordId
    //     })
    //   );
    // }

    // function handleAdd(tag: TagEditorOption) {
    //   updateTag(
    //     createTagQuery({
    //       id: tag.value,
    //       name: tag.label,
    //       connectRecipe: recordId
    //     })
    //   );
    // }

    function handleChange(tag: TagEditorOption) {
      updateTag(
        createTagQuery({
          id: tag.value,
          name: tag.label,
          disconnectRecipe: recordId
        })
      );
    }

    function handleCompleted() {
      refetch();
      onChange();
    }

    return (
      <TagEditor
        // onAdd={handleAdd}
        // onCreate={handleCreate}
        onChange={handleChange}
        suggestions={suggestions}
        value={createOptions(value)}
        {...props}
      />
    );
  }
);
