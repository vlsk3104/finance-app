import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertCategorySchema } from '@/db/schema';
import { z } from 'zod';
import { useOpenCategory } from '../hooks/use-open-category';
import { useGetCategory } from '../api/use-get-category';
import { Loader2 } from 'lucide-react';
import { useEditCategory } from '../api/use-edit-category';
import { useDeleteCategory } from '../api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';
import CategoryForm from './category-form';

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmationDialog, confirm] = useConfirm(
    '本当に削除してよろしいですか？',
    '削除されたデータを元に戻せません。'
  );

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>カテゴリーを編集する</SheetTitle>
            <SheetDescription>既存のカテゴリーを編集します。</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
