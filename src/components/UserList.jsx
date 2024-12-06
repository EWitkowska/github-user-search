import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import UserInfo from "./UserInfo";
import { paginate } from "../utils/pagination";

const UserList = ({ onLoadRepos, users, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { itemsToDisplay: usersToDisplay, totalPages } = paginate(
    users,
    currentPage
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box mt={4}>
      {loading && <Typography>Loading...</Typography>}
      {!loading && (
        <>
          <Box spacing={3}>
            {usersToDisplay.map((user) => (
              <Box item xs={12} key={user.id} mt={2}>
                <UserInfo user={user} onLoadRepos={onLoadRepos} error={error} />
              </Box>
            ))}
          </Box>
          {users.length > 10 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UserList;
