import Post from "@/app/(afterLogin)/_components/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_components/ActionButtons";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import ImageZone from "./_component/ImageZone";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";

export default async function PhotoDetailModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={style.container}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
