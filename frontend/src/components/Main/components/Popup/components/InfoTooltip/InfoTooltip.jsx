import validicon from '/src/images/valid-icon.png';
import deniedicon from '/src/images/denied-icon.png';

export default function InfoToolTip({ isOpen, onClose, status, message }) {
  if (!isOpen) return null;

  const isSuccess = status === 'success';
  const icon = isSuccess ? validicon : deniedicon;

  return (
    <div className='infotooltip__modal'>
      <div>
        <button onClick={onClose} className='infotooltip__close' />
      <div className="infotooltip__container">
      <img className="infotooltip__image" src={icon} alt={status} />
      <p className='infotooltip__text'>{message}</p>
      
    </div>
    </div>
    </div>
  );
}
