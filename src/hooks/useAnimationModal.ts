import { useState } from "react";

const useAnimationModal = () => {
  const [animationClass, setAnimationClass] = useState("modal-enter");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setAnimationClass("modal-exit");
    setTimeout(() => setShow(false), 300);
  };
  return { animationClass, handleClose, show, setShow };
};
export default useAnimationModal;
