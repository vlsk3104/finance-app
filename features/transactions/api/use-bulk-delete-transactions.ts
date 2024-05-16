import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>['json'];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-delete']['$post']({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('取引を削除しました');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('取引の削除に失敗しました');
    },
  });

  return mutation;
};
