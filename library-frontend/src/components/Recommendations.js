import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries/queries";
import { useEffect, useState } from "react";

const Recommendations = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(undefined);
  const user = useQuery(ME, {
    skip: !show,
  });
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !show,
  });

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [user.data, favoriteGenre]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  let books = [...result.data.allBooks];

  return (
    <div>
      <h2>books</h2>

      {favoriteGenre ? (
        <p>
          books in you favorite genre <strong>{favoriteGenre}</strong>
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
    </div>
  );
};

export default Recommendations;
