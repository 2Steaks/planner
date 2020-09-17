/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breakpoints, UserType } from '@project/types';
import { CREATE_PLAN, GET_PLAN } from '@project/graphql';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import { createPlanQuery, hiphenToSlash } from '@project/services';
import { useAuth } from '@project/context';
import {
  Button,
  ButtonVariant,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  Drawer,
  DrawerPosition,
  Heading,
  WeekPicker,
  When,
  Wrapper
} from '@project/components';
import {
  createInitialValues,
  daysOfTheWeek,
  formatDate,
  getCreateRecord,
  getId,
  getRecord,
  getSchedule
} from './model';
import { Day } from './Day';
import { HeadingTag, WrapperSpacing } from '@project/components/atoms';

interface PlanPageProps {
  week?: string;
}

/**
 *
 *
 * @returns
 */
const PlanPage: FunctionComponent<PlanPageProps> = ({
  week
}: PlanPageProps) => {
  const { user } = useAuth() as { user: UserType };
  const router = useRouter();

  const [createPlan] = useGraphMutation(CREATE_PLAN);

  const { data, isLoading, refetch } = useGraphQuery(
    [`plan/${week}`, { week }],
    GET_PLAN,
    {
      enabled: Boolean(week)
    }
  );

  const record = getRecord(data);
  const hasRecord = Boolean(record);
  const formattedDate = formatDate(new Date());

  function handleWeekChange(value: string) {
    router.push(`/plan/${hiphenToSlash(value)}`);
  }

  async function handleSavePlan() {
    if (!hasRecord) {
      const response = await createPlan(
        createPlanQuery(createInitialValues(record, week as string, user.id))
      );

      return getCreateRecord(response);
    }

    return record;
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Head>
        <title>Plan: {formattedDate}</title>
      </Head>
      <Heading tag={HeadingTag.H1}>Plan: {formattedDate}</Heading>

      <When condition={isLoading}>
        <p>...loading</p>
      </When>
      <When condition={!isLoading}>
        <Wrapper constraint={Breakpoints.TINY} spacing={WrapperSpacing.LARGE}>
          <WeekPicker name="week" value={week} onChange={handleWeekChange} />
        </Wrapper>

        {daysOfTheWeek().map((day, index) => (
          <Day
            key={`${day}-${index}`}
            planId={getId(record as any)}
            refetch={refetch}
            schedule={getSchedule(record)}
            type={day}
            onSavePlan={handleSavePlan}
          />
        ))}
        <Drawer padding position={DrawerPosition.BOTTOM}>
          <Flex>
            <FlexColumn>
              <Button
                disabled={isLoading}
                type={ButtonVariant.BUTTON}
                onClick={console.log}
              >
                Share
              </Button>
            </FlexColumn>
            <FlexColumn>
              <Link
                href={`/shopping/${hiphenToSlash(week as string)}`}
                passHref
              >
                <Button disabled={isLoading} type={ButtonVariant.BUTTON}>
                  Shopping
                </Button>
              </Link>
            </FlexColumn>
          </Flex>
        </Drawer>
      </When>
    </ErrorBoundary>
  );
};

export default PlanPage;
