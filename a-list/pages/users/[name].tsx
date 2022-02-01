import axios from "axios";
import fetch from "isomorphic-unfetch";
import css from "styled-jsx/css";
import Profile from "../../components/Profile";
import Repositories from "../../components/Repositories";

const Name = ({ user, repos }: any) => {
  return (
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  const { name, page = "1" } = query;
  try {
    let user;
    let repos;

    // const { data: auser } = await axios(`https://api.github.com/users/${name}`);
    // const { data: arepos } = await axios(
    //   `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`
    // );

    const userRes = await fetch(`https://api.github.com/users/${name}`, {
      // headers: {
      //   Authorization: "token 714e48da28db7533dd9dafe6f4f040b142d30560",
      // },
    });
    if (userRes.status === 200) {
      user = await userRes.json();
    } else {
      throw Error(userRes.statusText);
    }
    const repoRes = await fetch(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`,
      {
        // headers: {
        //   Authorization: "token 714e48da28db7533dd9dafe6f4f040b142d30560",
        // },
      }
    );
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    } else {
      throw Error(userRes.statusText);
    }
    // user = auser;
    // repos = arepos;

    return { props: { user, repos } };
  } catch (e: any) {
    console.log(e.message);
    return { props: {} };
  }
};

const style = css`
  .user-contents-wrapper {
    padding: 20px;
    display: flex;
  }
`;

export default Name;
