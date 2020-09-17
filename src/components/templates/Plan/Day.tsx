/** @format */

import React, { FunctionComponent } from 'react';
import {
  Flex,
  FlexColumn,
  Grid,
  GridColumn,
  Heading,
  HeadingSize,
  HeadingTag,
  Progress,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getCombinedCalories, getMeals, mealsOfTheDay } from './model';
import { Meal } from './Meal';

export interface DayProps {
  schedule: any;
  type: any;
  planId?: string | number;
  refetch: () => void;
  onSavePlan: () => any;
}

export const Day: FunctionComponent<DayProps> = ({
  schedule,
  type,
  ...props
}: DayProps) => {
  const calories = getCombinedCalories(getMeals(type, schedule));
  const percentage = Math.round((calories / 800) * 100);

  return (
    <Wrapper spacing={WrapperSpacing.LARGE}>
      <Wrapper spacing={WrapperSpacing.SMALL}>
        <Flex>
          <FlexColumn>
            <Heading size={HeadingSize.H5} tag={HeadingTag.H3}>
              {type}
            </Heading>
          </FlexColumn>
          <FlexColumn width="150px">
            <Progress value={percentage}>calories: {calories}</Progress>
          </FlexColumn>
        </Flex>
      </Wrapper>

      <Grid>
        {mealsOfTheDay().map((meal, index) => (
          <GridColumn key={`${type}-${index}`} xs={4}>
            <Meal day={type} schedule={schedule} type={meal} {...props} />
          </GridColumn>
        ))}
      </Grid>
    </Wrapper>
  );
};
