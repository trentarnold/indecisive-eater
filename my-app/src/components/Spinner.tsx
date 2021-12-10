import { useState } from "react";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: maroon;
`;

function Spinner() {
let [color] = useState("white");
  return (
    <div className="sweet-loading">
      <RingLoader color={color} css = {override} size={200} />
    </div>
  );
}

export default Spinner