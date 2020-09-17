/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { hiphenToSlash } from '@project/services';
import {
  Button,
  Flex,
  FlexColumn,
  Heading,
  HeadingSize,
  HeadingTag,
  Table,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { columnList, getPrettyDate, getSchedule } from './model';

export interface PlanPageProps {
  week: string;
  schedule: string;
}

export const Plan: FunctionComponent<PlanPageProps> = ({
  week,
  schedule
}: PlanPageProps) => {
  function handleCopyWeek() {
    console.log('copy plan');
  }

  return (
    <article>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Heading size={HeadingSize.H5} tag={HeadingTag.H3}>
          {getPrettyDate(week)}
        </Heading>
        <Wrapper spacing={WrapperSpacing.SMALL}>
          <Table columns={columnList} data={getSchedule(schedule)} />
        </Wrapper>
        <Flex>
          <FlexColumn>
            <Link href={`/plan/${hiphenToSlash(week)}`} passHref>
              <Button>View</Button>
            </Link>
          </FlexColumn>
          <FlexColumn>
            <Button onClick={handleCopyWeek}>Copy</Button>
          </FlexColumn>
        </Flex>
      </Wrapper>
    </article>
  );
};
