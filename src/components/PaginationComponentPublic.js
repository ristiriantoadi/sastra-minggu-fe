import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function PaginationComponentPublic({ totalPages }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          navigate(`?page=${number}`);
        }}
        key={number}
        active={number.toString() === (searchParams.get("page") || "1")}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination size="lg">{items}</Pagination>;
}

export default PaginationComponentPublic;
