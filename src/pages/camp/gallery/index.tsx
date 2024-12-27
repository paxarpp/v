import { useLoaderData } from 'react-router';
import { Route } from '../+types';

export const Gallery = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  return (
    <div>
      <h2>Фотогалерея</h2>
      <div>
        {camp?.gallery?.map((item, index) => (
          <div key={index}>
            <img src={item.url} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
