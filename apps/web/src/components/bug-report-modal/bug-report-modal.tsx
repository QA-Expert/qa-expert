import { SEND_BUG_REPORT } from 'graphql/mutations/mutations';
import Typography from '@mui/material/Typography/Typography';
import { EmailModal } from '@/components/email-modal/email-modal';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function BugReportModal({ onClose, isOpen }: Props) {
  return (
    <EmailModal
      isOpen={isOpen}
      onClose={onClose}
      successComponent={
        <>
          <Typography variant="body1" textAlign="center">
            Thank you for submitting Bug Report.
          </Typography>
          <Typography variant="body1" textAlign="center">
            That is huge help for improving quality of the platform.
          </Typography>
        </>
      }
      title="Bug Report"
      mutation={SEND_BUG_REPORT}
    />
  );
}
