interface Time {
  time: Date;
}

export default function StaticPage({ time }: Time) {
  return <div>{time}</div>;
}

export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 };
};
