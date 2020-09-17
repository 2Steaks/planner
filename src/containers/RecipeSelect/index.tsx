/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import { FormikFieldType } from '@project/types';
import { withField } from '@project/helpers/withField';
import { withLogging } from '@project/helpers/withLogging';
import { withMappedProps } from '@project/helpers/withMappedProps';
import { withDisplayName } from '@project/helpers/withDisplayName';
import { useGraphQuery } from '@project/hooks';
import { GET_RECIPES } from '@project/graphql';
import { Select, SelectProps } from '@project/components/organisms/Select';
import { getRecord, toSelectOptions } from './model';

export interface RecipeSelectProps {
  index: number;
  value: any;
}

export const RecipeSelect: FunctionComponent<RecipeSelectProps> = (props) => {
  const { data } = useGraphQuery('recipes', GET_RECIPES);
  const recipes = getRecord(data);

  return <Select options={toSelectOptions(recipes)} {...props} />;
};

const computed = (props: FormikFieldType & SelectProps) => ({
  ...props,
  onChange: props.setValue
});

export const RecipeSelectWithField: FunctionComponent<any> = compose(
  withField,
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('RecipeSelectWithField')
)(RecipeSelect);
