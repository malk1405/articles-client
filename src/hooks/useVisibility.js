import { useState } from "react";

const useVisibilty = (initialVisibity = false) => {
  const [isVisible, setIsVisible] = useState(initialVisibity);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return { isVisible, show, hide, toggle };
};

export default useVisibilty;
