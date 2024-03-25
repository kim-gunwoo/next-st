// import {
//   HydrationBoundary,
//   QueryClient,
//   dehydrate,
// } from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
// import { getPostRecommends } from "./_lib/getPostRecommends";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description: "홈",
};

export default async function Page() {
  const session = await auth();
  // const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 0,
  // });

  // const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydratedState}>
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
    // </HydrationBoundary>
  );
}
