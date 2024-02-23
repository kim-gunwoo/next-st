import style from "./search.module.css";
import BackButton from "../_components/BackButton";
import Post from "../_components/Post";
import SearchForm from "../_components/SearchForm";
import Tab from "./_component/Tab";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function Page({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
