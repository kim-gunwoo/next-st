import type { NextPage } from "next";
import { useState } from "react";
import Datepicker from "../components/Datepicker";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [date, setDate] = useState(new Date(2022, 7, 10));

  console.log(date);

  return (
    <div className={styles.container}>
      <Datepicker
        selectDate={date}
        changeDate={(date) => {
          setDate(date);
        }}
      />
    </div>
  );
};

export default Home;
