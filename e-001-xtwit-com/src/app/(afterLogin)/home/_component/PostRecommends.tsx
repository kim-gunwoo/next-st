"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import styles from "@/app/(afterLogin)/home/home.module.css";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_components/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment } from "react";

export default function PostRecommends() {
  const { data } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
  });

  return data?.pages.map((page, i) => (
    <Fragment key={i}>
      {page.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </Fragment>
  ));
}
