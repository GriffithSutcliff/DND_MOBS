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
  const swim = monsterDetails.speed.swim ? ` Swim: ${monsterDetails.speed.swim}` : '';
  const imageUrl = monsterDetails.image ? `https://www.dnd5eapi.co${monsterDetails.image}` : require('./imgs/plug.png');
  return (
    <div className='monster-details'>
      <div className='left-side'>
        <img src={imageUrl}></img>
        <div>{monster.name}</div>
        <div>Armor: {monsterDetails.armor_class[0].type} {monsterDetails.armor_class[0].value}</div>
        <div>Type: {monsterDetails.type}</div>
        <div>HP: {monsterDetails.hit_points}</div>
        <div>HD: {monsterDetails.hit_dice}</div>
        <div>Walk: {monsterDetails.speed.walk}{swim}</div>
        <div>Size: {monsterDetails.size}</div>
        <div>Rate: {monsterDetails.challenge_rating}, XP: {monsterDetails.xp}</div>
        <button onClick={onBack}>Back</button>
      </div>
      <div className='right-side'>
        <div className='stats'>
            <div className='stats-column'>
              <div>Strength</div>
              <div>{monsterDetails.strength}</div>
            </div>
            <div className='stats-column'>
              <div>Dexterity</div>
              <div>{monsterDetails.dexterity}</div>
            </div>
            <div className='stats-column'>
              <div>Constitution</div>
              <div>{monsterDetails.constitution}</div>
            </div>
            <div className='stats-column'>
              <div>Intelligence</div>
              <div>{monsterDetails.intelligence}</div>
            </div>
            <div className='stats-column'>
              <div>Wisdom</div>
              <div>{monsterDetails.wisdom}</div>
            </div>
            <div className='stats-column'>
              <div>Charisma</div>
              <div>{monsterDetails.charisma}</div>
            </div>
          </div>
          <div className='spells'>
          <h2>Proficiencies</h2>
          {monsterDetails.proficiencies.map((spell, index) => (
            <div key={index}>{spell.proficiency.name}</div>
          ))}
        </div>
        </div>
    </div>
  )
}
