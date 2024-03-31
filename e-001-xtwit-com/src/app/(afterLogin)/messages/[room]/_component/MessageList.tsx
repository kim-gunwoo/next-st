"use client";

import style from "../chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Message } from "@/model/Message";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { getMessages } from "../_lib/getMessages";
import { useMessageStore } from "@/store/message";
import useSocket from "../_lib/useSocket";

export default function MessageList({ id }: { id: string }) {
  const { data: session } = useSession();
  const {
    data: messages,
    isFetching,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<
    Message[],
    DefaultError,
    InfiniteData<Message[]>,
    [
      string,
      {
        senderId: string;
        receiverId: string;
      },
      string
    ],
    number
  >({
    queryKey: [
      "rooms",
      { senderId: session?.user?.email!, receiverId: id },
      "messages",
    ],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
    getNextPageParam: (lastPage) =>
      lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId,
    enabled: !!(session?.user?.email && id),
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const [pageRendered, setPageRendered] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const shouldGoDown = useMessageStore().shouldGoDown;
  const setGoDown = useMessageStore().setGoDown;

  let hasMessages = !!messages;

  const [socket] = useSocket();
  const queryClient = useQueryClient();

  const [adjustingScroll, setAdjustingScroll] = useState(false);

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: [
        "rooms",
        { senderId: session?.user?.email!, receiverId: id },
        "messages",
      ],
    });
  }, [queryClient, session?.user?.email, id]);

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasPreviousPage && !adjustingScroll) {
        const prevHeight = listRef.current?.scrollHeight || 0;
        fetchPreviousPage().then(() => {
          setAdjustingScroll(true);
          setTimeout(() => {
            if (listRef.current) {
              listRef.current.scrollTop =
                listRef.current.scrollHeight - prevHeight;
            }
            setAdjustingScroll(false);
          }, 0);
        });
      }
    }
  }, [inView, isFetching, hasPreviousPage, fetchPreviousPage, adjustingScroll]);

  useEffect(() => {
    if (hasMessages) {
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current?.scrollHeight;
        }
      }, 100);
      setPageRendered(true);
    }
  }, [hasMessages]);

  useEffect(() => {
    if (shouldGoDown) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current?.scrollHeight;
        setGoDown(false);
      }
    }
  }, [shouldGoDown, setGoDown]);

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      const exMessages = queryClient.getQueryData([
        "rooms",
        {
          senderId: session?.user?.email,
          receiverId: id,
        },
        "messages",
      ]) as InfiniteData<Message[]>;
      if (exMessages && typeof exMessages === "object") {
        const newMessages = {
          ...exMessages,
          pages: [...exMessages.pages],
        };
        const lastPage = newMessages.pages.at(-1);
        const newLastPage = lastPage ? [...lastPage] : [];
        newLastPage.push(data);
        newMessages.pages[newMessages.pages.length - 1] = newLastPage;
        queryClient.setQueryData(
          [
            "rooms",
            { senderId: session?.user?.email, receiverId: id },
            "messages",
          ],
          newMessages
        );
        setGoDown(true);
      }
    });
    return () => {
      socket?.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className={style.list} ref={listRef}>
      {!adjustingScroll && pageRendered && (
        <div ref={ref} style={{ height: 1, background: "yellow" }} />
      )}
      {messages?.pages?.map((page) =>
        page.map((m) => {
          if (m.senderId === session?.user?.email) {
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
        })
      )}
    </div>
  );
}
