import "./floatingLabel.css";
import { ReactChild, useState } from "react";

interface iFloatingLabelProps {
children: ReactChild;
label: string,
value: string | undefined
}

export default (props: iFloatingLabelProps) => {
  
    const [focus, setFocus] = useState(false);
    const { children, label, value } = props;

    const labelClass = focus || value ? "label label-float" : "label";

    return (
      <div
        className="float-label"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        {children}
        <label className={labelClass}>{label}</label>
      </div>
    );
};
