import styled from "styled-components";
import { lightGrey } from "../../rootStyledComponents";

interface Props {
    colorway?: string[]
}
 
const ColorBtn = styled.button<{ color?: string }>`
width: 30px;
height: 30px;
border-radius: 50%;
background-color: ${({ color }) => color};
margin-right: 8px;
&.active {
  border: 4px solid ${lightGrey};
}
`;

export default ({colorway}:Props) => {
    
    return (
        <div className="options">
                  {colorway?.map((color: string, index: number) => {
                    if (color === "white")
                      return <ColorBtn className="active" color={color} />;
                    return <ColorBtn color={color} />;
                  })}
                </div>
    )
}