import fetch from "isomorphic-unfetch";

const Name = ({ user, time }: { user: { name: string }; time: Date }) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: { name: string };
}) => {
  try {
    const res = await fetch(`https://api.github.com/users/${params.name}`);
    const user = await res.json();
    return { props: { user, time: new Date().toISOString() } };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { name: "test" } }],
    fallback: false,
  };
}
export default Name;
