import React from "react";
import { Box, Typography, Link } from "@mui/material";

const RepoInfo = ({ repo }) => {
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
      <Typography variant="subtitle1">
        <Link href={repo.html_url} target="_blank" underline="hover">
          {repo.name}
        </Link>
      </Typography>
      {repo.description && (
        <Typography variant="body2" color="textSecondary">
          {repo.description}
        </Typography>
      )}
      <Box mt={2} display="flex" gap={2}>
        <Typography variant="caption">
          <strong>Stars: </strong>
          {repo.stargazers_count}
        </Typography>
        <Typography variant="caption">
          <strong>Forks: </strong>
          {repo.forks_count}
        </Typography>
        <Typography variant="caption">
          <strong>Main Language: </strong>
          {repo.language || "No Data"}
        </Typography>
      </Box>
    </Box>
  );
};

export default RepoInfo;
