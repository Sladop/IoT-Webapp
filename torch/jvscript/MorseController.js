/*
    Alle Funktionen zur Morsecode-Berechnung.
 */
export class MorseController {

    //Strobe Interval Bool
    #strobeInterval;

    constructor(track) {

        this.isActive = false;
        this.track = track;

        // Morsecoder Alphabet
        this.morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
            'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..',
            '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', '0': '-----',
        };

    }

    // Toggle Button für die Lampe.
    toggleTorch() {
        this.track.applyConstraints({
            advanced: [{torch: !this.isActive}]
        });
        this.isActive = !this.isActive;
    }

    // Stribe Button für die Lampe
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
            }, 500);
        }
    }

    //Sos Signal senden
    async sos() {
        const shortSignal =200; // 200ms für kurze Signale
        const longSignal = 600;  // 600ms für lange Signale
        const betweenSignals = 200; // Pause zwischen Signalen
        const betweenLetters = 600; // Pause zwischen Buchstaben

        //Deaktiviere Lampe falls an.
        if(this.isActive) {
            this.toggleTorch();
        }

        // Sendet Signal für eine Zeit
        const signal = async (duration) => {
            this.toggleTorch();
            await new Promise(resolve => setTimeout(resolve, duration));
            this.toggleTorch();
            await new Promise(resolve => setTimeout(resolve, betweenSignals));
        };

        // Sende S
        for (let i = 0; i < 3; i++) {
            await signal(shortSignal);
        }

        // Paus
        await new Promise(resolve => setTimeout(resolve, betweenLetters));

        // Sende O
        for (let i = 0; i < 3; i++) {
            await signal(longSignal);
        }

        // Pause
        await new Promise(resolve => setTimeout(resolve, betweenLetters));

        // Sende S
        for (let i = 0; i < 3; i++) {
            await signal(shortSignal);
        }
    }

    //Sendet eigene nachrichten per Morsecode
    async morse(text) {

        for (const char of text.toUpperCase()) {
            if (this.morseCode[char]) {
                for (const symbol of this.morseCode[char]) {
                    await this.toggleTorch();
                    await new Promise(resolve => setTimeout(resolve, symbol === '.' ? 200 : 600)); // Punkt: 200ms, Strich: 600ms

                    await this.toggleTorch();
                    await new Promise(resolve => setTimeout(resolve, 200)); // Pause zwischen Symbolen
                }
                await new Promise(resolve => setTimeout(resolve, 600)); // Pause zwischen Buchstaben
            }
        }
    }
}