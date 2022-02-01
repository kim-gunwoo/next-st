// '/tomato' 경로를 가지는 페이지
import { NextPage } from "next";
import Link from "next/link";

// export default function Tomato() {
const Tomato: NextPage = () => {
  return (
    <div>
      <h2>Link to main Page</h2>
      <Link href="/">Move to /</Link>
    </div>
  );
};

export default Tomato;
