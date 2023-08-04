import { InputText } from 'primereact/inputtext';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ClientFormView } from '../../Model/Client/ClientFormView.model';
import { FooterContent } from '../Common/Form/FooterContent';

export const ClientForm = ({
  onSubmitFun,
  hideDialog,
}: {
  onSubmitFun: SubmitHandler<ClientFormView>;
  hideDialog: () => void;
}) => {
  const formModel = new ClientFormView();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: new ClientFormView(formModel),
  });

  const getErrorMessage = (fieldName: keyof ClientFormView) => {
    console.log(errors);

    return (
      errors[fieldName] && (
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
        rules={{
          required: 'This field is required',
          minLength: { value: 10, message: 'Must contain 10 numbers' },
          maxLength: { value: 10, message: 'Must contain 10 numbers' },
          pattern: { value: /^[0-9]*$/, message: 'Must contain only numbers' },
        }}
        render={({ field }) => (
          <InputText {...field} className='w-full h-2rem' />
        )}
      />
      {getErrorMessage('id')}

      <label htmlFor='id' className='mb-1 mt-2'>
        Full Name
      </label>
      <Controller
        name='fullName'
        control={control}
        rules={{
          required: 'This field is required',
          validate: (value) => value?.includes(' ') || 'Must contain full name',
        }}
        render={({ field }) => (
          <InputText {...field} className='w-full h-2rem' />
        )}
      />
      {getErrorMessage('fullName')}

      <label htmlFor='phoneNumber' className='mb-1 mt-2'>
        Phone Number
      </label>
      <Controller
        name='phoneNumber'
        control={control}
        rules={{
          required: 'This field is required',
          minLength: { value: 9, message: 'Must contain minimum 9 numbers' },
          maxLength: { value: 10, message: 'Must contain maximum 10 numbers' },
          pattern: { value: /^[0-9]*$/, message: 'Must contain only numbers' },
        }}
        render={({ field }) => (
          <InputText {...field} className='w-full h-2rem' />
        )}
      />
      {getErrorMessage('phoneNumber')}

      <label htmlFor='ipAddress' className='mb-1 mt-2'>
        Ip Address
      </label>
      <Controller
        name='ipAddress'
        control={control}
        rules={{
          required: 'This field is required',
          pattern: {
            value:
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            message: 'Invalid address',
          },
        }}
        render={({ field }) => (
          <InputText {...field} className='w-full h-2rem mb-4' />
        )}
      />
      {getErrorMessage('ipAddress')}

      <FooterContent cancelFun={hideDialog} />
    </form>
  );
};
