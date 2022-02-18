import { NextApiRequest, NextApiResponse } from "next";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //* 로그아웃 하기
    if (req.method === "DELETE") {
      res.setHeader("Set-Cookie", "access_token=; path=/; expires=-1; ");
      res.statusCode = 204;
      return res.end();
    }
  } catch (e: any) {
    console.log(e);
    return res.send(e.message);
  }
  res.statusCode = 405;

  return res.end();
};

export default logout;
