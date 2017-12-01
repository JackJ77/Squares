      document.querySelector('#red').addEventListener('click', changeColor);
      document.querySelector('#black').addEventListener('click', changeColor);
      document.querySelector('#brown').addEventListener('click', changeColor);


        function changeColor() {
            document.getElementById('menu').style.border = '3px solid ' + this.id;
        }

        document.getElementById('account').addEventListener('focusout', function() {
                if(!(/\d{26}/.test(this.value))) {
                    this.style.border = '2px solid red';

                } else {
                    this.style.border = '2px solid green';

                }
        });
        document.getElementById('pesel').addEventListener('focusout', function() {
                if(!(/\d{11}/.test(this.value))) {
                    this.style.border = '2px solid red';

                } else {
                    this.style.border = '2px solid green';

                }
        });
        document.getElementById('date').addEventListener('focusout', function() {
                if(!(/^(0[1-9]|[12]\d|3[0-1])-(0[1-9]|1[0-2])-(19\d\d|200\d|201[0-7])$/.test(this.value))) {
                    this.style.border = '2px solid red';
                } else {
                    this.style.border = '2px solid green';

                }
        });
        document.getElementById('email').addEventListener('focusout', function() {
                if(!(/\w+@\w+\.\D+/.test(this.value))) {
                    this.style.border = '2px solid red';

                } else {
                    this.style.border = '2px solid green';

                }
        });

//-------GAME-----------

(function() {


  var vars = {
      time: 0,
      squares: 22,
      count: 0,
      backSq: false,
  };

  function init() {
      vars.time = 40;
      vars.count = 0;
      vars.backSq = false;

      document.getElementById('game').innerHTML = '<div class="timer"></div>';


      var timer = setInterval(function() {
        vars.time -= 1;
        document.querySelector('.timer').innerHTML = vars.time;
        if(vars.time <= 0) {
          document.querySelector('.timer').innerHTML = 0;
          document.querySelector('#game').innerHTML +=
          '<div class="game-over">Game over<button class="btn new-game">TRY AGAIN</button></div>';
          newGame();
        }

        if(vars.count === vars.squares) {
          document.querySelector('#game').innerHTML +=
          '<div class="game-over">You won!<button class="btn new-game">NEW GAME</button></div>';
          newGame();
        }

        if((vars.count === vars.squares) || (vars.time <= 0)) {
            clearInterval(timer);
        }
      }, 1000);

      for(var i = 0; i < vars.squares; i++) {
          document.getElementById('game').insertAdjacentHTML('afterbegin', '<div class="kwadrat"></div>');

          if(i == Math.floor(vars.squares/2) ) {
              document.getElementById('game').insertAdjacentHTML('afterbegin', '<div class="kwadrat-a"></div>');
          }

          document.querySelector('.kwadrat').style.margin = Math.floor((Math.random() * 50) + 10) + 'px';
      }

      var kwadraty = document.querySelectorAll('.kwadrat');

      kwadraty.forEach(function(el) {
            return el.addEventListener('mouseover', onSquare);
          });

      document.querySelector('.kwadrat-a').addEventListener('mouseout', outSquare);
  }

  function newGame() {
    document.querySelector('.new-game').addEventListener('click', function() {
        init();
    });
  }

  function onSquare() {
      if(vars.backSq) {
              this.style.backgroundColor = 'green';
              vars.count += 1;
              vars.backSq = false;

              this.removeEventListener('mouseover', onSquare);
              this.addEventListener('mouseover', function() {
                  vars.time -= 5;
              });
      }
  }

  function outSquare() {
      vars.backSq = true;
  }

init();

})();
