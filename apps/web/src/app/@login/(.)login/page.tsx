'use client';

import { LoginForm } from '@/components/login-form/login-form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '@/components/modal/title/title';
import { ModalContent } from '@/components/modal/content/content';

export default function LoginModal() {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(path === '/login');

  useEffect(() => {
    setOpen(path === '/login');
  }, [path]);

  const handleClick = () => {
    setOpen(false);
    router.back();
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClick}>
      <ModalTitle variant="h1" sx={{ fontSize: '2rem' }}>
        Login
      </ModalTitle>
      <ModalContent>
        <LoginForm
          onSubmit={handleClick}
          onLinkClick={handleLinkClick}
          onCancel={handleClick}
        />
      </ModalContent>
    </Modal>
  );
}
