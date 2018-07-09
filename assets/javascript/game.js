//My audio element
var audio = new Audio("ppgbg.mp3");
audio.volume = 0.5;
var defenderIndex, attackerIndex, attacker, defender, character;
var characters = [{
    name: "PowerPuff Girls",
    healthPoints: 230,
    attackPoints: 13,
    counterAttackPoints: 10,
    tag: "#ppg",
    baseAttackPoints: 8
},
{
    name: "Mojo-jo",
    healthPoints: 150,
    attackPoints: 15,
    counterAttackPoints: 10,
    tag: "#mojojo",
    baseAttackPoints: 5
},
{
    name: "Princess Morbucks",
    healthPoints: 125,
    attackPoints: 10,
    counterAttackPoints: 7,
    tag: "#princess",
    baseAttackPoints: 4
},
{
    name: "Rowdy Ruff Boys",
    healthPoints: 250,
    attackPoints: 20,
    counterAttackPoints: 15,
    tag: "#rrb",
    baseAttackPoints: 10
}
];
var players = [];
for(var i=0; i < characters.length; ++i){
    players.push(i);
}
var flag = true;
$(document).ready(function () {
    //Characters in my game
    $(".yourCharacter").on("click", ".imageContainer", function () {
        $("#display").empty();
        audio.play();
        attacker = $(this).attr("data");
        var siblings = $(this).siblings().removeClass("yourCharacter").remove();
        $(".chooseEnemies").append(siblings);
        initialize();
    });


    $(".chooseEnemies").on("click", ".imageContainer", function () {
        $("#display").empty();
        if (flag) {
            defender = $(this).attr("data");
            character = $(this);
            $(".fightSection").append(character);
            flag = false;
        }
        initialize();
    });


    function initialize() {
        for (var i = 0; i < characters.length; ++i) {
            if (defender === characters[i].name) {
                defenderIndex = i;
            }
            if (attacker === characters[i].name) {
                attackerIndex = i;
            }
        }
    }

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

    $(".attack").on("click", function () {

        if( !$.trim( $('.fightSection').html() ).length) {
            $("#display").html("<h6>No enemies here</h6>");
        }
        else{
            $("#display").empty();
            attackerAttacks();
            defenderAttacks();
            if (characters[attackerIndex].healthPoints <= 0) {
                $("#display").append("<h5>You have been defeated! Click on the restart button to start a new game.</h5>");
                $(".restart").show();
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                $("#display").append("<h5>You have defeated " + defender + ". Click on another character to continue the game.</h5>");
                players.splice( players.indexOf(defenderIndex), 1);
                $(".fightSection").empty();
                flag = true;
                if (players.length === 1) {
                    $("#display").empty();
                    $("#display").html("<h5>You Won! Congratulations!!!</h5>");
                    $(".restart").show();
                }
            }
        }
    });

    function defenderAttacks() {
        console.log(players.length);
        characters[attackerIndex].healthPoints = characters[attackerIndex].healthPoints - characters[defenderIndex].counterAttackPoints;
        $("#display").append("<h5>" + defender + " attacked you back for " + characters[defenderIndex].attackPoints + " damage.</h5>");
        $(characters[attackerIndex].tag).text(characters[attackerIndex].healthPoints);
    }
    function attackerAttacks() {
        characters[defenderIndex].healthPoints = characters[defenderIndex].healthPoints - characters[attackerIndex].attackPoints;
        characters[attackerIndex].attackPoints += characters[attackerIndex].baseAttackPoints;
        $("#display").append("<h5>You attacked " + defender + " for " + characters[attackerIndex].attackPoints + " damage.</h5>");
        $(characters[defenderIndex].tag).text(characters[defenderIndex].healthPoints);
    }
});
