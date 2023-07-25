
// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('word-form');
//     const resultDiv = document.getElementById('result');
//     const timerDiv = document.getElementById('timer');
//     let score = 0;
//     let secondsLeft = 60; // Set the initial time limit

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         if (secondsLeft <= 0) {
//             resultDiv.innerHTML = "Time's up! Game over.";
//             return;
//         }

//         const word = document.getElementById('word-input').value.toLowerCase();
//         fetch('/check-word', {
//             method: 'POST',
//             body: JSON.stringify({ word: word }),
//             headers: { 'Content-Type': 'application/json' }
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.result === "ok") {
//                 const wordLength = word.length;
//                 score += wordLength;
//                 updateScore(score);
//                 resultDiv.innerHTML = "Nice word!";
//             } else {
//                 resultDiv.innerHTML = data.result;
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     });

//     function updateScore(newScore) {
//         document.getElementById("score").innerText = "Score: " + newScore;
//     }

//     function updateTimer() {
//         secondsLeft--;
//         timerDiv.innerText = "Time left: " + secondsLeft + "s";
//         if (secondsLeft <= 0) {
//             clearInterval(timerInterval); // Stop the timer when 60 seconds are up
//             form.removeEventListener('submit', handleFormSubmit); // Disable form submission
//             resultDiv.innerHTML = "Time's up! Game over.";
//         }
//     }

//     // Start the timer
//     const timerInterval = setInterval(updateTimer, 1000);
// });


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('word-form');
    const resultDiv = document.getElementById('result');
    const timerDiv = document.getElementById('timer');
    const scoreDiv = document.getElementById('score');
    let score = 0;
    let secondsLeft = 60; // Set the initial time limit

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (secondsLeft <= 0) {
            resultDiv.innerHTML = "Time's up! Game over.";
            return;
        }

        const word = document.getElementById('word-input').value.toLowerCase();
        fetch('/check-word', {
            method: 'POST',
            body: JSON.stringify({ word: word }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "ok") {
                const wordLength = word.length;
                score += wordLength;
                updateScore(score);
                resultDiv.innerHTML = "Nice word!";
            } else {
                resultDiv.innerHTML = data.result;
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function updateScore(newScore) {
        scoreDiv.innerText = "Score: " + newScore;
    }

    function updateTimer() {
        secondsLeft--;
        timerDiv.innerText = "Time left: " + secondsLeft + "s";
        if (secondsLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer when 60 seconds are up
            resultDiv.innerHTML = "Time's up! Game over.";

            // Send AJAX request to update the score and number of plays
            const score = parseInt(scoreDiv.innerText.replace("Score: ", ""));
            updateScoreOnServer(score);
        }
    }

    function updateScoreOnServer(score) {
        fetch('/update-score', {
            method: 'POST',
            body: JSON.stringify({ score: score }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed (optional)
        })
        .catch(error => console.error('Error:', error));
    }

    // Start the timer
    const timerInterval = setInterval(updateTimer, 1000);
});
