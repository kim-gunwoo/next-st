import style from "./chatRoom.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import MessageForm from "./_component/MessageForm";
import { QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import { getUserServer } from "../../[username]/_lib/getUserServer";
import { UserInfo } from "./_component/UserInfo";
import MessageList from "./_component/MessageList";

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
      {/* <WebSocketComponent /> */}
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  );
}
