class Game {
    constructor() {
        this.grid = document.getElementById('grid');
        this.cells = [];
        this.currentColumn = 0;
        this.currentRow = 0;
        this.selectedColumns = [];
        this.intervalId = null;
        this.isPlaying = false;
        this.isPaused = false; // Variável para controlar o estado de pausa do jogo
        this.rounds = 0;
        this.isGameStarted = false; // Variável para controlar o estado do jogo
        this.stats = {
            score: 0,
            lives: 3,
            hits: 0,
            misses: 0
        };
        this.settings = {
            initialSpeed: 1000,
            speedMultiplier: 1.0, // Ajuste o valor inicial
            useSpace: true
        };
        this.init();
    }

    init() {
        this.createGrid();
        this.setupControls();
        this.showStartMenu();
    }

    createGrid() {
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            this.cells.push(cell);
            this.grid.appendChild(cell);
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isGameStarted) { // Adiciona condição para evitar conflito
                this.startGame();
            } else if (e.code === 'Space' && this.isGameStarted && this.settings.useSpace && !this.isPaused) {
                this.stopLight();
            } else if (e.code === 'KeyF') {
                this.toggleAdminPanel();
            }
        });
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (!this.settings.useSpace && !this.isPaused) {
                    this.stopLight();
                }
            });
        });
        document.getElementById('applySettings').addEventListener('click', () => this.applyAdminSettings());
        document.getElementById('resetRound').addEventListener('click', () => this.resetRound());
    }

    startGame() {
        this.isGameStarted = true; // Marca o estado do jogo como iniciado
        this.updateSettings();
        this.hideStartMenu();
        this.startCountdown();
    }

    updateSettings() {
        this.settings.initialSpeed = parseInt(document.getElementById('initialSpeed').value);
        this.settings.speedMultiplier = parseFloat(document.getElementById('speedMultiplier').value);
    }

    applyAdminSettings() {
        this.settings.initialSpeed = parseInt(document.getElementById('adminInitialSpeed').value);
        this.settings.speedMultiplier = parseFloat(document.getElementById('adminSpeedMultiplier').value);
        this.updateHUD(); // Atualiza a interface para refletir as novas configurações
        this.toggleAdminPanel();
    }

    resetRound() {
        this.startRound();
        this.toggleAdminPanel();
    }

    startCountdown() {
        const countdown = document.getElementById('countdown');
        countdown.classList.remove('hidden');
        let counter = 3;
        countdown.textContent = counter;
        const countdownInterval = setInterval(() => {
            counter--;
            countdown.textContent = counter;
            if (counter === 0) {
                clearInterval(countdownInterval);
                countdown.classList.add('hidden');
                this.startRound();
            }
        }, 1000);
    }

    startRound() {
        this.isPlaying = true;
        this.currentRow = 0;
        this.selectedColumns = [];
        this.clearGrid(); // Reinicia o grid a cada rodada
        this.startLine();
    }

    clearGrid() {
        this.cells.forEach(cell => cell.classList.remove('active'));
    }

    startLine() {
        this.currentColumn = 0; // Sempre inicia no array 0 de cada linha
        clearInterval(this.intervalId); // Limpa o intervalo anterior
        this.cells[this.currentRow * 5 + this.currentColumn].classList.add('active'); // Ativa o primeiro quadrado da linha
        this.moveLight(); // Inicia o movimento imediatamente
    }

    moveLight() {
        clearInterval(this.intervalId); // Limpa o intervalo anterior
        let speed = this.settings.initialSpeed / (this.settings.speedMultiplier * (this.currentRow + 1));
        this.intervalId = setInterval(() => {
            if (this.isPaused) return; // Verifica se o jogo está pausado
            this.cells[this.currentRow * 5 + this.currentColumn].classList.remove('active');
            this.currentColumn = (this.currentColumn + 1) % 5;
            this.cells[this.currentRow * 5 + this.currentColumn].classList.add('active');
        }, speed);
    }

    stopLight() {
        if (!this.isPlaying || this.isPaused) return;
        clearInterval(this.intervalId);
        this.selectedColumns.push(this.currentColumn);
        this.checkProgress();
    }

    checkProgress() {
        this.currentRow++;
        if (this.currentRow === 5) {
            this.checkAlignment();
        } else {
            this.startLine();
        }
    }

    checkAlignment() {
        const isAligned = this.selectedColumns.every(col => col === this.selectedColumns[0]);
        if (isAligned) {
            this.stats.score += 100 * this.selectedColumns.length;
            this.stats.hits++;
            this.endGame(true); // Encerra o jogo como vitória
        } else {
            this.stats.lives--;
            this.stats.misses++;
            this.updateHUD();
            this.rounds++;
            if (this.rounds === 3 || this.stats.lives <= 0) {
                this.endGame(false); // Encerra o jogo como derrota
            } else {
                this.displayAttemptsRemaining();
                setTimeout(() => {
                    this.startRound();
                }, 2000); // Aguarda 2 segundos antes de iniciar a próxima rodada
            }
        }
    }

    displayAttemptsRemaining() {
        const countdown = document.getElementById('countdown');
        countdown.classList.remove('hidden');
        countdown.textContent = `Rodada ${this.rounds}/3 - Tentativas Restantes: ${this.stats.lives}`;
        setTimeout(() => {
            countdown.classList.add('hidden');
        }, 1500); // Exibe a mensagem por 1,5 segundos
    }

    updateHUD() {
        document.getElementById('score').textContent = this.stats.score;
        document.getElementById('lives').textContent = this.stats.lives;
    }

    endGame(isVictory) {
        this.isPlaying = false;
        this.isGameStarted = false; // Reseta o estado do jogo
        document.getElementById('gameOver').classList.remove('hidden');
        document.getElementById('hits').textContent = this.stats.hits;
        document.getElementById('misses').textContent = this.stats.misses;
        document.getElementById('finalScore').textContent = this.stats.score;
        if (isVictory) {
            document.getElementById('gameOver').querySelector('h2').textContent = 'Você Ganhou!';
        } else {
            document.getElementById('gameOver').querySelector('h2').textContent = 'Fim de Jogo!';
        }
    }

    toggleAdminPanel() {
        this.isPaused = !this.isPaused; // Alterna o estado de pausa
        const adminPanel = document.getElementById('adminPanel');
        adminPanel.classList.toggle('hidden');
        if (!this.isPaused) {
            clearInterval(this.intervalId); // Limpa o intervalo atual
            this.moveLight(); // Reinicia a movimentação da luz ao sair do modo de pausa
        }
    }

    showStartMenu() {
        document.getElementById('startMenu').classList.remove('hidden');
    }

    hideStartMenu() {
        document.getElementById('startMenu').classList.add('hidden');
        document.getElementById('gameContainer').classList.remove('hidden');
    }
}

// Inicializa o jogo
const game = new Game();
