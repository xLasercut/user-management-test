import {useLocation, useNavigate} from 'react-router-dom';

function useQueryParamHelper() {
  const {pathname, search} = useLocation();
  const navigate = useNavigate();
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
    navigate({pathname: pathname, search: searchParams.toString()});
  }

  function setAndNavigateWithUrlParams(to: string) {
    navigate({pathname: to, search: searchParams.toString()}, {state: {from: `${pathname}?${searchParams.toString()}`}});
  }

  return {updateUrlParameter, getParameter, setParameter, setAndNavigateWithUrlParams};
}

export {useQueryParamHelper};
