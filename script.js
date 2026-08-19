let pieces = 0;

const puzzlePieces = document.querySelectorAll(".piece");

const scannerContainer = document.getElementById("scanner");
const scanButton = document.getElementById("scanButton");
const result = document.getElementById("result");

let scanner = null;
let scanning = false;


// ------------------------------------
// OPEN CAMERA
// ------------------------------------

scanButton.addEventListener("click", function () {

    if (scanning) {
        return;
    }

    scannerContainer.style.display = "block";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: 250
        },

        onScanSuccess,

        onScanFailure
    );

    scanning = true;

});


// ------------------------------------
// QR SUCCESS
// ------------------------------------

function onScanSuccess(decodedText) {

    console.log("QR detected:", decodedText);

    // Stop camera

    scanner.stop().then(function () {

        scanner.clear();

        scannerContainer.style.display = "none";

        scanning = false;

    });


    // Check which QR was scanned

    if (decodedText === "CAMPUS_PIECE_01") {

        unlockPiece(0);

    }

    else if (decodedText === "CAMPUS_PIECE_02") {

        unlockPiece(1);

    }

    else if (decodedText === "CAMPUS_PIECE_03") {

        unlockPiece(2);

    }

    else if (decodedText === "CAMPUS_PIECE_04") {

        unlockPiece(3);

    }

    else if (decodedText === "CAMPUS_PIECE_05") {

        unlockPiece(4);

    }

    else if (decodedText === "CAMPUS_PIECE_06") {

        unlockPiece(5);

    }

    else {

        result.textContent = "❌ Wrong QR code!";

    }

}


// ------------------------------------
// UNLOCK PUZZLE PIECE
// ------------------------------------

function unlockPiece(pieceNumber) {

    // Don't unlock the same piece twice

    if (puzzlePieces[pieceNumber].textContent === "🧩") {

        result.textContent = "You already found this piece!";

        return;
    }

    puzzlePieces[pieceNumber].textContent = "🧩";

    pieces++;

    document.getElementById("counter").textContent =
        pieces + " / 6 pieces found";

    result.textContent = "🎉 You found a piece!";


    if (pieces === 6) {

        result.textContent = "🎉 YOU FOUND ALL THE PIECES!";

    }

}


// ------------------------------------
// QR SCAN FAILURE
// ------------------------------------

function onScanFailure(error) {

    // Nothing needs to happen here.

}