import { ALL_BOOKS } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(undefined);

  const result = useQuery(ALL_BOOKS, {
    variables: { name: undefined, genre: genre },
    fetchPolicy: "cache-and-network",
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  let books = [...result.data.allBooks];

  const genres = [];

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });

  return (
    <div>
      <h2>books</h2>

      {genre ? (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!genre
        ? genres.map((item, i) => (
            <button
              key={i}
              value={item}
              onClick={(e) => setGenre(e.target.value)}
            >
              {item}
            </button>
          ))
        : null}
      <button onClick={() => setGenre(undefined)}>all genres</button>
    </div>
  );
};

export default Books;
