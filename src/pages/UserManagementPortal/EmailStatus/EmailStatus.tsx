import {Table} from 'nhsuk-react-components';

function EmailStatus() {
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
        <Table.Body></Table.Body>
      </Table>
    </>
  );
}

export {EmailStatus};
