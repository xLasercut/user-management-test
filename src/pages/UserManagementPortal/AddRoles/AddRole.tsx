import {Button, Checkboxes, Fieldset} from 'nhsuk-react-components';
import {useLocation, useNavigate} from 'react-router-dom';
import {BackLink} from '../../../components/BackLink.tsx';
import {FormInput} from '../../../components/form/FormInput.tsx';
import {z, ZodRawShape} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormRoleSelectItem} from '../../../components/form/FormRoleSelectItem.tsx';
import {COLLECTIONS, ROLES} from '../../../common/constants.ts';
import {formErrorMessage} from '../../../components/form/helpers.ts';
import {editUserStore} from '../../../store/edit-user.ts';

function isNoRoleSelected(data: {[p: string]: any}): boolean {
  for (const collection of Object.values(COLLECTIONS)) {
    if (data[collection]) {
      return false;
    }
  }
  return true;
}

function AddRole() {
  const location = useLocation();
  const navigate = useNavigate();
  const addRoleToAdd = editUserStore(state => state.addRoleToAdd);

  const formSchemaRaw: ZodRawShape = {
    odsCode: z.string().trim().min(1),
  };

  for (const collection of Object.values(COLLECTIONS)) {
    formSchemaRaw[collection] = z.string().trim().nullish();
  }

  const formSchema = z.object(formSchemaRaw);
  type TFormSchema = z.infer<typeof formSchema>

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      odsCode: '',
    },
  });

  const onSubmitForm = handleSubmit(data => {
    if (isNoRoleSelected(data)) {
      setError('roles', {message: 'You must select at least one role'});
      return;
    }

    for (const collection of Object.values(COLLECTIONS)) {
      if (!data[collection]) {
        continue;
      }

      addRoleToAdd({
        role: data[collection],
        collection: collection,
        organisation_code: data.odsCode,
      });
    }

    navigate(location.state.from);
  });

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <BackLink to={location.state.from}>Cancel</BackLink>
        <form onSubmit={onSubmitForm}>
          <FormInput<TFormSchema>
            control={control}
            formField={'odsCode'}
            errors={errors}
            label={'ODS Code'}
          ></FormInput>
          <Fieldset>
            <Fieldset.Legend>
              <b>Select collection and role</b>
            </Fieldset.Legend>
            <Checkboxes error={formErrorMessage<TFormSchema>('roles', errors)}>
              {Object.values(COLLECTIONS).map(collection => (
                <FormRoleSelectItem<TFormSchema>
                  control={control}
                  formField={collection}
                  label={collection}
                  items={[
                    {text: ROLES.SUBMITTER, value: ROLES.SUBMITTER},
                    {
                      text: ROLES.ANALYST,
                      value: ROLES.ANALYST,
                    },
                  ]}
                ></FormRoleSelectItem>
              ))}
            </Checkboxes>
          </Fieldset>
          <Button type={'submit'}>Confirm</Button>
        </form>
      </div>
    </>
  );
}

export default AddRole;
