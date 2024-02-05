import { EmailForm } from '@/components/email-form/email-form';
import { EmailInput } from '__generated__/graphql';
import { useError } from 'utils/hooks';
import React, { ReactNode, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ModalContent } from '@/components/modal/content/content';
import Button from '@mui/material/Button/Button';
import { ModalTitle } from '@/components/modal/title/title';
import { Modal } from '@/components/modal/modal';
import {
  SEND_BUG_REPORT,
  SEND_COMMUNICATION,
} from 'graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import Divider from '@mui/material/Divider/Divider';
import { Row } from '../row/row';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  mutation: typeof SEND_BUG_REPORT | typeof SEND_COMMUNICATION;
  title: string;
  successComponent: ReactNode;
};

export function EmailModal({
  onClose,
  isOpen,
  mutation,
  title,
  successComponent,
}: Props) {
  const [send, { error }] = useMutation(mutation);
  const [isSent, setIsSent] = useState(false);

  const handleOnSubmit = async (data: EmailInput) => {
    await send({
      variables: {
        data,
      },
    });

    setIsSent(true);
  };

  useError([error?.message]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onTransitionEnd={() => {
        // That method resets sent state to false after modal is completely closed with all animations and transitions are finished
        if (!isOpen) {
          setIsSent(false);
        }
      }}
    >
      <ModalTitle>{title}</ModalTitle>

      <ModalContent
        sx={{
          minHeight: '300px',
          paddingBottom: 0,
        }}
      >
        {!isSent ? (
          <EmailForm
            onCancel={onClose}
            onSubmit={handleOnSubmit}
            inputNames={{
              subject: 'Title',
              text: 'Body',
            }}
          />
        ) : (
          <>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '4rem' }} />

            {successComponent}
          </>
        )}
      </ModalContent>

      {isSent ? (
        <>
          <Divider flexItem />

          <Row sx={{ padding: '1rem', justifyContent: 'center' }}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Row>
        </>
      ) : null}
    </Modal>
  );
}
