import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error("failed to login " + error.message);
    },
  });

  return mutation;
};
