import Cardlist from "./components/Cardlist";
import MonsterDetails from "./components/MonsterDetails";
import React, { useState } from 'react';

function App() {
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [lang, setLang] = useState('eng');

  const languages = {
    eng: {
      lang: 'eng',
      search: 'Search by name',
      prev: 'prev',
      next: 'next',
      back: 'back'
    },
    ru: {
      lang: 'рус',
      search: 'Поиск по имени',
      prev: 'пред',
      next: 'след',
      back: 'назад'
    }
  }

  const changeLang = () =>{
    if(lang === 'eng'){
      setLang('ru')
    } 
    else{
      setLang('eng')
    }
  }

  const handleMonsterClick = (monster) => {
    setSelectedMonster(monster);
  };
  const handleBackClick = () => {
    setSelectedMonster(null);
  };

  return (
    <div className="App">
      <button className="changeLang" onClick={changeLang}>{lang === 'eng' ? languages.eng.lang : languages.ru.lang}</button>
      <div className="list">
        {selectedMonster ? (
          <MonsterDetails monster={selectedMonster}  onBack={handleBackClick} lang={lang} languages={languages}/>
        ) : (
          <Cardlist onMonsterClick={handleMonsterClick} lang={lang} languages={languages}/>
        )}
      </div>
    </div>
  );
}

export default App;

 