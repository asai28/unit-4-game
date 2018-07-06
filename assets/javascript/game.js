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
var flag = true;
$(document).ready(function () {
    //Characters in my game
    $(".yourCharacter").on("click", ".imageContainer", function () {
        audio.play();
        attacker = $(this).attr("data");
        console.log(attacker);
        var siblings = $(this).siblings().removeClass("yourCharacter").remove();
        $(".chooseEnemies").append(siblings);
        initialize();
    });


    $(".chooseEnemies").on("click", ".imageContainer", function () {
        if (flag) {
            defender = $(this).attr("data");
            console.log(defender);
            character = $(this);
            $(".fightSection").append(character);
            flag = false;
        }
        initialize();
    });


    function initialize() {
        for (var i = 0; i < characters.length; ++i) {
            console.log("Defender: " + defender);
            console.log("Attacker: " + attacker);
            console.log("Character: " + characters[i].name);
            console.log("Attacker Index: " + attackerIndex);
            console.log("Defender Index: " + defenderIndex);
            if (defender === characters[i].name) {
                defenderIndex = i;
                console.log("Defender: " + characters[defenderIndex].name);
            }
            if (attacker === characters[i].name) {
                attackerIndex = i;
                console.log("Attacker object: " + JSON.stringify(characters[attackerIndex]));
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


    var intervalId;
    $(".attack").on("click", function () {
        
        if (defenderIndex === -1) {
            setTimeout(function () { $("#display").html("<h6>No enemies here</h6>") }, 1000);
        }
        // else {

            $("#display").empty();
             
            if (characters[attackerIndex].healthPoints <= 0) {
                console.log("I am set attacker lost true.");
                $("#display").append("<h5>You have been defeated! Click on the restart button to start a new game.</h5>");
                $(".restart").show();
            }
            else if (characters[defenderIndex].healthPoints <= 0) {
                console.log("I am set defender lost true.");
                    $("#display").append("<h5>You have defeated " + defender + " .Click on another character to continue the game.</h5>");
                    defenderIndex = -1;
                    $(".fightSection").empty();
                    console.log($(".fightSection").html());
                    flag = true;
                    if( $('.chooseEnemies:empty').length === 0 ) {
                    $("#display").empty();
                    $("#display").html("<h5>You Won! Congratulations!!!</h5>");
                }
            }
            else{
                setTimeout(attackerAttacks, 1000);
                setTimeout(defenderAttacks, 1000);
            }
        // }
        

    });

    function defenderAttacks() {
        characters[attackerIndex].healthPoints = characters[attackerIndex].healthPoints - characters[defenderIndex].counterAttackPoints;
        console.log(characters[attackerIndex].healthPoints);
        $("#display").append("<h5>" + defender + " attacked you back for " + characters[defenderIndex].attackPoints + " damage.</h5>");
        $(characters[attackerIndex].tag).text(characters[attackerIndex].healthPoints);
        
        // if (characters[attackerIndex].healthPoints <= 0) {
        //     $("#display").empty();
        //     $(".restart").show();
        //     $("#display").html("<h5>You Lost! Click on the restart button to start a new game.</h5>");
        // }
        // else if (characters[defenderIndex].healthPoints <= 0 && $(".chooseEnemies").empty) {
        //     $("#display").empty();
        //     $("#display").html("<h5>You Won! Congratulations!!!</h5>");
        // }
        // else if (characters[defenderIndex].healthPoints <= 0) {
        //     //$(".fightSection").empty();
        //     $(".fightSection").detach(".imageContainer");
        //     $("#display").empty();
        //     $("#display").html("<h5>You have defeated " + defender + " .Click on another character to continue the game.</h5>");

        // }
    }
    function attackerAttacks() {
        console.log("AttackPoints: " + characters[attackerIndex].attackPoints);
        characters[defenderIndex].healthPoints = characters[defenderIndex].healthPoints - characters[attackerIndex].attackPoints;
        characters[attackerIndex].attackPoints += characters[attackerIndex].baseAttackPoints;
        console.log(characters[defenderIndex].healthPoints);
        $("#display").append("<h5>You attacked " + defender + " for " + characters[attackerIndex].attackPoints + " damage.</h5>");
        $(characters[defenderIndex].tag).text(characters[defenderIndex].healthPoints);
        // if (characters[attackerIndex].healthPoints <= 0) {
        //     $("#display").empty();
        //     $(".restart").show();
        //     $("#display").html("<h5>You have been defeated! Click on the restart button to start a new game.</h5>");
        // }
        // else if (characters[defenderIndex].healthPoints <= 0) {
        //     $(".fightSection").detach(".imageContainer");
        //     $("#display").empty();
        //     $("#display").html("<h5>You have defeated " + defender + " .Click on another character to continue the game.</h5>");
        //     flag = true;
        // }
    }



    $(".restart").on("click", function () {

    });
});
