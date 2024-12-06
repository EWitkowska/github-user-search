import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Paper } from "@mui/material";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import { searchUsers, getUserRepos } from "./api/githubApi";
import theme from "./theme/theme";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [listError, setListError] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setUsers([]);
      setSearchError(null);
      return;
    }

    setLoading(true);
    setSearchError(null);

    try {
      const results = await searchUsers(query);
      setUsers(results);
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadRepos = async (userName) => {
    try {
      const repos = await getUserRepos(userName);
      setListError(null);
      return repos;
    } catch (error) {
      setListError(error.message);
      return [];
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <Paper
          variant="outlined"
          sx={{
            padding: 4,
            borderRadius: 2,
            marginBottom: 4,
          }}
        >
          <Header />
          <Search onSearch={handleSearch} error={searchError} />
          <UserList
            onLoadRepos={handleLoadRepos}
            users={users}
            loading={loading}
            error={listError}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
