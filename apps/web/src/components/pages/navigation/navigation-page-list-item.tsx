import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getColorForState } from 'utils/utils';
import { StatusIndicator } from '@/components/status-indicator/status-indicator';
import { ArrowIcon } from '@/components/icons/arrow';
import { Row } from '@/components/row/row';
import { useState } from 'react';
import { GetCourseQuery } from '__generated__/graphql';
import { NavigationItem } from '@/components/sidebar/navigation-item/navigation-item';

type Props = {
  page: GetCourseQuery['course']['pages'][number];
  selected: boolean;
  onClick: () => void;
  currentPageNumber: number;
};

export function NavigationPageListItem({
  page,
  selected,
  onClick,
  currentPageNumber,
}: Props) {
  const theme = useTheme();
  const [expand, setExpand] = useState(false);

  return (
    <NavigationItem selected={selected} onClick={onClick}>
      <Accordion expanded={expand}>
        <AccordionSummary
          expandIcon={
            <ArrowIcon
              width="24"
              height="24"
              color={theme.palette.secondary.main}
              onClick={(e) => {
                e.stopPropagation();
                setExpand((prev) => !prev);
              }}
            />
          }
          aria-controls="show-description-accordion"
          id="show-description-accordion"
        >
          <Row>
            <StatusIndicator state={page.progress?.state} />
            <Typography
              sx={{ color: getColorForState(page.progress?.state, theme) }}
            >
              {`${currentPageNumber}. ${page.title}`}
            </Typography>
          </Row>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="text.secondary">{page.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </NavigationItem>
  );
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  width: '100%',
  gap: 0,
  backgroundColor: theme.palette.background.toString(),
  padding: 0,
  '&:last-of-type': {
    borderRadius: '0.75rem',
  },
}));
