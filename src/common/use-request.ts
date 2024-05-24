import { useEffect, useState } from "react";

export const useRequest = <ResponseBody>(
  request: Request,
): {
  data: ResponseBody | null;
  isError: boolean;
} => {
  const [isError, setIsError] = useState(false);

  const [responseData, setResponseData] = useState<ResponseBody | null>(null);

  useEffect(() => {
    setResponseData(null);
    setIsError(false);
    const c = new AbortController();
    fetch(request, { signal: c.signal })
      .then(async (res) => {
        setResponseData((await res.json()) as ResponseBody);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
    return () => {
      c.abort();
    };
  }, [request]);

  return { data: responseData, isError };
};
