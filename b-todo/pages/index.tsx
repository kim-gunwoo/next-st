import type { NextPage } from "next";
import { wrapper } from "../app";
import { todoActions } from "../app/todo";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../utils/api/todo";

const Home: NextPage = () => {
  return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      try {
        const { data } = await getTodosAPI();
        store.dispatch(todoActions.setTodo(data));
        return { props: {} };
      } catch (e) {
        // console.log(e);
        return { props: {} };
      }
    }
);

export default Home;
