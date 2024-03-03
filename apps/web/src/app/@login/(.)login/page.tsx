'use client';

import { LoginForm } from '@/components/login-form/login-form';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '@/components/modal/title/title';
import { ModalContent } from '@/components/modal/content/content';
import { useReactiveVar } from '@apollo/client';
import { routePathObject } from 'apollo/store';
import { matchesPathname } from 'utils/url';

export default function LoginModal() {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(path === '/login');

  const routePathObj = useReactiveVar(routePathObject);
  const shouldPushToCoursesPage =
    !routePathObj.previous ||
    !routePathObj.current ||
    matchesPathname(routePathObj.previous, routePathObj.current);

  useEffect(() => {
    setOpen(path === '/login');
  }, [path]);

  const handleClick = useCallback(() => {
    setOpen(false);

    if (shouldPushToCoursesPage) {
      router.push('/courses');
    } else {
      router.back();
    }
  }, [router, shouldPushToCoursesPage]);

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
