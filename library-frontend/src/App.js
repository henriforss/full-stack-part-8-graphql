import { useQuery, useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS } from "./queries/queries";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const client = useApolloClient();

  const result = useQuery(ALL_AUTHORS, {});

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        ) : null}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>

      <Authors show={page === "authors"} authors={result.data.allAuthors} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />

      <Login show={page === "login"} setToken={setToken} setError={setError} />
    </div>
  );
};

export default App;
