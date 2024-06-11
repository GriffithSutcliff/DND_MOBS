import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function Cardlist({onMonsterClick }) {
  const [monsters, setmonsters] = useState([]);
  const [error, setError] = useState(null);

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
        setmonsters(data.results);
        console.log(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="monster-list">
      {monsters.map(monster => (
        <Card key={monster.id} monster={monster}  onCardClick={onMonsterClick}/>
      ))}
    </div>
  );
}
