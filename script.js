$(document).ready(function () {
    let currentPlayer = "X";
    let moves = 0;

    $("#ticTacToeGrid .grid-cell").click(function () {
      if ($(this).text() === "" && !gameOver()) {
        console.log($(this));
        $(this).text(currentPlayer);
        moves++;
        if (checkWinner(currentPlayer)) {
          showAlert(currentPlayer + " Wins!");
          return;
        } else if (moves === 9) {
          showAlert("Draw!");
          return;
        }

        if (currentPlayer === "X") {
          currentPlayer = "O";
        } else {
          currentPlayer = "X";
        }
        $("#turnIndicator").text(currentPlayer + "'s Turn");
      }
    });

    $("#resetButton").click(function () {
      resetGame();
    });

    function resetGame() {
      $("#ticTacToeGrid .grid-cell").text("");
      currentPlayer = "X";
      moves = 0;
      $("#turnIndicator").text("X's Turn");
      $(".alert").alert("close");
    }
    function checkWinner(player) {
        const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], // Rows
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], // Columns
          [0, 4, 8],
          [2, 4, 6], // Diagonals
        ];
        return winPatterns.some(function (pattern) {
          return pattern.every(function (index) {
            return $("#ticTacToeGrid .grid-cell").eq(index).text() === player;
          });
        });
      }

      function showAlert(message) {
        const alertHtml =
          '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
          message +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          "</button></div>";
        $(".container").prepend(alertHtml);
      }

      function gameOver() {
        return $(".alert").length > 0;
      }
    });

  