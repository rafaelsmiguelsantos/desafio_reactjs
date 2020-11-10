import React from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = React.useState([]);
  React.useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio NodeJs',
      url: 'https://github.com/priscilaandreani/desafioNodeJS',
      techs: ['NodeJS', 'ExpressJS'],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
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
