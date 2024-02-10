import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { privateAxios } from "../../util/util-axios";
import { mapPublicationDate, mapWorkType } from "../../util/util-work";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [proofPublication, setProofPublication] = useState("link");
  const [works, setWorks] = useState([]);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [workType, setWorkType] = useState("SHORT_STORY");
  const [media, setMedia] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [publicationProofLink, setPublicationProofLink] = useState();
  const [publicationProofFile, setPublicationProofFile] = useState();

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  useEffect(() => {
    privateAxios
      .get("/member/work")
      .then((response) => {
        // handle success
        setWorks(response.data.content);
      })
      .catch(function (error) {
        // handle error
        console.log("error in useeffect", error);
      });
  }, []);

  const renderActionButtons = () => {
    return (
      <div>
        <Button variant="warning" style={{ marginRight: "5px" }}>
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faEdit}
          ></FontAwesomeIcon>
          <span>Edit</span>
        </Button>
        <Button variant="danger">
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faTrash}
          ></FontAwesomeIcon>
          Delete
        </Button>
      </div>
    );
  };

  const sendNewWork = async () => {
    const data = new URLSearchParams();
    data.append("title", title);
    data.append("author", author);
    data.append("workType", workType);
    data.append("media", media);
    data.append("publicationDate", publicationDate);
    if (publicationProofLink) {
      data.append("publicationProofLink", publicationProofLink);
    }
    if (publicationProofFile) {
      data.append("publicationProofFile", publicationProofFile);
    }
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      await privateAxios.post("/member/work", data, config);
    } catch (error) {}
    handleClose();
  };

  return (
    <Container>
      <Row style={{ marginBottom: "10px" }}>
        <Card fluid>
          <Card.Body>
            <Card.Title>Pencarian</Card.Title>
            <Form>
              <Row className="row">
                <Col md={6} style={{ marginBottom: "10px" }}>
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
                  <Form.Group style={{ marginBottom: "10px" }}>
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
        <Col>
          <Button onClick={handleOpen} variant="primary">
            Tambah
          </Button>
          <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tambah Karya</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendNewWork();
                }}
              >
                <Row className="row">
                  <Col md={6} style={{ marginBottom: "10px" }}>
                    <Form.Group>
                      <Form.Label>Judul</Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pengarang</Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group style={{ marginBottom: "10px" }}>
                      <Form.Label>Jenis</Form.Label>
                      <Form.Select
                        value={workType}
                        onChange={(e) => {
                          setWorkType(e.target.value);
                        }}
                        aria-label="Default select example"
                      >
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
                          setMedia(e.target.value);
                        }}
                        required
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tanggal Pemuatan</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setPublicationDate(e.target.value);
                        }}
                        required
                        type="date"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Bukti Pemuatan</Form.Label>
                      <div style={{ display: "flex", marginBottom: "5px" }}>
                        <Form.Check
                          type="radio"
                          label="Gambar"
                          style={{ marginRight: "10px" }}
                          checked={proofPublication === "image"}
                          onClick={() => {
                            setProofPublication("image");
                          }}
                        />
                        <Form.Check
                          type="radio"
                          label="Link"
                          checked={proofPublication === "link"}
                          onClick={() => {
                            setProofPublication("link");
                          }}
                        />
                      </div>
                      {proofPublication === "image" ? (
                        <Form.Control
                          required
                          onChange={(e) => {
                            setPublicationProofFile(e.target.value);
                          }}
                          type="file"
                        ></Form.Control>
                      ) : (
                        <Form.Control
                          required
                          onChange={(e) => {
                            setPublicationProofLink(e.target.value);
                          }}
                          type="text"
                        ></Form.Control>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit">Tambah</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
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
              <th>Aksi</th>
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
                <td>
                  {/* <Button variant="warning" style={{ marginRight: "5px" }}>
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faEdit}
                    ></FontAwesomeIcon>
                    <span>Edit</span>
                  </Button>
                  <Button disabled={true} variant="danger">
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faTrash}
                    ></FontAwesomeIcon>
                    Delete
                  </Button> */}
                  {work.isEditable === true && renderActionButtons()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Dashboard;
