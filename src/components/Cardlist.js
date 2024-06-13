import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function Cardlist({ onMonsterClick }) {
  const [monsters, setMonsters] = useState([]);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const monstersPerPage = 12;

  useEffect(() => {
    const url = 'https://www.dnd5eapi.co/api/monsters';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setMonsters(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, []);

  const totalSlides = Math.ceil(monsters.length / monstersPerPage);

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMonsters = filteredMonsters.slice(
    currentSlide * monstersPerPage,
    currentSlide * monstersPerPage + monstersPerPage
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='front'>
        <input
          className='search'
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      <div className="monster-list">
        {renderMonsters.map(monster => (
          <Card key={monster.index} monster={monster} onCardClick={onMonsterClick} />
        ))}
      </div>
      <div className='btns'>
        <button onClick={handlePrevSlide}>Prev</button>
        <button onClick={handleNextSlide}>Next</button>
      </div>
    </div>
  );
}
