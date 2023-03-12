import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export const ResultAntd = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Đã có Lỗi Xảy ra"
      extra={
        <Link to="/">
          <Button type="primary">Quay Lại</Button>
        </Link>
      }
    />
  );
};
