import styled from "styled-components";
import { StarFilled } from "@ant-design/icons";
const Rating = styled.span`
  /* margin: 0 3px 0 0; */
`;
const Icon = styled(StarFilled)`
  /* font-size: 100%;
  position: relative;
  top: 1px;
  width: 2em;
  height: 2em; */
`;
export default ({className} : {className?:string}) => {
  return (
    <Rating className={className}>
      <Icon aria-hidden="true" />
      <Icon aria-hidden="true" />
      <Icon aria-hidden="true" />
      <Icon aria-hidden="true" />
      <Icon aria-hidden="true" />
    </Rating>
  );
};
