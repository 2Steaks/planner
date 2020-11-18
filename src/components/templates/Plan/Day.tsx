/** @format */

import React, { FunctionComponent } from 'react';
import { DaysOfTheWeek, MealsOfTheDay } from '@project/types';
import { useAuth } from '@project/context';
import {
  Flex,
  FlexColumn,
  Grid,
  GridColumn,
  Heading,
  HeadingSize,
  HeadingTag,
  ProgressCalories,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { getCombinedCalories, getMeals } from './model';
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
  const { user } = useAuth() as any;
  const calories = getCombinedCalories(getMeals(type, schedule));
  const percentage = Math.round((calories / (user.calories + 200)) * 100);
  const isLast = type === DaysOfTheWeek[DaysOfTheWeek.length - 1];

  return (
    <Wrapper spacing={!isLast ? WrapperSpacing.LARGE : WrapperSpacing.NONE}>
      <Wrapper spacing={WrapperSpacing.SMALL}>
        <Flex>
          <FlexColumn>
            <Heading size={HeadingSize.H5} tag={HeadingTag.H3}>
              {type}
            </Heading>
          </FlexColumn>
          <FlexColumn width="150px">
            <ProgressCalories value={percentage}>
              calories: {calories}
            </ProgressCalories>
          </FlexColumn>
        </Flex>
      </Wrapper>

      <Grid>
        {MealsOfTheDay.map((meal, index) => (
          <GridColumn key={`${type}-${index}`} xs={12} sm={6} md={4}>
            <Meal day={type} schedule={schedule} type={meal} {...props} />
          </GridColumn>
        ))}
      </Grid>
    </Wrapper>
  );
};
