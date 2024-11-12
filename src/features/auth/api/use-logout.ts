import { useRouter } from "next/navigation";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error("failed to logout " + error.message);
    },
  });

  return mutation;
};
