import style from "./chatRoom.module.css";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import BackButton from "@/app/(afterLogin)/_components/BackButton";
import cx from "classnames";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ko";
import MessageForm from "./_component/MessageForm";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { auth } from "@/auth";
import { getUserServer } from "../../[username]/_lib/getUserServer";
import { UserInfo } from "./_component/UserInfo";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default async function ChatRoom({
  params,
}: {
  params: { room: string };
}) {
  const session = await auth();
  const queryClient = new QueryClient();
  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }

  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  return (
    <main className={style.main}>
      <UserInfo id={ids[0]} />
      <div className={style.list}></div>
      <MessageForm />
    </main>
  );
}
