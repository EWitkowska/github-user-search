import React, { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import RepoInfo from "./RepoInfo";
import { paginate } from "../utils/pagination";

const RepoList = ({ repos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { itemsToDisplay: reposToDisplay, totalPages } = paginate(
    repos,
    currentPage
  );

  if (repos.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No repositories found
      </Typography>
    );
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box>
      <Box>
        {reposToDisplay.map((repo) => (
          <RepoInfo key={repo.id} repo={repo} />
        ))}
      </Box>
      {repos.length > 10 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default RepoList;
