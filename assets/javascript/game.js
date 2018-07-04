//My audio element
var audio = new Audio("ppgbg.mp3");
$(document).ready(function () {
    function defenderAttacks(){};
    //Characters in my game
    var attacker, defender;
    var characters = [ppg = {
        name: "PowerPuff Girls",
        healthPoints: 200,
        attackPoints: 25,
        counterAttackPoints: 20,
        tag: "#ppg"
    },
    mj = {
        name: "Mojo-jo",
        healthPoints: 150,
        attackPoints: 15,
        counterAttackPoints: 12,
        tag: "#mojojo"
    },
    pm = {
        name: "Princess Morbucks",
        healthPoints: 125,
        attackPoints: 10,
        counterAttackPoints: 8,
        tag: "#princess"
    },
    rrb = {
        name: "Rowdy Ruff Boys",
        healthPoints: 250,
        attackPoints: 20,
        counterAttackPoints: 15,
        tag: "#rrb"
    }
    ];

    $(".yourCharacter").on("click", ".imageContainer", function () {
        audio.play();
        attacker = $(this).attr("data");
        var siblings = $(this).siblings().removeClass("yourCharacter").detach();
        $(".chooseEnemies").append(siblings);
        for (var i = 0; i < characters.length; ++i) {
            if (attacker === characters[i].name) {
                attackerIndex = i;
                console.log("Attacker object: " + JSON.stringify(characters[attackerIndex]));
            }
        }
    });

    $(".restart").hide();

    $(".fa-music").on("click", function () {
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }

    });

    $(".fa-volume-up").on("click", function () {
        if (audio.volume < 1.0) {
            audio.volume += 0.1;
        }
    });

    $(".fa-volume-down").on("click", function () {
        if (audio.volume > 0) {
            audio.volume -= 0.1;
        }
    });


    $(".chooseEnemies").on("click", ".imageContainer", function () {
        defender = $(this).attr("data");
        console.log(defender);
        siblings = $(this).siblings();
        $(this).siblings().css("pointer-events", "none");
        $(this).appendTo(".fightSection");
        for (var i = 0; i < characters.length; ++i) {
            if (defender === characters[i].name) {
                defenderIndex = i;
                console.log("Defender: " + JSON.stringify(characters[defenderIndex]));
                console.log("Defender: " + characters[defenderIndex].name);
            }
        };
        defenderAttacks();
        //siblings.css("pointer-events", "auto");
    });
    var intervalId;
    $(".attack").on("click", function () {
        $("#display").empty();
        function displayEmpty(){
            if($("#display").empty){
            $("#display").prepend("No enemy here.");
            intervalId = setInterval(displayEmpty, 4* 1000);
        }
        if($("#display1","#display2").empty === false){
            clearInterval(intervalId);
        }
        }
            
        
        setTimeout(defenderAttacks, 1000);
        setTimeout(attackerAttacks, 1000);
        function defenderAttacks() {
            characters[attackerIndex].healthPoints -= characters[defenderIndex].attackPoints;
            console.log(characters[attackerIndex].healthPoints);
            $("#display").prepend("<h5>"+defender + " attacked you for " + characters[defenderIndex].attackPoints + " points. Your current health is " + characters[attackerIndex].healthPoints+"</h5>");
            
            if (characters[attackerIndex].healthPoints <= 0) {
                $("#display").empty();
                $(".restart").show();
                $("#display").prepend("<h5>You Lost! Click on the restart button to start a new game.</h5>");
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                $(".fightSection").detach();
                $(".chooseEnemies",".imageContainer").unbind("click",false)
                $("#display").empty();
                $("#display").prepend("<h5>You Won! Click on another character to continue the game.</h5>");
                $(".chooseEnemies").on("click", ".imageContainer", function () {
                    defender = $(this).attr("data");
                    $(this).appendTo(".fightSection");
                    for (var i = 0; i < characters.length; ++i) {
                        if (defender === characters[i].name) {
                            defenderIndex = i;
                            console.log("Defender: " + JSON.stringify(characters[defenderIndex]));
                            console.log("Defender: " + characters[defenderIndex].name);
                        }
                    };
                });
            }
        }
        function attackerAttacks() {
            console.log("AttackPoints: "+ characters[attackerIndex].attackPoints);
            characters[defenderIndex].healthPoints -= characters[attackerIndex].attackPoints;
            characters[attackerIndex].attackPoints += 5;
            console.log(characters[defenderIndex].healthPoints);
            $("#display").prepend("<h5>You attacked "+ defender+ " for " + characters[attackerIndex].attackPoints + " points.</h5>");
            
            if (characters[attackerIndex].healthPoints <= 0) {
                $("#display").empty();
                $(".restart").show();
                $("#display").prepend("<h5>You have been defeated! Click on the restart button to start a new game.</h5>");
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                $(".fightSection").detach();
                $("#display").empty();
                $("#display").prepend("<h5>You have defeated "+ defender+ " .Click on another character to continue the game.</h5>");
            }
        }

    });

    $(".restart").on("click", function () {

    });
});
