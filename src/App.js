import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from "./Components/SingleCard";


const cardImages = [
  { src: "/img/helmet-1.png" , matched: false}, //مچ برای مطابقت داشتن کارت هاست
  { src: "/img/potion-1.png" , matched: false},
  { src: "/img/ring-1.png" , matched: false},
  { src: "/img/scroll-1.png" , matched: false},
  { src: "/img/shield-1.png" , matched: false},
  { src: "/img/sword-1.png" , matched: false}
];

function App() {
  const [cards, setCards] = useState([]); //مجموعه 12کارت
  const [turns, setTurns] = useState(0); //شمارش تعداد انتخاب های کارتها
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false); //برای جلوگیری از کلیک بازیکن روی چند کارت در حین انجام مقایسه استفاده می شود

  const shuffleCards = () => {
    //تهیه 2 کپی از آرایه کارد ایمیجز  به منضور حفظ لیست اصلی تصاویر
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handel  choice
  const handelChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisable(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handelChoice={handelChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disable}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
