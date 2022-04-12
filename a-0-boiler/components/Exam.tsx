import { useSelector } from "react-redux";
import { RootState } from "store";

const Exam: React.FC = () => {
  const { isExample } = useSelector((state: RootState) => state.example);

  return (
    <div className="cnt">
      <div className="title">isExample redux Example Page</div>
      {isExample ? <div>true</div> : <div>false</div>}
    </div>
  );
};

export default Exam;
