import React, { useContext, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { FormContext } from "../../Context/form";

const Form = ({ children, ...props }) => {
  const { fields, onSubmit } = useContext(FormContext);
  const getValues = () => {
    const values = {};
    fields.forEach(({ name, value, type }) => {
      if (type === "date") {
        const d = new Date(value);
        const normalize = n => (n < 10 ? "0" + n : "" + n);
        values[name] = `${d.getFullYear()}-${normalize(
          d.getMonth() + 1
        )}-${normalize(d.getDate())}`;
      } else values[name] = value;
    });
    return values;
  };

  const { values, setValues, handleChange, handleSubmit } = useForm({
    submit: onSubmit
  });

  useEffect(
    () => {
      setValues(getValues(fields));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  return (
    <form {...props} onSubmit={handleSubmit}>
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
