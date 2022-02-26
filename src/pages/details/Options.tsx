import styled from "styled-components";
import { Radio, Space } from "antd";
import {accent} from "../../rootStyledComponents";

interface OptionsProps {
    colorSelected?: string,
    colorway: string[],
    handleChange:any,
    [key:string]:any
}
export default ({handleChange, colorSelected, colorway}:OptionsProps) => {
    return (
        <Options>
                  <div className="title">Options</div>
                  <StyledRadioGroup
                    onChange={(e) => handleChange(e.target.value)}
                    value={colorSelected}
                  >
                    <Space direction="vertical">
                      {colorway?.map((color: string, index: number) => (
                        <Radio key={index} value={color}>
                          {color}
                        </Radio>
                      ))}
                    </Space>
                  </StyledRadioGroup>
                </Options>
    )
}

 const StyledRadioGroup = styled(Radio.Group)`
  padding: 0 12px;
  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${accent};
  }
  .ant-radio-checked {
    ::after {
      border: 1px solid ${accent};
    }
  }
  .ant-radio-inner {
    border-color: ${accent};
    ::after {
      background-color: ${accent};
    }
  }
`;

 const Options = styled.div`
  .title {
    margin-bottom: 8px;
  }
`;