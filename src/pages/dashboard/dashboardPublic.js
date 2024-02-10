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
  const [searchTitle, setSearchTitle] = useState();
  const [searchAuthor, setSearchAuthor] = useState();
  const [searchWorkType, setSearchWorkType] = useState();
  const [searchMedia, setSearchMedia] = useState();
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    let currentPage = searchParams.get("page") || 1;
    publicAxios
      .get(`/guest/work?page=${currentPage - 1}` + queryParams)
      .then((response) => {
        setWorks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(function (error) {});
  }, [searchParams, queryParams]);

  const buildQueryParams = () => {
    let params = "";
    if (searchTitle) {
      params += `&title=${searchTitle}`;
    }
    if (searchAuthor) {
      params += `&author=${searchAuthor}`;
    }
    if (searchWorkType) {
      params += `&workType=${searchWorkType}`;
    }
    if (searchMedia) {
      params += `&media=${searchMedia}`;
    }
    if (searchStartDate && searchEndDate) {
      params += `&startDate=${searchStartDate}&endDate=${searchEndDate}`;
    }
    setQueryParams(params);
  };

  return (
    <Container>
      <Row style={{ marginBottom: "10px" }}>
        <Card fluid>
          <Card.Body>
            <Card.Title>Pencarian</Card.Title>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                buildQueryParams();
              }}
            >
              <Row className="row">
                <Col md={6} style={{ marginBottom: "1px" }}>
                  <Form.Group>
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSearchTitle(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Pengarang</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSearchAuthor(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group style={{ marginBottom: "1px" }}>
                    <Form.Label>Jenis</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSearchWorkType(e.target.value);
                      }}
                    >
                      <option value="">Semua</option>
                      <option value="SHORT_STORY">Cerita Pendek</option>
                      <option value="POETRY">Puisi</option>
                      <option value="ESSAY">Esai</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Media</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setSearchMedia(e.target.value);
                      }}
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="row">
                <Form.Group>
                  <Form.Label>Tanggal Pemuatan</Form.Label>
                  <Row>
                    <Col md={6} style={{ marginBottom: "10px" }}>
                      <Form.Control
                        onChange={(e) => {
                          setSearchStartDate(e.target.value);
                        }}
                        type="date"
                      ></Form.Control>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        onChange={(e) => {
                          setSearchEndDate(e.target.value);
                        }}
                        type="date"
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Row>
                <Button type="submit" variant="success">
                  Cari
                </Button>
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
