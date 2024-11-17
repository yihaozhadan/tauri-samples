<script lang="ts">
  let display = $state('0');
  let currentNumber = $state('');
  let operator = $state('');
  let previousNumber = $state('');
  let newNumber = $state(true);
  let isDarkMode = $state(true);

  function handleNumber(num: string) {
    if (newNumber) {
      currentNumber = num;
      newNumber = false;
    } else {
      currentNumber += num;
    }
    display = currentNumber;
  }

  function handleOperator(op: string) {
    if (operator && !newNumber) {
      calculate();
    }
    operator = op;
    previousNumber = display;
    newNumber = true;
  }

  function calculate() {
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }

    display = result.toString();
    currentNumber = display;
    operator = '';
  }

  function clear() {
    display = '0';
    currentNumber = '';
    operator = '';
    previousNumber = '';
    newNumber = true;
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
  }
</script>

<main class="calculator" class:dark={isDarkMode}>
  <div class="theme-toggle">
    <button onclick={toggleTheme}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  </div>
  <div class="display">{display}</div>
  <div class="buttons">
    <button onclick={() => clear()}>C</button>
    <button onclick={() => handleNumber('7')}>7</button>
    <button onclick={() => handleNumber('8')}>8</button>
    <button onclick={() => handleNumber('9')}>9</button>
    <button onclick={() => handleOperator('/')}>/</button>
    <button onclick={() => handleNumber('4')}>4</button>
    <button onclick={() => handleNumber('5')}>5</button>
    <button onclick={() => handleNumber('6')}>6</button>
    <button onclick={() => handleOperator('*')}>×</button>
    <button onclick={() => handleNumber('1')}>1</button>
    <button onclick={() => handleNumber('2')}>2</button>
    <button onclick={() => handleNumber('3')}>3</button>
    <button onclick={() => handleOperator('-')}>-</button>
    <button onclick={() => handleNumber('0')}>0</button>
    <button onclick={() => handleNumber('.')}>.</button>
    <button onclick={() => calculate()}>=</button>
    <button onclick={() => handleOperator('+')}>+</button>
  </div>
</main>

<style>
  .calculator {
    width: 300px;
    margin: 50px auto;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .calculator.dark {
    background: #2d2d2d;
  }

  .theme-toggle {
    text-align: right;
    margin-bottom: 10px;
  }

  .theme-toggle button {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .theme-toggle button:hover {
    background: rgba(128, 128, 128, 0.1);
  }

  .display {
    background: #f5f5f5;
    color: #333;
    padding: 20px;
    text-align: right;
    font-size: 24px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .dark .display {
    background: #1a1a1a;
    color: #fff;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  button {
    padding: 15px;
    font-size: 18px;
    border: none;
    background: #f0f0f0;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .dark button {
    background: #3d3d3d;
    color: #fff;
  }

  button:hover {
    background: #e0e0e0;
  }

  .dark button:hover {
    background: #4d4d4d;
  }

  button:active {
    background: #d0d0d0;
  }

  .dark button:active {
    background: #5d5d5d;
  }

  /* Operator buttons */
  button:nth-child(5),
  button:nth-child(9),
  button:nth-child(13),
  button:nth-child(17) {
    background: #ff9500;
    color: #fff;
  }

  button:nth-child(5):hover,
  button:nth-child(9):hover,
  button:nth-child(13):hover,
  button:nth-child(17):hover {
    background: #ffaa33;
  }

  /* Clear button */
  button:first-child {
    background: #ff3b30;
    color: #fff;
  }

  button:first-child:hover {
    background: #ff5442;
  }

  /* Equals button */
  button:nth-child(16) {
    background: #34c759;
    color: #fff;
  }

  button:nth-child(16):hover {
    background: #40d869;
  }
</style>
