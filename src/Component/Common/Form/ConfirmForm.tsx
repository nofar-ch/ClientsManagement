import { MouseEventHandler } from 'react';
import { FooterContent } from './FooterContent';

export const ConfirmForm = ({
  clientId,
  onSubmitFun,
  cancelFun,
}: {
  clientId: string;
  onSubmitFun: (clientId: string) => void;
  cancelFun: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <form
      className='flex flex-column justify-content-start align-items-start'
      onSubmit={() => onSubmitFun(clientId)}
    >
      <h1>{`${clientId} will delete, Are you sure?`}</h1>
      <FooterContent cancelFun={cancelFun} />
    </form>
  );
};
