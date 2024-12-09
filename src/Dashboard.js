import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFavorite = (repoId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(repoId)
        ? prevFavorites.filter((id) => id !== repoId)
        : [...prevFavorites, repoId]
    );
  };

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteRepositories = repositories.filter((repo) =>
    favorites.includes(repo.id)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex-grow">
            GitHub Repositories
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <Typography variant="h5" className="mb-4 text-gray-800">
            Repositories of <strong>juanlozada97</strong>
          </Typography>
          <TextField
            label="Search Repositories"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Grid container spacing={3}>
            {filteredRepositories.map((repo) => (
              <Grid item xs={12} md={6} key={repo.id}>
                <Card className="shadow-md">
                  <CardContent>
                    <Typography variant="h6" className="text-gray-800">
                      {repo.name}
                      <IconButton
                        onClick={() => toggleFavorite(repo.id)}
                        color="primary"
                      >
                        {favorites.includes(repo.id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
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

        {favoriteRepositories.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
            <Typography variant="h5" className="mb-4 text-gray-800">
              Favorite Repositories
            </Typography>
            <Grid container spacing={3}>
              {favoriteRepositories.map((repo) => (
                <Grid item xs={12} md={6} key={repo.id}>
                  <Card className="shadow-md">
                    <CardContent>
                      <Typography variant="h6" className="text-gray-800">
                        {repo.name}
                        <IconButton
                          onClick={() => toggleFavorite(repo.id)}
                          color="primary"
                        >
                          {favorites.includes(repo.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {repo.description || "No description available"}
                      </Typography>
                      <Typography variant="caption" className="text-gray-400">
                        Stars: {repo.stargazers_count} | Forks:{" "}
                        {repo.forks_count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};
