import {FormInput} from '../../components/form/FormInput.tsx';
import {Button, Table} from 'nhsuk-react-components';
import {ROUTES} from '../../router/Routes.tsx';

function EmailStatus() {
  return (
    <>
      <h1 data-test-id='main-heading'>Email Status</h1>
      {/*<div className='nhsuk-grid-row'>*/}
      {/*  <form onSubmit={onSubmit}>*/}
      {/*    <div className='nhsuk-grid-column-one-quarter'>*/}
      {/*      <FormInput<typeof filterSchema>*/}
      {/*        formField='email'*/}
      {/*        control={control}*/}
      {/*        errors={errors}*/}
      {/*        label='Email'*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <Button*/}
      {/*      type='submit'*/}
      {/*      className='nhsuk-u-margin-4 nhsuk-u-padding-2 nhsuk-u-padding-right-3 nhsuk-u-padding-left-3'*/}
      {/*    >*/}
      {/*      Apply*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</div>*/}
      <Table responsive>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Job Id</Table.Cell>
            <Table.Cell>Subject</Table.Cell>
            <Table.Cell>To Address</Table.Cell>
            <Table.Cell>Template</Table.Cell>
            <Table.Cell>Created On</Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {/*{users*/}
          {/*  .filter(user => !user.account_enabled)*/}
          {/*  .filter(user => {*/}
          {/*    if (!email) {*/}
          {/*      return true;*/}
          {/*    }*/}

          {/*    return user.email === email;*/}
          {/*  })*/}
          {/*  .map(user => (*/}
          {/*    <Table.Row key={user.email}>*/}
          {/*      <Table.Cell>*/}
          {/*        {user.first_name} {user.last_name}*/}
          {/*      </Table.Cell>*/}
          {/*      <Table.Cell>{user.email}</Table.Cell>*/}
          {/*      <Table.Cell>{user.account_disabled_time}</Table.Cell>*/}
          {/*      <Table.Cell>{user.last_login_time}</Table.Cell>*/}
          {/*      <Table.Cell>{user.creation_time}</Table.Cell>*/}
          {/*      <Table.Cell>*/}
          {/*        <a*/}
          {/*          href=''*/}
          {/*          onClick={e => {*/}
          {/*            e.preventDefault();*/}
          {/*            clear();*/}
          {/*            navigate(ROUTES.EDIT_USER(user.email));*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          Edit*/}
          {/*        </a>*/}
          {/*      </Table.Cell>*/}
          {/*    </Table.Row>*/}
          {/*  ))}*/}
        </Table.Body>
      </Table>
    </>
  );
}

export {EmailStatus};
