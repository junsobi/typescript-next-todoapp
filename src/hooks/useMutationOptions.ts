import { useQueryClient } from 'react-query';

export const useMutationOptions = (
  queryKey: string, // Query Key
  mutationFn: any, // Mutation Function
  mutationUpdateFn: any, // onMutate에서 쓰이는 업데이트 함수
  mutationRevertFn: any, // onError에서 쓰이는 복구 함수
) => {
  const queryClient = useQueryClient();

  return {
    mutationFn,
    onMutate: async (mutationData: any) => {
      await queryClient.cancelQueries(queryKey);

      const previousData = queryClient.getQueryData<any>(queryKey);

      if (previousData) {
        queryClient.setQueryData<any>(
          queryKey,
          mutationUpdateFn(previousData, mutationData),
        );
      }

      return { previousData };
    },
    onError: (err: any, mutationData: any, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData<any>(
          queryKey,
          mutationRevertFn(context.previousData, mutationData),
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  };
};
