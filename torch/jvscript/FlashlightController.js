class FlashlightController {
    #toggle = false;
    constructor() {
        // Überprüfen, ob die 'torch' API verfügbar ist
        this.isTorchSupported = 'torch' in navigator;
    }

    #activateFlashlight() {
        if (this.isTorchSupported) {
            navigator.torch.request().then(() => {
                console.log('Taschenlampe aktiviert');
            }).catch((error) => {
                console.error('Fehler beim Aktivieren der Taschenlampe:', error);
            });
        } else {
            console.warn('Die Taschenlampenfunktion wird von diesem Browser nicht unterstützt.');
        }
    }

    #deactivateFlashlight() {
        if (this.isTorchSupported) {
            navigator.torch.release().then(() => {
                console.log('Taschenlampe deaktiviert');
            }).catch((error) => {
                console.error('Fehler beim Deaktivieren der Taschenlampe:', error);
            });
        } else {
            console.warn('Die Taschenlampenfunktion wird von diesem Browser nicht unterstützt.');
        }
    }

    toggleTorch() {
        if(this.#toggle) {
            this.#deactivateFlashlight();
            this.#toggle = false;
            console.log('Deaktiviert!');
        } else {
            this.#activateFlashlight();
            this.#toggle = true;
            console.log('Aktiviert!');
        }
    }


}