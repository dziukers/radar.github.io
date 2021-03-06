var click = 0;
var view = {
    
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
        
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    displayImage: function(ballsFound){
                  
        var homero = document.getElementById("homero");
        
        switch(ballsFound){
             case 1:
            homero.style.animation = "animhomero1 3s linear forwards";break; 
            case 2:
            homero.style.animation = "animhomero2 3s linear forwards";
            this.displayMessage("Znalazłeś 2 smoczą kulę!");  break;
            case 3:
            homero.style.animation = "animhomero3 3s linear forwards";
            this.displayMessage("Znalazłeś 3 smoczą kulę!"); break;
            case 4:homero.style.animation = "animhomero4 3s linear forwards";break;
            this.displayMessage("Znalazłeś 4 smoczą kulę!");  break;
            case 5:
            homero.style.animation = "animhomero5 3s linear forwards";
            this.displayMessage("Znalazłeś 5 smoczą kulę!"); break;
            case 6:
            homero.style.animation = "animhomero6 3s linear forwards";
            this.displayMessage("Znalazłeś 6 smoczą kulę!"); break;
            case 7:
            var container = document.getElementById("black");
            var message = document.getElementById("messageArea");
                 var src = document.getElementById("x");
                        this.displayMessage("Gratulacje zdobyłeś 7 smoczych kul przy " + controller.guesses + " próbach.");
                        black.style.zIndex ="10";
                    message.style.animation = "shenron 4s linear forwards";
                       message.style.color = "white";
                       src.style.animation = "shenron 4s linear forwards";
                    black.style.animation = "black 4s linear forwards";
                       
                       var shenlong = document.createElement("img");
                       shenlong.src = "shenron.png";

                       src.appendChild(shenlong);break;
         }
    }
}
    
var model = {
        boardSize:7,
        numBalls: 7,
        ballsLength:1,
        ballsFound: 0,
        generateBallLocations: function(){

            for (var i = 0; i < this.numBalls; i++) {
                var row;
                var col;
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * this.boardSize);
                var location = (row + "" + col);
                
                    while (this.collision(location)){                             
                    this.locations[i] = location;
        }     
        }},  
        collision: function(location){
                for (var i = 0; i < this.locations.length;i++){
                    if (this.locations.indexOf(location) >= 0) {
                        return false;
                    }
                } return true;
        },
            
            locations: ["00","20","30","40","50","60","10"],
            hits: ["","","","","","",""],
            guessing: function(guess){
            
            for (var i = 0; i < this.numBalls; i++){
                var ball = this.locations[i];
                var index = ball.indexOf(guess);
                if (index >= 0) {
                        if(this.hits[i]=== "hit"){
                            view.displayMessage("Przecież masz już tę kulę");
                            var frieza = document.getElementById("frieza");
                            frieza.style.animation = "anim 5s linear";
                            return false;
                        }
                    this.hits[i] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("Znalazłeś smoczą kulę :O");
                    this.ballsFound++;
                    view.displayImage(this.ballsFound);
  
                return true;}
            }
                  
                view.displayMiss(guess);
                view.displayMessage("Szukaj dalej!");
                return false;
            }
     
}
    
   
var controller = {
        guesses: 0,
        
        processGuess: function(guess){
            var location = parseGuess(guess);
            if (location) {
                this.guesses++;
                var hit = model.guessing(location);
                
            }
        }
    }
    
    function parseGuess(guess){
        var alphabet = ["A", "B","C","D","E", "F","G"];
        
        if (guess === null || guess.length !== 2){
            alert("Ups, wprowadź literę i cyfrę np. B5");
        } else {
            firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            
            if(isNaN(row) || isNaN(column)) {
                alert("Ups, to nie są współrzędne!");
            } else if (row <0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Ups,pole poza planszą!");
            } else {
                return row + column;
            }
        } return null;
    }

    function init(){
        var findButton = document.getElementById("findButton");
        findButton.onclick = handleFindButton;
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;
        revealBalls();
        model.generateBallLocations();
        console.log(model.locations);

        var Button = document.getElementById("button");
        Button.onclick = onclick;
        
    }

    function onclick() {
        click++;
        var radar = document.getElementById("radar");
        var columns = document.getElementById("define-columns");
        var rows = document.getElementById("define-rows");
        var table = document.getElementById("table");
            if (click == 1){radar.style.backgroundSize = "80%";table.style.width = "31%";table.style.height = "31%";columns.style.width = "31%";columns.style.top = "33%";rows.style.height = "31%";rows.style.left = "32.5%";rows.style.fontSize = "0.8em";return click; }
             else if (click == 2){radar.style.backgroundSize = "120%";table.style.width = "46%";table.style.height = "46%";columns.style.width = "46%";columns.style.top = "24%";rows.style.height = "46%";rows.style.left = "24%";rows.style.fontSize = "1.2em";return click;}
            else if (click == 3){radar.style.backgroundSize = "100%";table.style.width = "39%";table.style.height = "39%";columns.style.width = "39%";columns.style.top = "28%";rows.style.height = "39%";rows.style.left = "28%";rows.style.fontSize = "1em"; click = 0;}
    }

    function handleKeyPress(e) {
        var findButton = document.getElementById("findButton");
        if (e.keyCode === 13) {
            findButton.click();
            return false;
        }
    }
    function handleFindButton(){
        var guessInput = document.getElementById("guessInput");
        var guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
    function revealBalls(){
        
    var kinto = document.querySelector("#kinto");
    var ballsLocation  = document.querySelector(".whereAreBalls")
    var clicked = 0;
    kinto.addEventListener("click", function(){
    clicked++;
    kinto.style.animationPlayState = "paused";
    ballsLocation.style.animationPlayState = "paused";
    if(clicked === 2){
       ballsLocation.textContent = model.locations;
        ballsLocation.style.opacity = "1";     
    }
    else if(clicked === 3){
    kinto.remove();
       ballsLocation.remove();
    }
})}

    window.onload = init;