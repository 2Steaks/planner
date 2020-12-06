/** @format */

import React, { FunctionComponent, useState } from 'react';
import { useGraphQuery } from '@project/hooks';
import { map } from 'ramda';
import { GET_PLANS_SORTED_BY_WEEK } from '@project/graphql';
import { Breakpoints } from '@project/types';
import { hasHistory } from '@project/services';
import { BackButton } from '@project/containers';
import {
  Button,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  Heading,
  Select,
  Wrapper,
  WrapperSpacing,
  When
} from '@project/components';
import {
  getNextPage,
  getPageLimitOptions,
  getPrevPage,
  getRecord
} from './model';
import { Plan } from './Plan';

const PAGE_LIMITS = [5, 10, 25];
const initialLimit = PAGE_LIMITS[0];
const Plans = map(Plan);

const History: FunctionComponent = () => {
  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState<any>(null);

  const { data } = useGraphQuery(
    ['history', { limit, page }],
    GET_PLANS_SORTED_BY_WEEK
  );

  function handlePrev() {
    setPage(getPrevPage(data));
  }

  function handleNext() {
    setPage(getNextPage(data));
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Flex alignItems={FlexAlignItems.BASELINE}>
        <When condition={hasHistory()}>
          <FlexColumn shrink={1}>
            <BackButton />
          </FlexColumn>
        </When>
        <FlexColumn grow={1}>
          <Heading>History</Heading>
        </FlexColumn>
      </Flex>
      <Wrapper constraint={Breakpoints.TINY} spacing={WrapperSpacing.LARGE}>
        <Select
          options={getPageLimitOptions(PAGE_LIMITS)}
          onChange={setLimit}
          value={limit}
        />
      </Wrapper>

      <section>{Plans(getRecord(data))}</section>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <FlexColumn>
          <Button disabled={!getPrevPage(data)} onClick={handlePrev}>
            Prev
          </Button>
        </FlexColumn>
        <FlexColumn>
          <Button disabled={!getNextPage(data)} onClick={handleNext}>
            Next
          </Button>
        </FlexColumn>
      </Flex>
    </ErrorBoundary>
  );
};

export default History;
