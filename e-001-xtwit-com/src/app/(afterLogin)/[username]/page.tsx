import style from "./profile.module.css";
import BackButton from "../_components/BackButton";
import Post from "../_components/Post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import { getUser } from "./_lib/getUser";
import { getUserPosts } from "./_lib/getUserPosts";
import { auth } from "@/auth";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className={style.main}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
