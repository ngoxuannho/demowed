import styled from "styled-components";
import Button from "./SizeBtn";
import { useState } from "react";

export default ({ sizeMap, onClick, selectedSize }: { sizeMap: number[]; onClick?: any, selectedSize:number }) => {
  

  return (
    <BtnHolder>
      {sizeMap.map((size: number, index:number) => (
        <Button
        key={index}
          className={selectedSize == size ? "selected" : ""}
          onClick={() => onClick(size)}
          value={size}
        />
      ))}
    </BtnHolder>
  );
};

const BtnHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
