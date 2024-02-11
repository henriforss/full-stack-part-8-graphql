import { useState, useEffect } from "react";
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries/queries";
import { useMutation } from "@apollo/client";
import { useMemo } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = useMemo(() => [...props.authors], [props.authors]);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(year) } });

    setName(authors[0].name);
    setYear("");
  };

  useEffect(() => {
    if (authors.length > 0 && name === "") {
      setName(authors[0].name);
    }
  }, [authors, name]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a, i) => (
              <option key={i} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>

        <button type="submit">change birthyear</button>
      </form>
    </div>
  );
};

export default Authors;
