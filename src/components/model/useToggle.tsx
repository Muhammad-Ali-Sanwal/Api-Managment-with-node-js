import { useCallback, useState } from "react";

export type UseToggleReturn = {
  isOpen: boolean;
  toggle: () => void;
  setToOpen: () => void;
  setToClose: () => void;
};

export const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);
  const setToOpen = useCallback(() => setIsOpen(true), []);
  const setToClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, setToOpen, setToClose };
};

export default useToggle;
