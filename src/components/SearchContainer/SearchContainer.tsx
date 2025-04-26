import React, { useState } from 'react';
import styles from './SearchContainer.module.css';
import { GithubUserData } from './types'; 
import UserProfileCard from '../UserProfileCard/UserProfileCard';
import githubLogo from '../../assets/github-logo.png';
import searchIcon from '../../assets/search-icon.svg';
import ReactConfetti from 'react-confetti';

function SearchContainer() {
  const [usernameInput, setUsernameInput] = useState('');
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };

  // Async function para buscar dados na API do GitHub
  const handleSearch = async () => {
    const trimmedInput = usernameInput.trim();
    if (!trimmedInput) {
      setError('Por favor, digite um nome de usuário.');
      setUserData(null);
      return;
    }

    setError(null);
    setUserData(null);
    setLoading(true); 

    try {
      const apiUrl = `https://api.github.com/users/${trimmedInput}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Usuário "${trimmedInput}" não encontrado.`);
        }
        throw new Error(`Erro ao buscar dados: ${response.statusText} (Status: ${response.status})`);
      }
      const data: GithubUserData = await response.json();
      setUserData(data);

    } catch (err) {
      console.error("Erro durante a busca:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      setUserData(null); 
    } finally {
      setLoading(false); 
    }
  };

  // Wrapper para o onSubmit do formulário 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    handleSearch();
  };

  return (
    <div className={styles.searchContainer}>
      {userData && !loading && !error && (
        <ReactConfetti
          recycle={false} 
          numberOfPieces={300} 
          gravity={0.15} 
          initialVelocityY={20} 
          style={{ pointerEvents: 'none' }} 
        />
      )}

      <div className={styles.titleContainer}>
        <img src={githubLogo} alt="Logo do GitHub" className={styles.githubLogo} />
        <h1 className={styles.titleText}>Perfil GitHub</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={usernameInput}
          onChange={handleInputChange}
          className={styles.searchInput}
          placeholder="Digite um usuário do Github"
          aria-label="Nome de usuário do GitHub"
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Buscar"
          disabled={loading || !usernameInput.trim()}
        >
          {!loading && <img src={searchIcon} alt="Buscar" className={styles.searchIcon} />}
      
        </button>
      </form>

      <div className={styles.resultsArea}>
        {loading && <div className={styles.loadingIndicator}>Carregando...</div>}

        {error && !loading && <div className={styles.errorMessage}>{error}</div>}

        {userData && !loading && !error && (
          <UserProfileCard
            name={userData.name || userData.login} 
            avatarUrl={userData.avatar_url}
            bio={userData.bio || 'Este usuário não possui bio.'} 
          />
        )}

         {!loading && !error && !userData && (
           <div className={styles.emptyState}>Digite um nome de usuário e clique em buscar.</div>
         )}

{userData && !loading && !error && (
            <div> 
            <button className={styles.buttonLink}>
            <a href='/'>Limpar</a>
            </button>
          </div>
         )}

      </div>

    </div>
  );
}

export default SearchContainer;