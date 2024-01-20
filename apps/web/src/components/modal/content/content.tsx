import DialogContent, {
  DialogContentProps,
} from '@mui/material/DialogContent/DialogContent';

export function ModalContent(props: DialogContentProps) {
  return (
    <DialogContent
      {...props}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        ...props.sx,
      }}
    >
      {props.children}
    </DialogContent>
  );
}
