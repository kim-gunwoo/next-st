import style from "./search.module.css";
import BackButton from "../_components/BackButton";
import SearchForm from "../_components/SearchForm";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";
import { Metadata } from "next";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `${searchParams.q} - 검색 / meta `,
    description: `${searchParams.q} - 검색 / meta`,
  };
}

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
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
