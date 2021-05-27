import { useMediaQuery } from "react-responsive";

export const useMobile = () => useMediaQuery({ query: "(max-width: 653px)" }); // return true if right size

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1093 });
  return isDesktop ? children : null;
};
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 654, maxWidth: 1092 });
  return isTablet ? children : null;
};

// use this for mobile render
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 653 });
  return isMobile ? children : null;
};
export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 720 });
  return isNotMobile ? children : null;
};
