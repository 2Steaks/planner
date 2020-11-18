/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breakpoints, DaysOfTheWeek, UserType } from '@project/types';
import { CREATE_PLAN, GET_PLAN } from '@project/graphql';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import {
  createPlanQuery,
  hiphenToSlash,
  sendMealPlan
} from '@project/services';
import { useAuth } from '@project/context';
import {
  Button,
  ButtonType,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexColumn,
  FlexJustifyContent,
  Heading,
  HeadingSize,
  HeadingTag,
  MenuButton,
  List,
  ListItem,
  WeekPicker,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import {
  createInitialValues,
  formatDate,
  getCreateRecord,
  getId,
  getRecord,
  getSchedule
} from './model';
import { Day } from './Day';
import { ButtonVariant } from '@project/components/atoms';

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
        <title>Meal Planner: {formattedDate}</title>
      </Head>

      <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
        <FlexColumn>
          <Heading tag={HeadingTag.H1}>Meal Planner</Heading>
          <Heading size={HeadingSize.H4} tag={HeadingTag.H2}>
            {formattedDate}
          </Heading>
        </FlexColumn>
        <FlexColumn>
          <MenuButton>
            <List>
              <ListItem padding>
                <Button
                  disabled={isLoading}
                  type={ButtonType.BUTTON}
                  variant={ButtonVariant.NONE}
                  onClick={() => sendMealPlan(user, record)}
                >
                  Share
                </Button>
              </ListItem>
              <ListItem padding>
                <Link
                  href={`/plan/${hiphenToSlash(week as string)}/shopping`}
                  passHref
                >
                  <Button
                    disabled={isLoading}
                    type={ButtonType.BUTTON}
                    variant={ButtonVariant.NONE}
                  >
                    Shopping
                  </Button>
                </Link>
              </ListItem>
            </List>
          </MenuButton>
        </FlexColumn>
      </Flex>

      <When condition={isLoading}>
        <p>...loading</p>
      </When>
      <When condition={!isLoading}>
        <Wrapper constraint={Breakpoints.TINY} spacing={WrapperSpacing.LARGE}>
          <WeekPicker name="week" value={week} onChange={handleWeekChange} />
        </Wrapper>

        {DaysOfTheWeek.map((day, index) => (
          <Day
            key={`${day}-${index}`}
            planId={getId(record as any)}
            refetch={refetch}
            schedule={getSchedule(record)}
            type={day}
            onSavePlan={handleSavePlan}
          />
        ))}
      </When>
    </ErrorBoundary>
  );
};

export default PlanPage;
