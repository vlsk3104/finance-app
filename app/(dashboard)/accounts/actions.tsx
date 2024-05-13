'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

type Props = {
  id: string;
};

const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();

  const [ConfirmationDialog, confirm] = useConfirm(
    '本当に削除してよろしいですか？',
    '削除されたデータを元に戻せません。'
  );

  const deleteMutation = useDeleteAccount(id);

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
