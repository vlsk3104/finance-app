import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import React from 'react';
import { useNewCategory } from '../hooks/use-new-category';
import AccountForm from './category-form';
import { insertCategorySchema } from '@/db/schema';
import { z } from 'zod';
import { useCreateCategory } from '../api/use-create-category';

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>新規でカテゴリー作成する</SheetTitle>
          <SheetDescription>
            家計簿作成するために新しいカテゴリーを作成します。
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

export default NewCategorySheet;
