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
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import PaginationComponent from "../../components/PaginationComponent";

function Dashboard() {
  const [showModalAddWork, setShowModalAddWork] = useState(false);
  const [proofPublication, setProofPublication] = useState("link");
  const [works, setWorks] = useState([]);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [workType, setWorkType] = useState("SHORT_STORY");
  const [media, setMedia] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [publicationProofLink, setPublicationProofLink] = useState();
  const [publicationProofFile, setPublicationProofFile] = useState();
  const [totalPages, setTotalPages] = useState();
  const [searchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState();
  const [searchAuthor, setSearchAuthor] = useState();
  const [searchWorkType, setSearchWorkType] = useState();
  const [searchMedia, setSearchMedia] = useState();
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [queryParams, setQueryParams] = useState("");
  const [members, setMembers] = useState([]);
  const [errorProofLinkInvalid, setErrorProofLinkInvalid] = useState(false);
  const [showModalEditWork, setShowModalEditWork] = useState(false);
  const [editProofPublication, setEditProofPublication] = useState("link");
  const [editPublicationProofLink, setEditPublicationProofLink] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editAuthor, setEditAuthor] = useState();
  const [editWorkType, setEditWorkType] = useState();
  const [editMedia, setEditMedia] = useState();
  const [editPublicationDate, setEditPublicationDate] = useState();
  const [editPublicationProofFile, setEditPublicationProofFile] = useState();
  const [editWorkId, setEditWorkId] = useState();

  const closeModalAddWork = () => {
    setShowModalAddWork(false);
  };

  const openModalAddWork = () => {
    setShowModalAddWork(true);
  };

  const closeModalEditWork = () => {
    setShowModalEditWork(false);
  };

  const openModalEditWork = (work) => {
    setShowModalEditWork(true);
    setEditPublicationProofLink(work.publicationProof);
    setEditTitle(work.title);
    setEditAuthor(work.author);
    setEditMedia(work.media);
    setEditWorkType(work.workType);
    setEditPublicationDate(work.publicationDate);
    setEditWorkId(work._id);
  };

  const fetchWork = () => {
    let currentPage = searchParams.get("page") || 1;
    privateAxios
      .get("/member/work?page=" + (currentPage - 1) + queryParams)
      .then((response) => {
        setWorks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(function (error) {
        // handle error
      });
  };

  useEffect(() => {
    let currentPage = searchParams.get("page") || 1;
    privateAxios
      .get("/member/work?page=" + (currentPage - 1) + queryParams)
      .then((response) => {
        setWorks(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(function (error) {
        // handle error
      });
  }, [searchParams, queryParams]);

  const getAuthorId = (author) => {
    const regex = /\(@([^)]+)\)/;
    const match = author.match(regex);
    const username = match && match[1];
    if (username === null) {
      return;
    }
    console.log("username", username);
    console.log("members", members);
    const member = members.filter((member) => {
      return member.username === username;
    });
    return member[0]["_id"];
  };

  const getAuthorName = (author) => {
    const startIndex = author.indexOf("(");
    const name = author.substring(0, startIndex).trim();
    if (name === "") {
      return author;
    }
    return name;
  };

  const addWork = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("workType", workType);
    data.append("media", media);
    data.append("publicationDate", publicationDate);
    if (proofPublication === "image") {
      data.append("publicationProofFile", publicationProofFile);
    } else {
      data.append("publicationProofLink", publicationProofLink);
    }
    const authorId = getAuthorId(author);
    if (authorId) {
      data.append("authorId", authorId);
    }
    data.append("author", getAuthorName(author));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await privateAxios.post("/member/work", data, config);
    } catch (error) {}
    closeModalAddWork();
    fetchWork();
  };

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

  useEffect(() => {
    if (author === undefined) {
      return;
    }
    if (author.length >= 3) {
      privateAxios
        .get("/member/combo?name=" + getAuthorName(author))
        .then((response) => {
          console.log("list members", response.data);
          setMembers(response.data);
        })
        .catch();
    }
  }, [author]);

  useEffect(() => {
    if (editAuthor === undefined) {
      return;
    }
    if (editAuthor.length >= 3) {
      privateAxios
        .get("/member/combo?name=" + getAuthorName(editAuthor))
        .then((response) => {
          setMembers(response.data);
        })
        .catch();
    }
  }, [editAuthor]);

  useEffect(() => {
    if (
      publicationProofLink === undefined ||
      publicationProofLink === "" ||
      publicationProofLink == null
    ) {
      return;
    }
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(publicationProofLink) === false) {
      setErrorProofLinkInvalid(true);
    } else {
      setErrorProofLinkInvalid(false);
    }
  }, [publicationProofLink]);

  const deleteWork = (workId) => {
    Swal.fire({
      title: "Anda yakin ingin menghapus data?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      confirmButtonColor: "#f44336",
      denyButtonText: `Tidak`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        privateAxios
          .delete(`/member/work/${workId}`)
          .then((response) => {
            fetchWork();
          })
          .catch();
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const editWork = async (workId) => {
    const data = new FormData();
    data.append("title", editTitle);
    data.append("workType", editWorkType);
    data.append("media", editMedia);
    data.append("publicationDate", editPublicationDate);
    if (proofPublication === "image") {
      data.append("publicationProofFile", editPublicationProofFile);
    } else {
      data.append("publicationProofLink", editPublicationProofLink);
    }
    const authorId = getAuthorId(editAuthor);
    if (authorId) {
      data.append("authorId", authorId);
    }
    data.append("author", getAuthorName(editAuthor));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await privateAxios.put(`/member/work/${editWorkId}`, data, config);
    } catch (error) {}
    closeModalEditWork();
    fetchWork();
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
                <Col md={6} style={{ marginBottom: "10px" }}>
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
                      onChange={(e) => {
                        setSearchAuthor(e.target.value);
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
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSearchWorkType(e.target.value);
                      }}
                    >
                      <option value={""}>Semua</option>
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
                      type="text"
                      onChange={(e) => {
                        setSearchMedia(e.target.value);
                      }}
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
                        type="date"
                        onChange={(e) => {
                          setSearchStartDate(e.target.value);
                        }}
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
        <Col>
          <Button onClick={openModalAddWork} variant="primary">
            Tambah
          </Button>
          <Modal size="xl" show={showModalAddWork} onHide={closeModalAddWork}>
            <Modal.Header closeButton>
              <Modal.Title>Tambah Karya</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addWork();
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
                        list="members"
                        required
                        onChange={(e) => {
                          setAuthor(e.target.value);
                        }}
                        type="text"
                      ></Form.Control>
                      <datalist id="members">
                        {members.map((member) => {
                          return (
                            <option
                              key={member.id}
                              value={`${member.name} (@${member.username}) `}
                            />
                          );
                        })}
                      </datalist>
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
                            setPublicationProofFile(e.target.files[0]);
                          }}
                          type="file"
                        ></Form.Control>
                      ) : (
                        <div>
                          <Form.Control
                            required
                            onChange={(e) => {
                              setPublicationProofLink(e.target.value);
                            }}
                            type="text"
                          ></Form.Control>
                          {errorProofLinkInvalid && (
                            <span style={{ color: "red", fontSize: "14px" }}>
                              Link URL tidak valid
                            </span>
                          )}
                        </div>
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
          <Modal size="xl" show={showModalEditWork} onHide={closeModalEditWork}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Karya</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  editWork();
                }}
              >
                <Row className="row">
                  <Col md={6} style={{ marginBottom: "10px" }}>
                    <Form.Group>
                      <Form.Label>Judul</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={editTitle}
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pengarang</Form.Label>
                      <Form.Control
                        list="members"
                        required
                        value={editAuthor}
                        type="text"
                        onChange={(e) => {
                          setEditAuthor(e.target.value);
                        }}
                      ></Form.Control>
                      <datalist id="members">
                        {members.map((member) => {
                          return (
                            <option
                              key={member.id}
                              value={`${member.name} (@${member.username}) `}
                            />
                          );
                        })}
                      </datalist>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group style={{ marginBottom: "10px" }}>
                      <Form.Label>Jenis</Form.Label>
                      <Form.Select
                        value={editWorkType}
                        onChange={(e) => {
                          setEditWorkType(e.target.value);
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
                        value={editMedia}
                        onChange={(e) => {
                          setEditMedia(e.target.value);
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
                        value={editPublicationDate}
                        onChange={(e) => {
                          setEditPublicationDate(e.target.value);
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
                          onClick={() => {
                            setEditProofPublication("image");
                          }}
                          checked={editProofPublication === "image"}
                        />
                        <Form.Check
                          type="radio"
                          label="Link"
                          checked={editProofPublication === "link"}
                          onClick={() => {
                            setEditProofPublication("link");
                          }}
                        />
                      </div>
                      {editProofPublication === "image" ? (
                        <Form.Control
                          required
                          onChange={(e) => {
                            setEditPublicationProofFile(e.target.files[0]);
                          }}
                          type="file"
                        ></Form.Control>
                      ) : (
                        <div>
                          <Form.Control
                            required
                            value={editPublicationProofLink}
                            onChange={(e) => {
                              setEditPublicationProofLink(e.target.value);
                            }}
                            type="text"
                          ></Form.Control>
                          {errorProofLinkInvalid && (
                            <span style={{ color: "red", fontSize: "14px" }}>
                              Link URL tidak valid
                            </span>
                          )}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit">Edit</Button>
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
                  <Button
                    disabled={!work.isEditable}
                    variant="warning"
                    style={{ marginRight: "5px" }}
                    onClick={() => openModalEditWork(work)}
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faEdit}
                    ></FontAwesomeIcon>
                    <span>Edit</span>
                  </Button>
                  <Button
                    onClick={() => deleteWork(work._id)}
                    disabled={!work.isEditable}
                    variant="danger"
                  >
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faTrash}
                    ></FontAwesomeIcon>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <PaginationComponent totalPages={totalPages} />
      </Row>
    </Container>
  );
}

export default Dashboard;
