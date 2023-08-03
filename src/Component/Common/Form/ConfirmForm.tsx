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
      <span className='text-xl'>{`Id ${clientId} will delete`}</span>
      <span className='text-xl font-semibold'>Are you sure?</span>
      <div className='mt-4'>
        <FooterContent cancelFun={cancelFun} />
      </div>
    </form>
  );
};
