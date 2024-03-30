"use client";

import style from "../message.module.css";
import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Room } from "@/model/Room";
import { useSession } from "next-auth/react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Room({ room }: { room: Room }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user =
    room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

  const onClick = () => {
    router.push(`/messages/${room.room}`);
  };

  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>{room.content}</div>
      </div>
    </div>
  );
}
