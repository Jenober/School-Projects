// Name: Houston Bennett
// Date: 11/29/2012
// Assignment: Deliverable 2
// Description: Kolbold Arena!


// Player Variables
var playerName = "Grok",
    playerHP = 100,
    playerStr = 15,
    arenaDays = 0
;
// Monster Variables
var mobName = ["Giant Rat", "Gnoll","Dire Bear","Dragon"],
    mobHP = [5,15,50,200],
    mobStr = [1,10,15,20]
    mobCount = mobName.length;
;

// String function  (String concatenation)
var getEnding = function (ending) {
    if (ending = "sad"){
        console.log("Sad Ending!")
    }
    else
        {
             console.log("Happy Ending!")
        };


};
// Procedure
var preBattle = function (mobsLeft) {

    if (mobsLeft > 0) {
        playerHP == 100;
        arenaDays ++;
        mobsLeft--;
        console.log("Another day, another victory. You have been here for: "+ arenaDays + " days.")
        console.log("You are rested and equipped for combat " + playerName + ".");
        console.log("Steel your nerves for you are about to enter the Arena!");
        console.log("");
        console.log(mobsLeft);
        return mobsLeft;
    }
    else {
        console.log("You have defeated all the monsters in the Arena.");
        getEnding(happy);
    }

};
// Number function (While-loop)
var battleFunc = function (mobName, mobHP, mobStr, playerName, playerHP, playerStr, mobsLeft) {

    while (mobHP > 1){

        console.log(playerName + " hits " + mobName + " for " + playerStr + " damage!");
        mobHP-=playerStr;

        if (mobHP > 1){

            console.log(mobName + " has only " + mobHP + "HP left!");
            console.log(mobName + " hits " + playerName + " for " + mobStr + " damage!");
            playerHP -= mobStr;
            if (playerHP > 1){
                console.log(playerName + " has only " + playerHP + "HP left!");
                console.log("Will " + playerName + " be able to handle much more?!");
                console.log("");

            }
            else{

                isItOver(true,mobCount);
            }
        }
        else {

            console.log(playerName + " has defeated the " + mobName + "!");

            isItOver(false,mobCount);
        };

    };
    return(mobName, mobHP, mobStr, playerName, playerHP, playerStr);


};
// Boolean function (Comparison)
var isItOver = function (grokDead,mobsLeft) {

    if ((grokDead == false) && (mobsLeft > 0))  {


          preBattle(mobsLeft);

    }
    else {
           console.log("You fought bravely, " + playerName +", but the arena was too much for you.");
           console.log("You have died, leaving " + mobsLeft + " monsters for the next guy.");
           getEnding("sad");
           return;
    };

};
//Array function
var nextMob = function (mobsLeft) {

    for (var i = 0, j = mobsLeft; i < j; i++ ) {

           battleFunc(mobName[i],mobHP[i],mobStr[i],playerName,playerHP,playerStr,j);
    };
};


mobCount = preBattle(mobCount);

nextMob(mobCount);








