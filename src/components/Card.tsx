import {Link, useNavigate} from 'react-router-dom';
import {Card as _Card} from 'nhsuk-react-components';

interface TProp {
  to: string;
  label: string;
  description: string;
}

function Card({to, label, description}: TProp) {
  const navigate = useNavigate();

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    navigate(to);
  }

  return <_Card clickable onClick={onClick}>
    <_Card.Content>
      <_Card.Heading>
        <Link to={to}>{label}</Link>
      </_Card.Heading>
      <_Card.Description>{description}</_Card.Description>
    </_Card.Content>
  </_Card>;
}

export {Card};