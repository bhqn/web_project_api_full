import { useRef } from "react";
export default function NewCard({ onAddPlaceSubmit }) {
  const titleRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const image = imageRef.current.value;

    // Aqui você chamaria a função para adicionar o card
    onAddPlaceSubmit({ name: title, link: image });

    // Resetar o formulário
    titleRef.current.value = "";
    imageRef.current.value = "";
  };
  return (
    <form className="form" id="form__place" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <div className="form__group form__group-place">
          <input
            className="form__input form__input-place"
            name="place"
            type="text"
            placeholder="Título"
            minLength="2"
            maxLength="30"
            ref={titleRef}
            required
          />
          <small className="form__error"></small>
        </div>
        <div className="form__group">
          <input
            className="form__input form__input_src"
            name="image"
            type="url"
            placeholder="Url da Imagem"
            ref={imageRef}
            required
          />
          <small className="form__error"></small>
        </div>
      </fieldset>
      <button className="edit__button-save" id="save__place">
        Salvar
      </button>
    </form>
  );
}
