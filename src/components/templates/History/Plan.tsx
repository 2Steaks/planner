/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { hiphenToSlash } from '@project/services';
import {
  Button,
  ButtonVariant,
  Flex,
  FlexColumn,
  FlexAlignItems,
  FlexJustifyContent,
  Heading,
  HeadingSize,
  HeadingTag,
  LinkIcon,
  List,
  ListItem,
  MenuButton,
  Table,
  Wrapper,
  WrapperSpacing
} from '@project/components';
import { columnList, getPrettyDate, getSchedule } from './model';
import { Article } from './styles';

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
    <Article>
      <Wrapper spacing={WrapperSpacing.LARGE}>
        <Flex
          alignItems={FlexAlignItems.CENTER}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <FlexColumn>
            <Heading size={HeadingSize.H5} tag={HeadingTag.H3}>
              {getPrettyDate(week)}
            </Heading>
          </FlexColumn>
          <FlexColumn>
            <MenuButton>
              <List>
                <ListItem padding>
                  <Link href={`/plan/${hiphenToSlash(week)}`} passHref>
                    <Button variant={ButtonVariant.NONE}>
                      <List inline>
                        <ListItem>
                          <LinkIcon />
                        </ListItem>
                        <ListItem>View</ListItem>
                      </List>
                    </Button>
                  </Link>
                </ListItem>
                <ListItem padding>
                  <Button onClick={handleCopyWeek} variant={ButtonVariant.NONE}>
                    <List inline>
                      <ListItem>
                        <LinkIcon />
                      </ListItem>
                      <ListItem>Copy</ListItem>
                    </List>
                  </Button>
                </ListItem>
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
