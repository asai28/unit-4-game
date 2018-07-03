
$(document).ready(function () {
    $(".yourCharacter").on("click", ".imageContainer", function () {
        var audio = $("#myAudio");
        audio.play();
        console.log("hey!");
        var siblings = $(this)
            .siblings()
            .removeClass("yourCharacter")
            .detach();
        $(".chooseEnemies").append(siblings);
    });

    $(".chooseEnemies").on("click", ".imageContainer", function () {
        console.log("hellooooooooo");
        $(this)
            .siblings()
            .appendTo(".fightSection");
        $(this)
            .siblings()
            .detach();
    });
});

//Characters in my game
var ppf = {
    name: "PowerPuff Girls",
    healthPoints: 200,
    attackPoints: 25,
    counterAttackPoints: 25,
    tag: $("#ppg")
};

var mojojo = {
    name: "Mojo-jo",
    healthPoints: 150,
    attackPoints: 15,
    counterAttackPoints: 12,
    tag: $("#mojojo")
};

var pm = {
    name: "Princess Morbucks",
    healthPoints: 125,
    attackPoints: 10,
    counterAttackPoints: 10,
    tag: $("#princess")
};

var rrb = {
    name: "Rowdy Ruff Boys",
    healthPoints: 250,
    attackPoints: 20,
    counterAttackPoints: 15,
    tag: $("#rrb")
};