import { useState } from "react";

const useForm = ({ initialValue = {}, submit = () => {} } = {}) => {
  const [values, setValues] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
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
    isSubmitting,
    setIsSubmitting,
    handleReset
  };
};

export default useForm;
