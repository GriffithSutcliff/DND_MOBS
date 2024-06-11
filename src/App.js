import Cardlist from "./components/Cardlist";
import MonsterDetails from "./components/MonsterDetails";
import React, { useState } from 'react';

function App() {
  const [selectedMonster, setSelectedMonster] = useState(null);

  const handleMonsterClick = (monster) => {
    setSelectedMonster(monster);
  };
  const handleBackClick = () => {
    setSelectedMonster(null);
  };

  return (
    <div className="App">
      <div className="list">
        {selectedMonster ? (
          <MonsterDetails monster={selectedMonster}  onBack={handleBackClick} />
        ) : (
          <Cardlist onMonsterClick={handleMonsterClick} />
        )}
      </div>
    </div>
  );
}

export default App;
 