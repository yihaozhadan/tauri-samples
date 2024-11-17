<script lang="ts">
  import { run } from 'svelte/legacy';

  import SingleCard from './lib/SingleCard.svelte'	
    
  type Card = { id?: number, src: string, matched: boolean };
  let imgCover = '/images/cover.png';
  let imgHelmet = '/images/helmet-1.png'
  let imgPotion = '/images/potion-1.png'
  let imgRing = '/images/ring-1.png'
  let imgScroll = '/images/scroll-1.png'
  let imgShield = '/images/shield-1.png'
  let imgSword = '/images/sword-1.png'
  
  const cardImages: Card[] = [
    { src: imgHelmet, matched: false },
    { src: imgPotion, matched: false },
    { src: imgRing, matched: false },
    { src: imgScroll, matched: false },
    { src: imgShield, matched: false },
    { src: imgSword, matched: false },
  ]
  
  let cards: Card[] = $state([])
  let turns = $state(0)
  let choiceOne: Card | null = $state(null)
  let choiceTwo: Card | null = $state(null)
  let disabled = $state(false)
  let win = $state(false)
  
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random()}))
    cards = shuffledCards 
    turns = 0
    win = false
  }
    
  // 	handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? choiceTwo = card : choiceOne = card
  }	
     
    
  
  
  // reset choices & increase turn
  const resetTurn = () => {
    choiceOne = null
    choiceTwo = null
    turns = turns + 1	
    disabled = false
    if(!cards.find(card => !card.matched))
      setTimeout(() => win = true, 500)
  }
    // 	compare 2 selected cards
  run(() => {
    if (choiceOne && choiceTwo) {
      disabled = true
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match')			
        cards = cards.map(card => {
          if (card.src === choiceOne?.src) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
        resetTurn()				 
      } else {
        console.log('those cards do not match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  });
  run(() => {
    console.log(cards)
  });
  // 	start a game automatically
  run(() => {
    shuffleCards()
  });
</script>
  
  <div class="App">	
    <h1>Match Game</h1>
    <button onclick={shuffleCards}>
      New Game
    </button>	
    {#if win}
      <h2>🎉 Congratulations!</h2>
    {/if}
    <div class="card-grid">
    {#each cards as card (card.id)}
      <SingleCard 
        {card} 
        {imgCover} 
        {disabled}
        {handleChoice}
        flipped={
          card === choiceOne || 
          card === choiceTwo || 
          card.matched} />
    {/each}
    </div>
    <p>
      Turns: {turns}
    </p>
  </div>
  
  <style>
  .App {
    max-width: 860px;
    margin: 0 auto;
    background: #1b1523;
    min-height: 100vh;
    text-align:center;
    padding: 1rem;
    color: white;
  }
  h1 {
    color: white;
  }
  button {
    background: none;
    border: 2px solid #fff;
    padding: 6px 12px;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    font-size: 1em;
  }
  button:hover {
    background: #c23866;
    color: #fff;
  }
  .card-grid {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
  </style>