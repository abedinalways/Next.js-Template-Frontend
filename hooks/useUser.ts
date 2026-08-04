import { useEffect, useState } from "react";
import { UserService } from "../service/user/user.service";

interface UserData {
  [key: string]: unknown;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

export function useUser(context: unknown = null) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await UserService.getUserDetails(context);
      const apiRes = res.data as ApiResponse<UserData>;

      if (apiRes.status === "success") {
        setUser(apiRes.data ?? null);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, loading, error, refetch: getUser };
}

export async function getUser(context: unknown = null): Promise<UserData | null> {
  try {
    const res = await UserService.getUserDetails(context);
    const apiRes = res.data as ApiResponse<UserData>;

    if (apiRes.status === "success") {
      return apiRes.data ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
