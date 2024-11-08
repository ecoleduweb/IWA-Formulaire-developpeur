import '#style/Form.scss';
import Developper from '#types/Developper';
import { useForm } from 'react-hook-form';

const TheMain = () => {
  // Complète la logique de validation du formulaire avec react use form.
  // Les messages d'erreurs sont dans le test playwright

  return (
    <main className="wrapper">
      <h1>Ton formulaire</h1>
      <form>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
          />
          <span className="error-message">Le nom est requis</span>
        </div>
        <div>
          <label htmlFor="age">Âge</label>
          <input
            id="age"
            name="age"
          />
          <span className="error-message">L'âge est requise</span>
        </div>
        <div>
          <label htmlFor="isAProWithReact">Un pro avec react?</label>
          <input
            type="checkbox"
            id="isAProWithReact"
          />
        </div>
        <div>
          <label htmlFor="salary">Ton futur salaire</label>
          <input
            type="number"
            id="salary"
            name="salary"
          />
          <span className="error-message">Le salaire est requis</span>
        </div>
        <button
          id="submit"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default TheMain;

