import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';

export const FooterContent = ({
  cancelFun,
}: {
  cancelFun: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className='card flex flex-wrap gap-2 justify-content-center justify-content-around w-full'>
      <Button type='submit' icon='pi pi-check' label='Save' />
      <Button
        type='button'
        onClick={cancelFun}
        icon='pi pi-times'
        label='Cancel'
        className='p-button-danger p-button-outlined'
      />
    </div>
  );
};
