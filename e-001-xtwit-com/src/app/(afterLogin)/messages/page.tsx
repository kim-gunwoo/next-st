import { Metadata } from "next";
import Room from "./_component/Room";
import style from "./message.module.css";

export const metadata: Metadata = {
  title: "쪽지 / meta",
  description: "쪽지를 보내보세요.",
};

export default function Page() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
