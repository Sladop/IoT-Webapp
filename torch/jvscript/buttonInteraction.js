document.addEventListener('DOMContentLoaded', function() {
    // Warte, bis das DOM vollständig geladen ist


    const flashlightController = new FlashlightController();

    // Funktion für Button 1
    function handleTorchButton(event) {
        console.log('Button 1 wurde geklickt!');

        flashlightController.toggleTorch();
    }

    // Funktion für Button 2
    function handleStrobButton(event) {
        console.log('Button 2 wurde geklickt!');
    }

    // Buttons mit der Klasse "functionButton" auswählen und Event-Listener hinzufügen
    var functionButton = document.getElementsByClassName('functionButton');

    for (var i = 0; i < functionButton.length; i++) {
        functionButton[i].addEventListener('click', function(event) {
            // Überprüfen, welcher Button geklickt wurde
            if (event.target.id === 'torchButton') {
                handleTorchButton();
            } else if (event.target.id === 'strobButton') {
                handleStrobButton();
            }
        });
    }
});
