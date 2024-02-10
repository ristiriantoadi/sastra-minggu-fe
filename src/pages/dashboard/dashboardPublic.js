import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import PaginationComponentPublic from "../../components/PaginationComponentPublic";
import { publicAxios } from "../../util/util-axios";
import { mapPublicationDate, mapWorkType } from "../../util/util-work";

function DashboardPublic() {
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let currentPage = searchParams.get("page") || 1;
    publicAxios
      .get(`/guest/work?page=${currentPage - 1}`)
      .then((response) => {
        // handle success
        setWorks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(function (error) {
        // handle error
      });
  }, [searchParams]);

  return (
    <Container>
      <Row style={{ marginBottom: "10px" }}>
        <Card fluid>
          <Card.Body>
            <Card.Title>Pencarian</Card.Title>
            <Form>
              <Row className="row">
                <Col md={6} style={{ marginBottom: "1px" }}>
                  <Form.Group>
                    <Form.Label>Judul</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Pengarang</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group style={{ marginBottom: "1px" }}>
                    <Form.Label>Jenis</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="1">Semua</option>
                      <option value="1">Cerita Pendek</option>
                      <option value="2">Puisi</option>
                      <option value="3">Esai</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Media</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="row">
                <Form.Group>
                  <Form.Label>Tanggal Pemuatan</Form.Label>
                  <Row>
                    <Col md={6} style={{ marginBottom: "10px" }}>
                      <Form.Control type="date"></Form.Control>
                    </Col>
                    <Col md={6}>
                      <Form.Control type="date"></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Row>
                <Button variant="success">Cari</Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Table bordered>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Pengarang</th>
              <th>Jenis</th>
              <th>Media</th>
              <th>Tanggal Terbit</th>
              <th>Bukti Pemuatan</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work) => (
              <tr key={work._id}>
                <td>{work.title}</td>
                <td>{work.author}</td>
                <td>{mapWorkType(work.workType)}</td>
                <td>{work.media}</td>
                <td>{mapPublicationDate(work.publicationDate)}</td>
                <td>
                  <Link target="_blank" to={work.publicationProof}>
                    Link
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <PaginationComponentPublic totalPages={totalPages} />
      </Row>
    </Container>
  );
}

export default DashboardPublic;
