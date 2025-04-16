function getInitialsFromBoxes() {
  const chars = [];
  let allFilled = true;
  for (let i = 0; i < 3; i++) {
    const box = document.getElementById(`initial-${i}`);
    const char = box.value.toUpperCase();
    if (char.length === 1 && /^[A-Z]$/.test(char)) {
      box.classList.add("correct");
      chars.push(char);
    } else {
      box.classList.remove("correct");
      allFilled = false;
    }
  }
  return allFilled ? chars.join('') : null;
}

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 3; i++) {
    const box = document.getElementById(`initial-${i}`);
    box.addEventListener("input", () => {
      if (box.value.trim().length === 1) {
        box.classList.add("correct");
        if (i < 2) {
          document.getElementById(`initial-${i + 1}`).focus();
        } else {
          document.getElementById("student-comments").focus();
        }
      } else {
        box.classList.remove("correct");
      }
    });
  }
});

function endGame() {
  const time = Math.floor((new Date() - startTime) / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const elapsedStr = `${minutes}m${seconds}s`;
  window.elapsedStr = elapsedStr;

  document.getElementById("summary-again").textContent =
    `You got ${correctAnswers} out of ${totalQuestions} correct. Time: ${elapsedStr}`;

  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("equation-buttons").classList.add("hidden");
  document.getElementById("turn-in-screen").classList.remove("hidden");
  document.getElementById("initial-0").focus();
}

function submitResults(payload) {
  const initials = getInitialsFromBoxes();
  if (!initials) return alert("Please enter 3 letters.");
  payload.initials = initials;
  payload.comments = document.getElementById("student-comments").value.trim();

  const submitButton = document.querySelector("#turn-in-screen button");
  submitButton.style.display = "none";
  document.getElementById("submit-status").textContent = "Sending...";

  fetch("https://script.google.com/macros/s/AKfycbwsvj0ijlKGeWOIu80EobVDJks24Dw0ziwl9aY_AVJImmhRJ0MQnAJwmuBpe1NYmPzr/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "text/plain" }
  })
    .then(res => res.text())
    .then(res => {
      document.getElementById("submit-status").textContent = "Submitted successfully! 🎉";
      document.getElementById("play-again-btn").style.display = "inline-block";
    })
    .catch(err => {
      document.getElementById("submit-status").textContent = "Error: " + err;
    });
}
