//My audio element
var audio = new Audio("ppgbg.mp3");
$(document).ready(function () {
    //Code for volume down

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
        $(this).appendTo(".fightSection");
        for (var i = 0; i < characters.length; ++i) {
            if (defender === characters[i].name) {
                defenderIndex = i;
                console.log("Defender: " + JSON.stringify(characters[defenderIndex]));
                console.log("Defender: " + characters[defenderIndex].name);
            }
        };
    });

    $(".attack").on("click", function () {
        setTimeout(defenderAttacks, 1000);
        setTimeout(attackerAttacks, 1000);
        function defenderAttacks() {
            characters[attackerIndex].healthPoints -= characters[defenderIndex].counterAttackPoints;
            console.log(characters[attackerIndex].healthPoints);
            $("#display").text(defender + " attacked you for " + characters[defenderIndex].attackPoints + " points. Your current health is " + characters[attackerIndex].healthPoints);
            $(".imageTextScore",".imageContainer",".fightSection").text(characters[attackerIndex].healthPoints);
            if (characters[attackerIndex].healthPoints <= 0) {
                $("#display").empty();
                $(".restart").show();
                $("#display").text("You Lost! Click on the restart button to start a new game.");
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                $(".fightSection").detach();
                $("#display").empty();
                $("#display").text("You Won! Click on another character to continue the game.");
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
            characters[defenderIndex].healthPoints -= characters[attackerIndex].counterAttackPoints;
            characters[attackerIndex].attackPoints += characters[attackerIndex].attackPoints;
            console.log(characters[defenderIndex].healthPoints);
            $("#display").text("You attacked defender for " + characters[attackerIndex].attackPoints + " points.");
            $(".imageTextScore",".imageContainer",".yourCharacter").text(characters[defenderIndex].healthPoints);
            if (characters[attackerIndex].healthPoints <= 0) {
                $("#display").empty();
                $(".restart").show();
                $("#display").text("You Lost! Click on the restart button to start a new game.");
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                $(".fightSection").detach();
                $("#display").empty();
                $("#display").text("You Won! Click on another character to continue the game.");
            }
        }

    });

    $(".restart").on("click", function () {

    });
});
