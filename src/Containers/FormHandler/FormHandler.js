import React, { useState, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { FormContext } from "../../Context/form";

const FormHandler = ({
  onSuccess,
  loadingUrl,
  fetchingUrl,
  method,
  children
}) => {
  const [errorText, setErrorText] = useState("");
  const [fields, setFields] = useState([]);

  const {
    setUrl: setFetchingUrl,
    setData,
    isFetching,
    setIsFetching
  } = useAxios({
    url: fetchingUrl,
    method,
    onSuccess,
    onFailure: setErrorText
  });

  const {
    setUrl: setLoadingUrl,
    isFetching: isLoading,
    setIsFetching: setIsLoading
  } = useAxios({
    isFetching: true,
    url: loadingUrl,
    onSuccess: ({ data }) => {
      setFields(data);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      setLoadingUrl(loadingUrl);
      setFetchingUrl(fetchingUrl);
      setIsLoading(true);
      setIsFetching(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingUrl, fetchingUrl, method]
  );

  const onSubmit = values => {
    setData(values);
    setIsFetching(true);
  };

  const value = useMemo(
    () => ({ fields, onSubmit }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  return (
    <div className="modal">
      {isLoading ? <p>Загрузка формы...</p> : null}
      {fields.length ? (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
      ) : (
        <p>Форма пуста</p>
      )}
      {isFetching ? <p>Отправка данных...</p> : null}
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};

export default FormHandler;
