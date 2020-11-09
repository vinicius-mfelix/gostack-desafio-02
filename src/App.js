import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repo = {
      title: "flutter",
      url: "https://github.com/flutter/flutter",
      techs: [
        "Dart"
      ]
    };

    const response = await api.post('/repositories', repo);

    setRepositories([...repositories, response.data]);

  }

  function handleRemoveRepository(id) {
    api.delete('/repositories/' + id).then(() => {
      const repos = repositories.filter(repo => repo.id !== id);
      setRepositories(repos);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => repo.id !== undefined &&
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
