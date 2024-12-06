import React, { useState } from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RepoList from "./RepoList";

const UserInfo = ({ user, onLoadRepos, error }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = async () => {
    if (!expanded) {
      setLoading(true);
      try {
        const userRepos = await onLoadRepos(user.login);
        setRepos(userRepos);
      } finally {
        setLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "4px",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar
            src={user.avatar_url}
            alt={user.login}
            sx={{ width: 55, height: 55, mr: 2 }}
          />
          <Typography variant="h6">{user.login}</Typography>
        </Box>
        <Button variant="contained" href={user.html_url} target="_blank">
          View Profile
        </Button>
      </Box>
      <Box mt={2}>
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          onClick={handleExpandClick}
          size="small"
        >
          {expanded ? "Hide Repositories" : "Show Repositories"}
        </Button>
      </Box>
      {expanded && (
        <Box mt={2}>
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && <RepoList repos={repos} />}
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
