class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 作業時間（25分）
        this.breakTime = 5 * 60; // 休憩時間（5分）
        this.isWorking = true; // 作業中か休憩中か
        this.timer = null;
        this.isRunning = false;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');
        this.resetButton = document.getElementById('reset');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timer = setInterval(() => {
            if (this.workTime > 0) {
                this.workTime--;
                this.timerDisplay.textContent = this.formatTime(this.workTime);
            } else {
                // 作業時間終了
                this.isWorking = !this.isWorking;
                if (this.isWorking) {
                    this.workTime = this.workTimeInput.value * 60;
                } else {
                    this.workTime = this.breakTimeInput.value * 60;
                }
                this.timerDisplay.textContent = this.formatTime(this.workTime);
            }
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        clearInterval(this.timer);
        this.isRunning = false;
    }

    reset() {
        this.stop();
        this.workTime = this.workTimeInput.value * 60;
        this.breakTime = this.breakTimeInput.value * 60;
        this.isWorking = true;
        this.timerDisplay.textContent = this.formatTime(this.workTime);
    }

    updateWorkTime() {
        this.workTime = this.workTimeInput.value * 60;
        if (!this.isRunning) {
            this.timerDisplay.textContent = this.formatTime(this.workTime);
        }
    }

    updateBreakTime() {
        this.breakTime = this.breakTimeInput.value * 60;
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
