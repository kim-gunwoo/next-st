import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");

  return (
    <div>
      <label>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <p>{username} 깃허브 검색하기</p>
      <Link href={`/users/${username}`}>
        <a>검색하기</a>
      </Link>
    </div>
  );
};

export default Home;
