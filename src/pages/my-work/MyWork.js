import { Container, Row, Table } from "react-bootstrap";

function MyWork() {
  return (
    <Container>
      <Row>
        <Table bordered>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Jenis</th>
              <th>Media</th>
              <th>Tanggal Terbit</th>
              <th>Bukti Pemuatan</th>
            </tr>
          </thead>
        </Table>
      </Row>
    </Container>
  );
}

export default MyWork;
