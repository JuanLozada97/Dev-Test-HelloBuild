import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

export const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch repositories for juanlozada97
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/juanlozada97/repos"
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex-grow">
            GitHub Repositories
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <Typography variant="h5" className="mb-4 text-gray-800">
            Repositories of <strong>juanlozada97</strong>
          </Typography>
          <Grid container spacing={3}>
            {repositories.map((repo) => (
              <Grid item xs={12} md={6} key={repo.id}>
                <Card className="shadow-md">
                  <CardContent>
                    <Typography variant="h6" className="text-gray-800">
                      {repo.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {repo.description || "No description available"}
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      Stars: {repo.stargazers_count} | Forks: {repo.forks_count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};
