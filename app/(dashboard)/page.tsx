'use client';

import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

const DashboardPage = () => {
  const { onOpen } = useNewAccount();

  return <Button onClick={onOpen}>新しく決済手段・口座を追加する</Button>;
};

export default DashboardPage;
