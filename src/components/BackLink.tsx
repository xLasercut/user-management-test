import {BackLink as _BackLink} from 'nhsuk-react-components';
import {Link} from 'react-router-dom';
import {PropsWithChildren} from 'react';

interface Prop extends PropsWithChildren {
  to: string;
}

function BackLink({to, children}: Prop) {
  return (
    <_BackLink to={to} asElement={prop => <Link {...prop} />}>
      {children}
    </_BackLink>
  );
}

export {BackLink};
