import ListItem, { ListItemProps } from '@mui/material/ListItem/ListItem';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { getSelectedStyles } from 'utils/utils';

type Props = {
  children: ReactNode;
  onClick: () => void;
  selected: boolean;
} & ListItemProps;

export function NavigationItem({
  children,
  onClick,
  selected,
  ...props
}: Props) {
  const theme = useTheme();
  const selectedStyles = selected ? getSelectedStyles(theme) : undefined;

  return (
    <ListItem
      {...props}
      onClick={onClick}
      sx={{
        minHeight: '24px',
        backgroundColor: 'primary.dark',
        width: '100%',
        borderRadius: '0.75rem',
        padding: 0,
        outlineColor: 'transparent',
        '&:hover': {
          ...getSelectedStyles(theme),
          transition: '.2s outline ease',
        },
        ...selectedStyles,
        ...props.sx,
      }}
    >
      {children}
    </ListItem>
  );
}
