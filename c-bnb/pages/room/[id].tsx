import { NextPage } from "next";
import RoomDetail from "../../components/room/detail/RoomDetail";
import { getRoomAPI } from "../../lib/api/room";
import { wrapper } from "../../store";
import { roomActions } from "../../store/room";

const roomDetail: NextPage = () => {
  return <RoomDetail />;
};

roomDetail.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ pathname, req, res, query }) => {
      const { id } = query;
      try {
        if (id) {
          const { data } = await getRoomAPI(Number(id as string));
          store.dispatch(roomActions.setDetailRoom(data));
        }
      } catch (e) {
        console.log(e);
      }
      return {};
    }
);

export default roomDetail;
