import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-create']['$post']
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-create']['$post']
>['json'];

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-create']['$post']({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('取引を作成しました');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: () => {
      toast.error('取引の作成に失敗しました');
    },
  });

  return mutation;
};
