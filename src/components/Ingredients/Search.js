import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const { onSearch } = props;
  const [filter, setFilter] = useState("");
  useEffect(() => {
    onSearch(filter);
  }, [filter, onSearch]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value.trim())}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
