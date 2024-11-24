import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path, options = {}) => {
    navigate(path, options);
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return { navigateTo };
};

export default useNavigation;