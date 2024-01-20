import { SEND_COMMUNICATION } from 'graphql/mutations/mutations';
import { useMemo } from 'react';
import Typography from '@mui/material/Typography/Typography';
import { EmailModal } from '@/components/email-modal/email-modal';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function ContactUsModal({ onClose, isOpen }: Props) {
  const successComponent = useMemo(
    () => (
      <>
        <Typography variant="body1" textAlign="center">
          Thank you for submitting your message.
        </Typography>
        <Typography variant="body1" textAlign="center">
          We will follow up with you within next 24 hours via email.
        </Typography>
      </>
    ),
    [],
  );

  return (
    <EmailModal
      isOpen={isOpen}
      onClose={onClose}
      successComponent={successComponent}
      title="Contact Us"
      mutation={SEND_COMMUNICATION}
    />
  );
}
