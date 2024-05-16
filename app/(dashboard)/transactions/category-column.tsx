import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';
import React from 'react';

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center cursor-pointer hover:underline',
        !category && 'text-rose-500'
      )}
    >
      {!category && <TriangleAlert className="mr-1 size-4 shrink-0" />}
      {category || '未作成'}
    </div>
  );
};

export default CategoryColumn;
