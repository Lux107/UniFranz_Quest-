const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {

    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    showTextPopup(
        "⚠️ ¡Advertencia!\n\n" +
        "No recargues ni cierres esta página.\n\n" +
        "Si lo haces, podrías perder tu progreso actual.\n\n" +
        "Asegúrate de terminar tu proceso antes de salir."
    );

});