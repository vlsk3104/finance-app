'use client';

import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

const DashboardPage = () => {
  const { onOpen } = useNewAccount();

  return <Button onClick={onOpen}>新しく支払方法を追加する</Button>;
};

export default DashboardPage;
