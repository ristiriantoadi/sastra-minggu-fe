import { Button } from "react-bootstrap";

function ButtonSubmit({ loading, children, disabled }) {
  return (
    <div>
      <Button disabled={disabled} type="submit">
        {loading === false ? children : <div className="loader"></div>}
      </Button>
    </div>
  );
}

export default ButtonSubmit;
