import { MorseController } from './MorseController.js';

//Test browser support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
    //Get the environment camera (usually the second one)
    navigator.mediaDevices.enumerateDevices().then(devices => {

        const cameras = devices.filter((device) => device.kind === 'videoinput');

        if (cameras.length === 0) {
            throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];

        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: camera.deviceId,
                facingMode: ['user', 'environment'],
                height: {ideal: 1080},
                width: {ideal: 1920}
            }
        }).then(stream => {
            const track = stream.getVideoTracks()[0];

            //Create image capture object and get camera capabilities
            const imageCapture = new ImageCapture(track);

            const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
                //let there be light!

                const morseController = new MorseController(track);

                const btn = document.querySelector('#torch');
                btn.addEventListener('click', function(){
                    morseController.sos();
                });

                const toggleBtn = document.querySelector('#toggleTorch');
                toggleBtn.addEventListener('click', function(){
                    morseController.toggleTorch();
                });

                const strobeButton = document.querySelector('#strobeButton');
                strobeButton.addEventListener('click', function(){
                    morseController.strobeTorch();
                });

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