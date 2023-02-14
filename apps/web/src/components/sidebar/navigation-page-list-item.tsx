import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ListItem from '@mui/material/ListItem';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getColorForState, getSelectedStyles } from '../../../utils/utils';
import {
  FragmentType,
  useFragment,
} from '../../__generated__/fragment-masking';
import { PageFragmentFragmentDoc } from '../../__generated__/graphql';
import { StatusIndicator } from '../status-indicator/status-indicator';
import { ArrowIcon } from '../icons/arrow';
import { Row } from '../row/row';
import { useState } from 'react';

type Props = {
  pageFragment: FragmentType<typeof PageFragmentFragmentDoc>;
  selected: boolean;
  onClick: () => void;
  currentPageNumber: number;
};

export function NavigationPageListItem({
  pageFragment,
  selected,
  onClick,
  currentPageNumber,
}: Props) {
  const page = useFragment(PageFragmentFragmentDoc, pageFragment);
  const theme = useTheme();
  const selectedStyles = selected ? getSelectedStyles(theme) : undefined;
  const [expand, setExpand] = useState(false);

  return (
    <ListItem
      onClick={onClick}
      sx={{
        borderRadius: '0.75rem',
        padding: 0,
        outlineColor: 'transparent',
        '&:hover': {
          ...getSelectedStyles(theme),
          transition: '.2s outline ease',
        },
        ...selectedStyles,
      }}
    >
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
    </ListItem>
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
