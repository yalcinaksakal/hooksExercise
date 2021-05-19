import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
  const searchRef = useRef();
  const { onSearch } = props;
  const [filter, setFilter] = useState("");
  const [lastSearchedText, setLastSearchedText] = useState("");
  useEffect(() => {
    const inputTimer = setTimeout(() => {
      // filter's value is the value .5s ago, compare it with the current value and decide whether user stopped writing or not
      if (filter !== lastSearchedText) {
        console.log("searching");
        setLastSearchedText(filter);
        onSearch(filter.toLowerCase());
      }
    }, 500);
    return () => clearTimeout(inputTimer);
  }, [filter, onSearch, lastSearchedText]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={searchRef}
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
