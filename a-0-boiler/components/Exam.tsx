import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ButtonExamEmotion from "./ButtonExamEmotion";

const Exam: React.FC = () => {
  const { isExample } = useSelector((state: RootState) => state.example);

  return (
    <div className="cnt">
      <div className="title">isExample redux Example Page</div>
      {isExample ? <div>true</div> : <div>false</div>}
      <ButtonExamEmotion css={buttonStyle} />
      <ButtonExamEmotion />
    </div>
  );
};

const buttonStyle = css`
  background: blue;
`;

export default Exam;
