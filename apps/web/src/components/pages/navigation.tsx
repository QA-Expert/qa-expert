import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState, MouseEvent as MouseEventReact } from 'react';
import { GetCourseQuery } from '../../__generated__/graphql';
import { Row } from '../row/row';
import { NavigationCard } from './navigation-card';
import { NavigationPagesList } from './navigation-pages-list';
import { Box } from '../box/box';

type Props = {
  description: string;
  courseInfo: GetCourseQuery['course'];
  onPageChange: (currentPageIndex: number) => void;
  currentPageIndex: number;
};

type ToggleValue = 'description' | 'navigation';

export function Navigation({
  description,
  courseInfo,
  currentPageIndex,
  onPageChange,
}: Props) {
  const [toggleValue, setToggleValue] = useState<ToggleValue>('navigation');

  const handleToggleChange = (
    _event: MouseEventReact<HTMLElement, MouseEvent>,
    toggleValue: ToggleValue,
  ) => {
    if (toggleValue !== null) {
      setToggleValue(toggleValue);
    }
  };

  return (
    <Box component="nav" sx={{ gap: '1rem' }}>
      <Row sx={{ justifyContent: 'center' }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          onChange={handleToggleChange}
          aria-label="Navigation or Description toggle"
          value={toggleValue}
        >
          <ToggleButton value="description">Description</ToggleButton>
          <ToggleButton value="navigation">Navigation</ToggleButton>
        </ToggleButtonGroup>
      </Row>

      {toggleValue === 'description' ? (
        <Row>{description}</Row>
      ) : (
        <>
          <NavigationCard {...courseInfo} />

          <NavigationPagesList
            pages={courseInfo.pages}
            onPageChange={onPageChange}
            currentPageIndex={currentPageIndex}
          />
        </>
      )}
    </Box>
  );
}
