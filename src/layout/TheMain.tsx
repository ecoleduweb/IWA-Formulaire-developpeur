import '#style/Form.scss';
import Developper from '#types/Developper';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const TheMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Developper>(
    // Si jamais tu veux faire du code beaucoup plus propre
    //   {
    //   defaultValues: async (): Promise<Developper> => {
    //     const res = await fetch('https://iwa-api-developper-3c80b3b34c5c.herokuapp.com/developper');
    //     const data = await res.json();
    //     return data;
    //   },
    // }
  );




  //1 . déclare ta fonction async qui va chercher les données
  const fetchData = async () => {
    try {
      const res = await fetch('https://iwa-api-developper-3c80b3b34c5c.herokuapp.com/developper');
      const data = await res.json();
      reset(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // 2. appelle ta fonction
    fetchData();
  }, []);


  // ici, bonne nouvelle, on peut mettre async à notre fonction onSubmit. Tu peux donc coder directement des await à l'intérieur.
  const onSubmit = async (data: Developper) => {
    await fetch('https://iwa-api-developper-3c80b3b34c5c.herokuapp.com/developper', {
      // transforme ton data JSON en string
      body: JSON.stringify(data),
      // utilise la méthode POST pour envoyer des données
      method: 'POST',
      // signale que le contenu est du JSON à l'API
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <main className="wrapper">
      <h1>Ton formulaire</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Le nom est requis' })}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Âge</label>
          <input
            id="age"
            {...register('age', {
              required: "L'âge est requise",
              valueAsNumber: true,
              min: { value: 18, message: 'Tu dois avoir 18 ans et plus' },
              validate: (value) => !isNaN(value) || "L'âge doit être un nombre",
            })}
          />
          {errors.age && <span className="error-message">{errors.age.message}</span>}
        </div>
        <div>
          <label htmlFor="isAProWithReact">Un pro avec react?</label>
          <input
            type="checkbox"
            id="isAProWithReact"
            {...register('isAProWithReact')}
          />
        </div>
        <div>
          <label htmlFor="salary">Ton futur salaire</label>
          <input
            type="number"
            id="salary"
            {...register('salary', {
              required: 'Le salaire est requis',
              min: { value: 0, message: 'Le salaire doit être positif' },
              max: { value: 1000000, message: 'Le salaire doit être inférieur à 1000000' },
            })}
          />
          {errors.salary && <span className="error-message">{errors.salary.message}</span>}
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

