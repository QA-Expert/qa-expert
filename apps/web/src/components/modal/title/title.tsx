import DialogTitle, {
  DialogTitleProps,
} from '@mui/material/DialogTitle/DialogTitle';

export function ModalTitle(props: DialogTitleProps) {
  return (
    <DialogTitle
      {...props}
      sx={{
        textAlign: 'center',
        color: 'warning.main',
        textTransform: 'uppercase',
        fontSize: '2rem',
        ...props.sx,
      }}
    >
      {props.children}
    </DialogTitle>
  );
}
