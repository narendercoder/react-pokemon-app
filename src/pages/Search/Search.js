import {
  createTheme,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Search() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(" ");
  const [content, setContent] = useState([]);
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {

      let url = `https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${20*(page-1)}`;
      const res = await fetch(url);
      const data = await res.json();
      var searchArr =[];
      for (let i = 0; i < data.results.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (data.results[i].name.includes(searchText.toLowerCase()) || data.results[i].url.split('/')[6].toString().includes(searchText)) {
            searchArr.push(data.results[i]);
        }
    }
    setContent(searchArr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{ 
            display: "flex"}}>
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value.length > 0 ? e.target.value : " ")}
            />
            <Button variant="contained" 
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
            >
              <SearchIcon />
            </Button>
          </div>
        </ThemeProvider>
        <div className="pokemon-wrapper">
        {content  &&
          content.map((c) => (
            <SingleContent
              key={c.url.split('/')[6]}
              id={c.url.split('/')[6]}
              pokemonIndex={c.url.split('/')[6]}
              name={c.name}
              title={c.name.split('-')[0]}
            />
          ))}
          {content.length === 0 ? <h2 style={{color: "white"}}>No Pokemon Found</h2> : " "}
        </div>
          { content.length !== 0 &&
            (<CustomPagination setPage={setPage} />
            )}
      </div>
    </>
  );
}

export default Search;
