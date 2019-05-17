import { useState } from "react";

const useForm = ({
  initialValue = {},
  submit = () => {},
  onChange = () => {}
} = {}) => {
  const [values, setValues] = useState(initialValue);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    submit({ ...values });
  };

  const handleChange = event => {
    event.persist();
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };

    setValues(newValues);
    onChange({ changedField: name, values: newValues });
  };

  const handleReset = () => {
    setValues(initialValue);
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    handleReset
  };
};

export default useForm;
