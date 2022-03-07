import { NextApiResponse, NextApiRequest } from "next";

import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

const roomId = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const room = Data.room.find(Number(id as string));
      if (room) {
        const host = Data.user.find({ id: room.hostId });
        if (host) {
          const newUserWithoutPassword: Partial<
            Pick<StoredUserType, "password">
          > = host;
          delete newUserWithoutPassword.password;
          const roomWithHost = { ...room, host: newUserWithoutPassword };
          res.statusCode = 200;
          return res.send(roomWithHost);
        }
        res.statusCode = 404;
        return res.send("호스트 정보가 없습니다.");
      }
      res.statusCode = 404;
      return res.send("해당 숙소가 없습니다.");
    } catch (e) {
      console.log(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};

export default roomId;
