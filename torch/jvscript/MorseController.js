export class MorseController {

    #strobeInterval;
    constructor(track) {
        this.isActive = false;
        this.track = track;
    }

    toggleTorch() {
        this.track.applyConstraints({
            advanced: [{torch: !this.isActive}]
        });
        this.isActive = !this.isActive;
    }

    strobeTorch() {
        if (this.#strobeInterval) {
            clearInterval(this.#strobeInterval);
            this.#strobeInterval = null;

            if(this.isActive) {
                this.toggleTorch();
            }
        } else {
            this.#strobeInterval = setInterval(() => {
                this.toggleTorch();
            }, 500); // Wechselt den Zustand alle 0,5 Sekunden
        }
    }


    async sos() {
        const shortSignal = 300; // 300ms für kurze Signale
        const longSignal = 900;  // 900ms für lange Signale
        const betweenSignals = 300; // Pause zwischen Signalen
        const betweenLetters = 900; // Pause zwischen Buchstaben
        if(this.isActive) {
            this.toggleTorch();
        }

        // Definiert eine Methode, um das Signal für eine bestimmte Zeit zu senden
        const signal = async (duration) => {
            this.toggleTorch();
            await new Promise(resolve => setTimeout(resolve, duration));
            this.toggleTorch();
            await new Promise(resolve => setTimeout(resolve, betweenSignals));
        };

        // Sendet ein "S" in Morsecode: "..."
        for (let i = 0; i < 3; i++) {
            await signal(shortSignal);
        }

        // Pause zwischen den Buchstaben
        await new Promise(resolve => setTimeout(resolve, betweenLetters));

        // Sendet ein "O" in Morsecode: "---"
        for (let i = 0; i < 3; i++) {
            await signal(longSignal);
        }

        // Pause zwischen den Buchstaben
        await new Promise(resolve => setTimeout(resolve, betweenLetters));

        // Wieder ein "S" senden
        for (let i = 0; i < 3; i++) {
            await signal(shortSignal);
        }
    }
}