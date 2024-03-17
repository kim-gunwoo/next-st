"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import styles from "@/app/(afterLogin)/home/home.module.css";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_components/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
