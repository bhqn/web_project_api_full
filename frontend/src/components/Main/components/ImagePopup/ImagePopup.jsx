export default function ImagePopup(props) {
  const { card } = props;
  const { name, link } = card;

  return (
    <div className="modal__image-align">
      <img
        src={link}
        className="modal__image"
        alt={name}
      />
      <h1 className="modal__title">{name}</h1>
    </div>
  );
}
