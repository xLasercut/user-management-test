import {useNavigate, useLocation} from 'react-router-dom';

function useQueryParamHelper() {
  const {pathname, search} = useLocation();
  const navivage = useNavigate();
  const searchParams = new URLSearchParams(search);

  function getParameter(name: string): string {
    return (searchParams.get(name) ?? '').trim();
  }

  function setParameter(name: string, value: string) {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      searchParams.delete(name);
      return;
    }
    searchParams.set(name, trimmedValue);
  }

  function updateUrlParameter() {
    navivage({pathname, search: searchParams.toString()});
  }

  return {updateUrlParameter, getParameter, setParameter};
}

export {useQueryParamHelper};
