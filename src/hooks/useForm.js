import { useState } from "react";

const useForm = ({ initialValue = {}, submit = () => {} } = {}) => {
  const [values, setValues] = useState(initialValue);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    submit();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleReset = () => {
    setValues(initialValue);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleReset
  };
};

export default useForm;
