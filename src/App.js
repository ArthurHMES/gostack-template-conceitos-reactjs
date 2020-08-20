import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])
  
  useEffect(() => {
    loadRepositories()
  }, []);

  async function loadRepositories(){
    const response = await api.get("repositories");

    setRepository(response.data)
  }
 

  async function handleAddRepository() { 
      const newRep = {
        title: "Desafio ReactJS",
        url: "https://github.com/josepholiveira",
        techs: ['React', 'Node.js'],
      }

      await api.post('repositories', newRep)

      setRepository([...repositories, newRep])

      
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoriesUpdated = repositories.filter(repository => repository.id !== id);

    setRepository(repositoriesUpdated);

  }

  return (
<div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
