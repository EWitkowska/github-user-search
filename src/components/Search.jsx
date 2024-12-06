import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ onSearch, error }) => {
  const [userName, setUserName] = useState("");

  const handleSearchClick = () => {
    if (onSearch) onSearch(userName);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Box>
      <TextField
        value={userName}
        placeholder="Find GitHub users"
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Search;
