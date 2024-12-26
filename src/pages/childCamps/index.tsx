import { pl } from '../../api/pageLoader';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getChildCamps();
  return { childCamps: result, error };
}

export default function childCamps() {
  return <div>childCamps</div>;
}
