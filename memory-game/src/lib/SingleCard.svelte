<script lang="ts">
    let {
        card,
        imgCover,
        handleChoice,
        flipped,
        disabled
    } = $props();
    
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)	
        }	
    }
    </script>
    
    <div class="card">
        <div class:flipped="{flipped}">
            <img 
                src={card.src} 
                class="front" 
                alt="card front" />
            <button onclick={handleClick} >
                <img 
                    src={imgCover} 
                    class="back" 
                    alt="card back" />
            </button>
        </div>
    </div>
    
<style>
    button {
        border: none;
        padding: 0px;
    }
    .card {
        position: relative;
    }
    .card img {
        width: 100%;
        display: block;
        border: 2px solid #fff;
        border-radius: 6px;
    }
    
    /* front of card - the picture 	 */
    .card .front {
        transform: rotateY(90deg);
        transition: all ease-in 0.2s;
        position: absolute;
    }
    .flipped .front {
        transform: rotateY(0deg);
        transition-delay: 0.2s;
    }
    
    /* back of card - cover	 */
    .card .back {
        transition: all ease-in 0.2s;
        transition-delay: 0.2s;
    }
    .flipped .back {
        transform: rotateY(90deg);
        transition-delay: 0s;
    }
</style>
    
    