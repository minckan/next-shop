import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USER_QUERY_KEY = "user";

export function useSignIn() {
  const queryClient = useQueryClient();
  const { isError, isLoading, mutateAsync } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      fetchJson("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
  );

  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutateAsync({ email, password });
        queryClient.setQueriesData(USER_QUERY_KEY, user);
        return true;
      } catch (error) {
        return false;
      }
    },
    signInError: isError,
    signInLoading: isLoading,
  };
}

export function useSignOut() {
  const queryClient = useQueryClient(); // update data in react query cache
  const { mutateAsync } = useMutation(() => fetchJson("/api/logout"));
  return {
    signOut: async () => {
      await mutateAsync();
      queryClient.setQueriesData(USER_QUERY_KEY, undefined);
    },
  };
}

export function useUser() {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (error) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity, // 언제 데이타가 메모리를 확보하기 위해 캐시에서 삭제될 것인가?
      staleTime: 30_000, // ms // 30초 동안 유효할 것이고 그후 만료될것이다.
    }
  );

  return query.data;
}
