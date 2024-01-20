import Dialog, { DialogProps } from '@mui/material/Dialog/Dialog';

export function Modal(props: DialogProps) {
  return (
    <Dialog
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        flexDirection: 'column',
        ...props.sx,
      }}
    >
      {props.children}
    </Dialog>
  );
}
