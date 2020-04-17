import React, { useState, useEffect }  from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])


  async function handleAddRepository() {
    const response = await api.post('/repositories', { 
      title: 'Um dev mt bom', 
      url: 'guilhermegtf@hotmail.com', 
      techs: ['nodejs', 'react'] });

    const repository = response.data;
    setRepositories([ ... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('/repositories/' + id);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositories => (
          <li key={repositories.id}>{repositories.title}
           <button onClick={() => handleRemoveRepository(repositories.id)}>
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
