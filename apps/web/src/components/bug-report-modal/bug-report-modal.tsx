import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EmailForm } from '@/components/email-form/email-form';
import { useMutation } from '@apollo/client';
import { SEND_BUG_REPORT } from 'graphql/mutations/mutations';
import { EmailInput } from '__generated__/graphql';
import { useError } from 'utils/hooks';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function BugReportModal({ onClose, isOpen }: Props) {
  const [sendBugReport, { error }] = useMutation(SEND_BUG_REPORT);

  const handleOnSubmit = async (data: EmailInput) => {
    await sendBugReport({
      variables: {
        data,
      },
    });
  };

  useError([error?.message]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <EmailForm
          onCancel={onClose}
          onSubmit={handleOnSubmit}
          inputNames={{
            subject: 'Title',
            text: 'Body',
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
