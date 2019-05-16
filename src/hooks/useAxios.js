import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = ({
  url: initialUrl,
  method = "get",
  data: initialData = {},
  isFetching: initialIsFetching = false,
  onSuccess = () => {},
  onFailure = () => {}
} = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(initialIsFetching);

  useEffect(
    () => {
      if (!isFetching) return;
      const signal = axios.CancelToken.source();

      const onFetch = async () => {
        try {
          const response = await axios({
            method,
            url,
            data,
            cancelToken: signal.token
          });
          setIsFetching(false);
          onSuccess(response);
        } catch (err) {
          if (axios.isCancel(err)) {
          } else {
            setIsFetching(false);
            onFailure(err.response.data.message);
          }
        }
      };

      onFetch();
      return () => {
        signal.cancel("Api is being canceled");
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFetching, url]
  );

  return { isFetching, setUrl, setData, setIsFetching };
};

export default useAxios;
