import { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { privateAxios } from "../../util/util-axios";
import { mapPublicationDate, mapWorkType } from "../../util/util-work";

function MyWork() {
  const [searchParams] = useSearchParams();
  const [works, setWorks] = useState([]);

  useEffect(() => {
    let currentPage = searchParams.get("page") || 1;
    privateAxios
      .get("/member/work/my_work?page=" + (currentPage - 1))
      .then((response) => {
        setWorks(response.data.content);
        // setTotalPages(response.data.totalPages);
      })
      .catch(function (error) {
        // handle error
      });
  }, [searchParams]);

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
          <tbody>
            {works.map((work) => (
              <tr key={work._id}>
                <td>{work.title}</td>
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
    </Container>
  );
}
export default MyWork;
