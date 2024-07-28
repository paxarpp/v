import { useRouteError } from "react-router-dom";

interface IError { status: number; statusText?: string; message: string }

export const ErrorPage = () => {
  const error = useRouteError() as IError;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
