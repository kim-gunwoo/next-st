"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import styles from "../home.module.css";
import Post from "../../_components/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";

export default function FollowingPosts() {
  // const { data, isPending } = useQuery<IPost[]>({
  //   queryKey: ["posts", "followings"],
  //   queryFn: getFollowingPosts,
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // });
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // if (isPending) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center" }}>
  //       <svg
  //         className={styles.loader}
  //         height="100%"
  //         viewBox="0 0 32 32"
  //         width={40}
  //       >
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
  //         ></circle>
  //         <circle
  //           cx="16"
  //           cy="16"
  //           fill="none"
  //           r="14"
  //           strokeWidth="4"
  //           style={{
  //             stroke: "rgb(29, 155, 240)",
  //             strokeDasharray: 80,
  //             strokeDashoffset: 60,
  //           }}
  //         ></circle>
  //       </svg>
  //     </div>
  //   );
  // }

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
