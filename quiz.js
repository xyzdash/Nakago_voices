// CSVファイルから問題を読み込む
var questions = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var csvData = this.responseText;
		var lines = csvData.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var questionData = lines[i].split(",");
			if (questionData.length == 2) {
				questions.push(questionData);
			}
		}
	}
};
xmlhttp.open("GET", "./quiz.csv", false);
xmlhttp.send();

// クイズの状態
function submitAnswer() {
  // ユーザーが入力した回答を取得
  const userAnswer = document.getElementById("answer").value;

  // 正誤を判定してメッセージを表示
  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    // 正解の場合
    score++;
    document.getElementById("message").innerHTML = "正解です！";
  } else {
    // 不正解の場合
    document.getElementById("message").innerHTML = `不正解です。正解は「${currentQuestion.answer}」でした。`;
  }

  // 次の問題を出題する
  loadQuestion();
}

function showResults() {
  // 得点と正答率を計算
  const totalQuestions = questions.length;
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);

  // 結果を表示
  const message = `
    <h2>クイズ終了！</h2>
    <p>あなたの得点は ${correctAnswers} / ${totalQuestions} です。</p>
    <p>正答率は ${percentage}% でした。</p>
    <p>正解数： ${correctAnswers}</p>
    <p>不正解数： ${incorrectAnswers}</p>
  `;
  document.getElementById("quiz").innerHTML = message;
}

if (currentQuestionIndex === questions.length) {
  // クイズが終了した場合
  showResults();
} else {
  // 次の問題を出題する
  loadQuestion();
}

const restartButton = `
  <button onclick="location.reload()">もう一度受ける</button>
`;
document.getElementById("quiz").innerHTML += restartButton;
