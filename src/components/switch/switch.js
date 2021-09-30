import './switch.scss';
import cx from 'classnames';

const Switch = ({ rounded = false,data}) => {

  const sliderCX = cx('slider',{
    'rounded': rounded
  });
  return (
    <div>
        <h3>{data}</h3>
      <label className="switch">
        <input type="checkbox"/>
        <span className={sliderCX}/>
      </label>
    </div>
  );
};

export default Switch;