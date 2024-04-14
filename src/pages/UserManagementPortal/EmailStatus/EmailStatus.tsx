import {Table, Tag} from 'nhsuk-react-components';
import {emailNotificationApi} from '../../../store/email-notification.ts';

function EmailStatus() {
  const emails = emailNotificationApi(state => state.emails);

  return (
    <>
      <h1 data-test-id='main-heading'>Email Status</h1>
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
          {emails.map(email => (
            <Table.Row style={{margin: 50}} key={email.job_id}>
              <Table.Cell>{email.job_id}</Table.Cell>
              <Table.Cell>{email.subject}</Table.Cell>
              <Table.Cell>{email.to_address.join(', ')}</Table.Cell>
              <Table.Cell>{email.template}</Table.Cell>
              <Table.Cell>{email.creation_time}</Table.Cell>
              <Table.Cell>
                <Tag>{email.status}</Tag>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export {EmailStatus};
