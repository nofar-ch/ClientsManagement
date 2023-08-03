import { InputText } from 'primereact/inputtext';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ClientFormView } from '../../Model/Client/ClientFormView.model';
import { FooterContent } from '../Common/Form/FooterContent';
import { useEffect } from 'react';

export const ClientForm = ({
  onSubmitFun,
  hideDialog,
}: {
  onSubmitFun: SubmitHandler<ClientDto>;
  hideDialog: () => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: new ClientFormView(),
  });

  console.log(getValues());

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const getErrorMessage = (fieldName: string) => {
    console.log(errors);
    return (
      fieldName && (
        <small className='p-error'>{errors[fieldName]?.message}</small>
      )
    );
  };
  return (
    <form
      className='flex flex-column justify-content-start align-items-start'
      onSubmit={handleSubmit(onSubmitFun)}
    >
      <label htmlFor='id' className='mb-1'>
        Id
      </label>
      <Controller
        name='id'
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => <InputText {...field} className='w-7 h-2rem' />}
      />
      {errors.id && getErrorMessage('id')}

      <label htmlFor='id' className='mb-1 mt-2'>
        Full Name
      </label>
      <Controller
        name='fullName'
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => <InputText {...field} className='w-7 h-2rem' />}
      />
      {errors.fullName && getErrorMessage('fullName')}

      <label htmlFor='phoneNumber' className='mb-1 mt-2'>
        Phone Number
      </label>
      <Controller
        name='phoneNumber'
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => <InputText {...field} className='w-7 h-2rem' />}
      />
      {errors.phoneNumber && getErrorMessage('phoneNumber')}

      <label htmlFor='ipAddress' className='mb-1 mt-2'>
        Ip Address
      </label>
      <Controller
        name='ipAddress'
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field }) => <InputText {...field} className='w-7 h-2rem' />}
      />
      {errors.ipAddress && getErrorMessage('ipAddress')}
      <div className='my-4'>
        <FooterContent cancelFun={hideDialog} />
      </div>
    </form>
  );
};
