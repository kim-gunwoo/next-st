import { Metadata } from "next";
import Room from "./_component/Room";
import style from "./message.module.css";
import { auth } from "@/auth";
import { getRooms } from "./_lib/getRooms";

export const metadata: Metadata = {
  title: "쪽지 / meta",
  description: "쪽지를 보내보세요.",
};

export default async function Page() {
  const session = await auth();
  const rooms = session?.user?.email
    ? await getRooms(session?.user?.email)
    : [];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </main>
  );
}
