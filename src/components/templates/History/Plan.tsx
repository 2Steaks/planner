/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { getStartAndEndDateFromWeek, hiphenToSlash } from '@project/services';
import {
  ButtonVariant,
  // CopyIcon,
  EyeIcon,
  Flex,
  FlexColumn,
  FlexAlignItems,
  FlexJustifyContent,
  Heading,
  HeadingSize,
  HeadingTag,
  List,
  ListItem,
  MenuButton,
  MenuListButton,
  Table,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { columnList, getSchedule } from './model';
import { Article } from './styles';

export interface PlanPageProps {
  week: string;
  schedule: string;
}

export const Plan: FunctionComponent<PlanPageProps> = ({
  week,
  schedule
}: PlanPageProps) => {
  // function handleCopyWeek() {
  //   console.log('copy plan');
  // }

  return (
    <Article>
      <Wrapper spacing={WrapperSpacing.MEDIUM}>
        <Flex
          alignItems={FlexAlignItems.CENTER}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <FlexColumn>
            <Heading size={HeadingSize.H5} tag={HeadingTag.H3}>
              {getStartAndEndDateFromWeek(week)}
            </Heading>
          </FlexColumn>
          <FlexColumn>
            <MenuButton>
              <List>
                <ListItem dropMargin>
                  <Link href={`/plan/${hiphenToSlash(week)}`} passHref>
                    <MenuListButton variant={ButtonVariant.NONE}>
                      <EyeIcon size={1.2} /> <span>View</span>
                    </MenuListButton>
                  </Link>
                </ListItem>
                {/* <ListItem dropMargin>
                  <Button onClick={handleCopyWeek} variant={ButtonVariant.NONE}>
                    <CopyIcon size={1.2} /> <span>Copy</span>
                  </Button>
                </ListItem> */}
              </List>
            </MenuButton>
          </FlexColumn>
        </Flex>

        <Wrapper spacing={WrapperSpacing.SMALL}>
          <Table columns={columnList} data={getSchedule(schedule)} />
        </Wrapper>
      </Wrapper>
    </Article>
  );
};
