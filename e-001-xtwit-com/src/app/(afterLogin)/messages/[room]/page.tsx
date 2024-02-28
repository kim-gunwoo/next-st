import style from "./chatRoom.module.css";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import BackButton from "@/app/(afterLogin)/_components/BackButton";
import cx from "classnames";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function ChatRoom() {
  const user = {
    id: "test",
    nickname: "test nick name",
    image: faker.image.avatar(),
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "test",
      content: "hello~~~",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "test2",
      content: "good bye~~~",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === user.id) {
            // 내 메시지면
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
