import styled from "styled-components";
import { accent, offWhite } from "../../rootStyledComponents";

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${accent};
  background-color: white;
  color: ${accent};
  &.selected {
    color:  ${offWhite};
    background-color: ${accent};
    transition: all 0.2s ease-in-out;
  }
`;

export default ({
  value,
  className,
  onClick,
}: {
  value: number;
  className?: string;
  onClick?: any,
}) => {
  return <Button onClick={onClick} className={className}>{value}</Button>;
};
