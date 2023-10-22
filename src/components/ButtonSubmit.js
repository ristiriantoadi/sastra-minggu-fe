import { Button } from "react-bootstrap";

function ButtonSubmit({ loading, children }) {
  return (
    <div>
      <Button type="submit">
        {loading === false ? children : <div className="loader"></div>}
      </Button>
    </div>
  );
}

export default ButtonSubmit;
