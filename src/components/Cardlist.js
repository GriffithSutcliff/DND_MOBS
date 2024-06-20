import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function Cardlist({ onMonsterClick, lang, languages }) {
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

  const handleNextSlide = () => {
    setCurrentSlide((prev) => prev === totalSlides - 1 ? 0 : prev + 1);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? totalSlides - 1 : prev - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentSlide(0); 
  };

  const filteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSlides = Math.ceil(filteredMonsters.length / monstersPerPage);

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
          placeholder={lang === 'eng' ? languages.eng.search : languages.ru.search}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      <div className="monster-list">
        {renderMonsters.map(monster => (
          <Card key={monster.index} monster={monster} onCardClick={onMonsterClick} lang={lang}/>
        ))}
      </div>
      <div className='btns'>
        <button onClick={handlePrevSlide} disabled={totalSlides <= 1}>{lang === 'eng' ? languages.eng.prev : languages.ru.prev}</button>
        <button onClick={handleNextSlide} disabled={totalSlides <= 1}>{lang === 'eng' ? languages.eng.next : languages.ru.next}</button>
      </div>
    </div>
  );
}

