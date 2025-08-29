import PropTypes from 'prop-types';

const Button = ({ label, handleSubmit, btnClass }) => {
  return (
    <div className='mt-5'>
      <button type="submit" className={`bg-violet-600 px-5 py-2 rounded-md text-white text-sm ${btnClass}`} onClick={handleSubmit}>{label}</button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  btnClass: PropTypes.string.isRequired
};

export default Button;
