import NotFoundIcon from '../../assets/404.svg?react';

export const NotFound = () => {
  return (
    <div>
      <NotFoundIcon style={{ width: '100%' }}/>
      <h2>Извините, запрашиваемая страница не найдена</h2>
      <h4>Она была удалена либо еще находится в разработке</h4>
    </div>
  );
};
