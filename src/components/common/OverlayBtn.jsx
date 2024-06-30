import LinkBtn from './LinkBtn';

const OverlayBtn = ({ to, addClass, text }) => {
  return (
    <div className='overlay-btn'>
      <LinkBtn to={to} addClass={'btn-primary'} text={text} />
    </div>
  );
};
export default OverlayBtn;
