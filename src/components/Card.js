import React, { useEffect, useState } from 'react';

export default function Card({ monster, onCardClick}) {
  const [monsterDetails, setMonsterDetails] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://www.dnd5eapi.co/api/monsters/${monster.index}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setMonsterDetails(data);
        console.log(data.type);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, [monster.index]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!monsterDetails) {
    return <div className='monster'>Loading...</div>;
  }

  const imageUrl = monsterDetails.image ? `https://www.dnd5eapi.co${monsterDetails.image}` : require('./imgs/plug.png');
  
  return (
    <div className='monster' onClick={() => onCardClick(monster)}>
      <div className='img'>
      <img  src={imageUrl}></img>
      </div>
      <p className='name'>{monster.name}</p>
    </div>
  )
}