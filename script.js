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

// タブ切り替え機能
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // すべてのタブを非アクティブに
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    // クリックしたタブをアクティブに
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    // 対応するパネルを表示
    const targetId = button.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// カレンダー機能
// ページ読み込み時の日付を基準として保存
const initialDate = new Date();
const todayYear = initialDate.getFullYear();
const todayMonth = initialDate.getMonth();
const todayDate = initialDate.getDate();

// 現在表示中の年月を管理
let currentDate = new Date(todayYear, todayMonth, 1);

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // 月の名前を表示
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const monthDisplay = document.getElementById('current-month');
  if (monthDisplay) {
    monthDisplay.textContent = `${monthNames[month]} ${year}`;
  }
  
  // カレンダーグリッドを取得
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;
  
  // 既存の日付セルを削除（曜日は残す）
  const dayCells = calendarGrid.querySelectorAll('.day, .empty');
  dayCells.forEach(cell => cell.remove());
  
  // 月の最初の日と最後の日を取得
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const lastDate = lastDay.getDate();
  
  // 今日の日付かどうかを判定（ページ読み込み時の日付と比較）
  const isCurrentMonth = year === todayYear && month === todayMonth;
  
  // 空のセルを追加（月の最初の日まで）
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day empty';
    calendarGrid.appendChild(emptyCell);
  }
  
  // 日付セルを追加
  for (let date = 1; date <= lastDate; date++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.textContent = date;
    
    // 今日の日付をハイライト
    if (isCurrentMonth && date === todayDate) {
      dayCell.classList.add('today');
    }
    
    calendarGrid.appendChild(dayCell);
  }
}

// 月の切り替えボタンのイベントリスナー
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const todayBtn = document.getElementById('today-btn');

if (prevMonthBtn) {
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
}

if (nextMonthBtn) {
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
}

if (todayBtn) {
  todayBtn.addEventListener('click', () => {
    // ページ読み込み時の日付に戻る
    currentDate = new Date(todayYear, todayMonth, 1);
    renderCalendar();
  });
}

// ページ読み込み時にカレンダーを表示
renderCalendar();
