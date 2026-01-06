import {useRef, useContext} from 'react'
import CurrentUserContext from '../../../../../../contexts/CurrentUserContext';

export default function EditAvatar() {
  
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef()

  function handleSubmit(e){
    e.preventDefault();

     if (avatarRef.current?.value?.trim()) {
    handleUpdateAvatar({avatar: avatarRef.current.value.trim()})}
  }

  return (
    <div className="form__group">
      <form className="form" id="avatarForm" onSubmit={handleSubmit}>
        <input
          ref={avatarRef}
          className="form__input form__input_src"
          name="avatar"
          type="url"
          placeholder="Url da Imagem"
          required
        />
        <small className="form__error"></small>
        <button className="avatar__button submit">Salvar</button>
      </form>
    </div>
  );
}
