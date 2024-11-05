import '#style/Form.scss';
import Developper from '#types/Developper';
import { useForm } from 'react-hook-form';

const TheMain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Developper>({
    defaultValues: async (): Promise<Developper> => {
      const res = await fetch('https://iwa-api-developper-3c80b3b34c5c.herokuapp.com/developper');
      const data = await res.json();
      return data;
    },
  });

  const onSubmit = async (data: Developper) => {
    await fetch('https://iwa-api-developper-3c80b3b34c5c.herokuapp.com/developper', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <main className="wrapper">
      <h1>Ton formulaire</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Le nom est requis' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', { required: true })}
          />
          {errors.age && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="isAProWithReact">Are you a pro with React?</label>
          <input
            type="checkbox"
            id="isAProWithReact"
          />
          {errors.isAProWithReact && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            {...register('salary', { required: true })}
          />
          {errors.salary && <span>This field is required</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default TheMain;
