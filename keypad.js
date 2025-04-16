function handleAnswer(button, isCorrect) {
  const buttons = document.querySelectorAll(".choice-button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn === button && isCorrect) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("incorrect");
    }
  });

  document.getElementById("feedback").textContent = isCorrect ? "Correct!" : "";
  document.activeElement.blur(); // 👈 iPad fix

  if (isCorrect) correctAnswers++;
  questionsAnswered++;

  if (questionsAnswered >= totalQuestions) {
    setTimeout(endGame, 1500);
  } else {
    setTimeout(() => {
      document.getElementById("feedback").textContent = "";
      generateQuestion();
    }, 1500);
  }
}
