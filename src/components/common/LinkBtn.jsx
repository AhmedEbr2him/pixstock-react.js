import { Link } from 'react-router-dom';

const LinkBtn = ({ to, addClass, text }) => {
  return (
    <Link to={to} className={`btn ${addClass} ? ${addClass}:""`}>
      <span className='label-large text'>{text}</span>
      <div className='state-layer'></div>
    </Link>
  );
};
export default LinkBtn;
