export default function Popup(props) {
  const { onClose, title, children, isImagePopup } = props;

  return (
    <div className="popup">
      <div
        className={
          isImagePopup ? "popup__content_content_image" : "popup__content"
        }
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
