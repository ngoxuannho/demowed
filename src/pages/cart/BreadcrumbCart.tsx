import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { StyledBreadCrumb } from "../details/Product";

export default () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMap = [`Cart`];
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[index]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <StyledBreadCrumb>{breadcrumbItems}</StyledBreadCrumb>;
};
