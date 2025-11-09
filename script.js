// 電卓専用スクリプト
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C' || button.id === 'clear') {
      currentInput = '';
    } else if (value === '=') {
      try {
        // シンプルなバリデーション: 数字、演算子、小数点、括弧と空白のみ許可
        if (!/^[0-9+\-*/().\s]+$/.test(currentInput)) {
          throw new Error('Invalid input');
        }
        // 注意: eval を使用。安全化が必要なら相談してください。
        currentInput = String(eval(currentInput));
      } catch (e) {
        currentInput = 'Error';
      }
    } else {
      currentInput += value;
    }

    display.value = currentInput;
  });
});