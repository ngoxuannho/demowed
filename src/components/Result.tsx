import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export const ResultAntd = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/home">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};
