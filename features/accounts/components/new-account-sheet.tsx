import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import React from 'react';
import { useNewAccount } from '../hooks/use-new-account';
import AccountForm from './account-form';
import { insertAccountSchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateAccount } from '../api/use-create-account';
import { toast } from 'sonner';

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>新規で決済手段・口座作成する</SheetTitle>
          <SheetDescription>
            家計簿作成するために新しい決済手段・口座を作成します。
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
