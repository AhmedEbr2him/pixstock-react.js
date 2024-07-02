import { useThemeSwitch } from '../../hooks/useThemeSwitch';

const ThemeSwitch = () => {
  const { changeTheme } = useThemeSwitch();

  return (
    <button
      className='icon-btn theme-switch'
      aria-label='Theme switch'
      data-ripple
      onClick={() => changeTheme()}
    >
      <span className='material-symbols-outlined dark-icon' aria-hidden='true'>
        dark_mode
      </span>
      <span className='material-symbols-outlined light-icon' aria-hidden='true'>
        light_mode
      </span>
      <div className='state-layer'></div>
    </button>
  );
};
export default ThemeSwitch;
