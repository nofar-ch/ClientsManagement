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
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitFun(clientId);
      }}
    >
      <span className='text-xl'>{`Id ${clientId} will delete`}</span>
      <span className='text-xl font-semibold mb-4'>Are you sure?</span>

      <FooterContent cancelFun={cancelFun} />
    </form>
  );
};
