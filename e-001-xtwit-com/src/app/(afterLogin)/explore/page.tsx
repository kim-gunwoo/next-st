import style from "./explore.module.css";
import SearchForm from "../_components/SearchForm";
import TrendSection from "./_component/TrendSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "탐색하기 / meta",
  description: "탐색해보세요.",
};

export default function Page() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
