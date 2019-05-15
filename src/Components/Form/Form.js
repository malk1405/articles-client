import React, { useContext } from "react";
import useForm from "../../hooks/useForm";
import { FormContext } from "../../Context/form";

const Form = ({ className, children }) => {
  const { fields, onSubmit } = useContext(FormContext);
  const getValues = () => {
    const values = {};
    fields.forEach(({ name, value }) => {
      values[name] = value;
    });
    return values;
  };

  const { values, handleChange, handleSubmit } = useForm({
    initialValue: getValues,
    submit: onSubmit
  });

  return (
    <form className={className} onSubmit={handleSubmit}>
      {fields.map(({ title, ...el }) => {
        return (
          <React.Fragment key={el.name}>
            <label htmlFor={el.name}>{title || el.name}</label>
            <input
              {...el}
              value={values[el.name] || ""}
              onChange={handleChange}
            />
          </React.Fragment>
        );
      })}

      {children}
    </form>
  );
};

export default Form;
