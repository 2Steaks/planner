/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DaysOfTheWeek, UserType } from '@project/types';
import { CREATE_PLAN, GET_PLAN } from '@project/graphql';
import { useGraphMutation, useGraphQuery } from '@project/hooks';
import {
  createPlanQuery,
  getStartAndEndDateFromWeek,
  hiphenToSlash,
  sendMealPlan
} from '@project/services';
import { useAuth } from '@project/context';
import { BackButton } from '@project/containers';
import {
  AppBar,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  ButtonType,
  ButtonVariant,
  EmailIcon,
  ErrorBoundary,
  ErrorFallback,
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent,
  HeadingTag,
  Heading,
  MenuButton,
  MenuListButton,
  List,
  ListItem,
  ShoppingCartIcon,
  When,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { WeekPickerWrapper } from './styles';
import {
  createInitialValues,
  getCreateRecord,
  getId,
  getRecord,
  getSchedule,
  incrementWeek
} from './model';
import { Day } from './Day';

interface PlanPageProps {
  week: string;
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
    GET_PLAN
  );

  const record = getRecord(data);
  const hasRecord = Boolean(record);

  function handleWeekChange(offset: number) {
    return function () {
      router.push(`/plan/${hiphenToSlash(incrementWeek(offset)(week))}`);
    };
  }

  async function handleSavePlan() {
    if (!hasRecord) {
      const response = await createPlan(
        createPlanQuery(createInitialValues(record, week, user.id))
      );

      return getCreateRecord(response);
    }

    return record;
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Head>
        <title>Meal Planner: {getStartAndEndDateFromWeek(week)}</title>
      </Head>

      <AppBar isSticky>
        <Wrapper spacing={WrapperSpacing.MEDIUM}>
          <Flex
            alignItems={FlexAlignItems.BASELINE}
            justifyContent={FlexJustifyContent.SPACE_BETWEEN}
          >
            <FlexColumn shrink={1}>
              <BackButton url="/" />
            </FlexColumn>
            <FlexColumn grow={1}>
              <Heading tag={HeadingTag.H1}>Meal Planner</Heading>
            </FlexColumn>
            <FlexColumn>
              <MenuButton>
                <List>
                  <ListItem dropMargin>
                    <MenuListButton
                      disabled={isLoading}
                      type={ButtonType.BUTTON}
                      variant={ButtonVariant.NONE}
                      onClick={() => sendMealPlan(user, record)}
                    >
                      <EmailIcon size={1.2} /> <span>Send</span>
                    </MenuListButton>
                  </ListItem>
                  <ListItem dropMargin>
                    <Link
                      href={`/plan/${hiphenToSlash(week)}/shopping`}
                      passHref
                    >
                      <MenuListButton
                        disabled={isLoading}
                        type={ButtonType.BUTTON}
                        variant={ButtonVariant.NONE}
                      >
                        <ShoppingCartIcon size={1.2} /> <span>Shopping</span>
                      </MenuListButton>
                    </Link>
                  </ListItem>
                </List>
              </MenuButton>
            </FlexColumn>
          </Flex>
        </Wrapper>
      </AppBar>

      <When condition={isLoading}>
        <p>...loading</p>
      </When>

      <When condition={!isLoading}>
        <WeekPickerWrapper spacing={WrapperSpacing.MEDIUM}>
          <List inline>
            <ListItem>
              <Button
                onClick={handleWeekChange(-1)}
                type={ButtonType.BUTTON}
                variant={ButtonVariant.NONE}
              >
                <ArrowLeftIcon />
              </Button>
            </ListItem>
            <ListItem>{getStartAndEndDateFromWeek(week)}</ListItem>
            <ListItem>
              <Button
                onClick={handleWeekChange(1)}
                type={ButtonType.BUTTON}
                variant={ButtonVariant.NONE}
              >
                <ArrowRightIcon />
              </Button>
            </ListItem>
          </List>
        </WeekPickerWrapper>

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
