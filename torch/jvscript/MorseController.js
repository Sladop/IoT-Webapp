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


}