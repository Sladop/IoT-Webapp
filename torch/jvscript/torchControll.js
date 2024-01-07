/*
    Alle funktionen zur Kamera/Torch Interaktion.
 */
import { MorseController } from './MorseController.js';

//Testet Browser Support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
    //Umgebungskamera
    navigator.mediaDevices.enumerateDevices().then(devices => {

        const cameras = devices.filter((device) => device.kind === 'videoinput');

        if (cameras.length === 0) {
            throw 'Keine kamera gefunden!';
        }
        const camera = cameras[cameras.length - 1];

        // Stream & Videotrack
        navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: camera.deviceId,
                facingMode: ['user', 'environment'],
                height: {ideal: 1080},
                width: {ideal: 1920}
            }
        }).then(stream => {
            const track = stream.getVideoTracks()[0];

            const imageCapture = new ImageCapture(track);

            const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

                const morseController = new MorseController(track);


                //SOS Button
                const btn = document.querySelector('#torch');
                btn.addEventListener('click', function(){
                    morseController.sos();
                });

                //Torch Toggle Button
                const toggleBtn = document.querySelector('#toggleTorch');
                toggleBtn.addEventListener('click', function(){
                    morseController.toggleTorch();
                });

                //Strobe Button
                const strobeButton = document.querySelector('#strobeButton');
                strobeButton.addEventListener('click', function(){
                    morseController.strobeTorch();
                });

                //Morsecodeberechnung Button
                const doMorseCalcBtn = document.querySelector('#doMorseCalcBtn');
                doMorseCalcBtn.addEventListener('click', function() {

                    morseController.morse(
                        document.getElementById('morseBtn').value
                    );
                })
            });
        });
    });
}