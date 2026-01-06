import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };


  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(name?.trim() && description?.trim()){
    handleUpdateUser({ name: name.trim(), about: description.trim() });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <div className="form__group-name">
          <input
            required
            className="form__input form__input_name"
            name="name"
            type="text"
            placeholder="Nome"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <small className="form__error"></small>
        </div>
        <div className="form__group-description">
          <input
            required
            className="form__input form__input_description"
            name="description"
            type="text"
            placeholder="Description"
            minLength="2"
            maxLength="40"
            value={description}
            onChange={handleDescriptionChange}
          />
          <small className="form__error"></small>
        </div>
      </fieldset>
      <button className="edit__button-save" type="submit">
        Salvar
      </button>
    </form>
  );
}
