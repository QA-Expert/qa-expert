import Typography from '@mui/material/Typography/Typography';
import { ModalContent } from '@/components/modal/content/content';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '../modal/title/title';
import Divider from '@mui/material/Divider/Divider';
import { ReactNode } from 'react';
import { ModalActionButtons } from '../modal/action-buttons/action-buttons';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  content: string | ReactNode;
  open: boolean;
  buttonName?: string;
};

export function ConfirmationModal({
  onCancel,
  onConfirm,
  title,
  content,
  open,
  buttonName = 'Confirm',
}: Props) {
  return (
    <Modal open={open} onClose={onCancel}>
      <ModalTitle>{title}</ModalTitle>

      <ModalContent>
        {typeof content === 'string' ? (
          <Typography>{content}</Typography>
        ) : (
          content
        )}
      </ModalContent>

      <Divider flexItem />

      <ModalActionButtons
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmButtonName={buttonName}
      />
    </Modal>
  );
}
