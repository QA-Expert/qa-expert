'use client';

import { useError } from 'utils/hooks';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ModalContent } from '@/components/modal/content/content';
import Button from '@mui/material/Button/Button';
import { ModalTitle } from '@/components/modal/title/title';
import { Modal } from '@/components/modal/modal';
import { SEND_COMMUNICATION } from 'graphql/mutations/mutations';
import { useMutation, useReactiveVar } from '@apollo/client';
import Divider from '@mui/material/Divider/Divider';
import { Row } from '../row/row';
import { FeedbackForm, Values as FormValues } from './form';
import { isAuthenticated } from 'apollo/store';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER } from 'graphql/queries/queries';
import Typography from '@mui/material/Typography/Typography';

type Props = {
  onClose: () => void;
  title?: string;
  isOpen: boolean;
  /**
   * @description represents what user is giving feedback upon
   * @example { name: 'course', id: '1' }
   * @example { name: 'QA Expert platform' }
   */
  objectInfo: {
    name: string;
    id?: string;
  };
};

export function FeedbackModal({
  onClose,
  isOpen,
  objectInfo,
  title = 'Your Feedback is very valuable',
}: Props) {
  const [send, { error }] = useMutation(SEND_COMMUNICATION);
  const [isSent, setIsSent] = useState(false);
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const user = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });

  const handleOnSubmit = async (values: FormValues) => {
    try {
      const subject = `[feedback] ${objectInfo.name}${
        objectInfo.id ? `:${objectInfo.id}` : ''
      }, rating:${values.rating}`;

      await send({
        variables: {
          data: {
            subject,
            from: user?.data?.user.email ?? '',
            text: values.text || 'no text feedback',
          },
        },
      });

      setIsSent(true);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  useError([error?.message]);

  return (
    <Modal key={Date.now()} open={isOpen} onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>

      <ModalContent
        sx={{
          minHeight: '300px',
          paddingBottom: 0,
        }}
      >
        {!isSent ? (
          <FeedbackForm onCancel={onClose} onSubmit={handleOnSubmit} />
        ) : (
          <>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '4rem' }} />

            <Typography variant="body1" textAlign="center">
              Thank you for submitting your feedback.
            </Typography>
            <Typography variant="body1" textAlign="center">
              That is huge help for improving quality of the platform.
            </Typography>
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
