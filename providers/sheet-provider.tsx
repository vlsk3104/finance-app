'use client';
import EditAccountSheet from '@/features/accounts/components/edit-account-sheet';
import NewAccountSheet from '@/features/accounts/components/new-account-sheet';
import { useMountedState } from '@/hooks/use-mounted-state';

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};

export default SheetProvider;
