import React, { useEffect, useState } from 'react';

export default function MonsterDetails({monster, onBack}) {
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
        console.log(data);
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
    return <div className='loading'>Loading<span class="dots"></span></div>;
  }
  return (
    <div>
    <button onClick={onBack}>Back</button>
    <div>{monster.name}</div>
    <div>{monsterDetails.armor_class[0].value}</div>
    </div>
  )
}
