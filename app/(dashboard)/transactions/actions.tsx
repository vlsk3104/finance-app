'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

type Props = {
  id: string;
};

const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenTransaction();

  const [ConfirmationDialog, confirm] = useConfirm(
    '本当に削除してよろしいですか？',
    '削除されたデータを元に戻せません。'
  );

  const deleteMutation = useDeleteTransaction(id);

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
