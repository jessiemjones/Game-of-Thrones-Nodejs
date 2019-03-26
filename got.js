var readline = require("readline-sync");

//enemy creation
function Enemy(name, health = 100){
    this.name = name
    this.attack = Math.floor(Math.random()*10)+7;
    this.health = health;
}
var enemies = [];
var serAmory = new Enemy("Ser Amory Lorch", 999999);
var tickler = new Enemy("The Tickler", 999999)
enemies.push(new Enemy("Frey Soldier", 65),new Enemy("Frey Soldier", 60), new Enemy("Frey Soldier", 120),new Enemy("Frey Soldier", 50),new Enemy("Polliver", 40),new Enemy("Wounded Lannister Soldier", 20),new Enemy("Frey Soldier", 80), new Enemy("Frey Soldier", 100), new Enemy("Frey Soldier", 30), new Enemy("Frey Soldier", 55), new Enemy("Frey Soldier", 120), new Enemy("Frey Soldier", 130), new Enemy("Frey Soldier", 120),new Enemy("Lothar Frey", 350),new Enemy("Meryn Trant", 500),new Enemy("Waif", 750), new Enemy("Rorge", 800), new Enemy("Lord Walder Frey", 900), new Enemy("Littlefinger", 1100), serAmory, tickler)  //


//character creation
function Player (name){
    this.name = name;
    this.weapons = ["stick"]; 
    this.items = []; 
    this.health = 200;
    this.attack = Math.floor(Math.random()*20)+10;
    this.level = 1;  
}
var noOne = new Player ("No One")


//game start.  If answer Y, game is actually over.  If "N", then game continues.
console.log()
var start = readline.keyInYN("Does a girl have a name? ")

if (start === true){
    console.log("If a girl has a name, then she has no place among the Faceless Men. *GAME OVER*")
}else{
    console.log("Valar Dohaeris.  You are now among the Faceless Men.")
    console.log("Your task is to kill everyone on your `little list`.  Each enemy you kill will give you a small health and attack bonus.") 
    var isAlive = true;
}


while(isAlive){ 
    if(enemies.length > 0){
        var action = readline.keyIn("What would you like to do? [ S ] Serve the Many-Faced God , [ I ] Check Inventory, [ L ] Recite your 'Little list', [ Q ] Quit Game ", {limit: 'silq'})
        console.clear();
        if(action === "s"){
            serve();
        }else if (action === "i"){
            checkInventory();   
        }else if (action === "q"){
            console.log("Valar Morghulis. *GAME OVER*")
            isAlive = false;
        }else if (action === "l"){
            console.log("This is the current list of enemies:")
            console.log(enemies)
        }
    }else {
        console.log("You have killed everyone from your list. A girl's name is Arya Stark of Winterfell.  *YOU WIN*")
        isAlive = false;
    }
}

function checkInventory(){
    console.log("Here are your current stats: ")
    console.log(noOne)
}

function serve(){
    var randomChance = Math.floor(Math.random()*100)
    if(randomChance <= 50){  //this means theres a %50 chance to get attacked
        getAttacked();
    } else if(randomChance <= 80){
        console.log("You diligently serve the Many-Faced God by sweeping the floor of the House of Black and White.")
        console.log("*Your health has been slightly increased*")
        noOne.health += 10;
    } else if(randomChance <=95){
        getHelped();
    } else {
        console.log("You spend hours and hours cleaning the bodies in the House of Black and White.");
        console.log("Your health has been slightly increased.");
        noOne.health += 10;
    }
}

function getAttacked(){
    console.log("You were attempting to serve the Many Faced God, but you have crossed paths with: ");
    var enemy = randomEnemy();
    console.log(enemy)
    var action = readline.keyIn("Do you [ F ]fight, or try to [ R ] run? ", {limit: 'fr'})
    if(action === 'r'){
        run(enemy);
    }else if (action === 'f') {
        console.log("You have chosen to fight " + enemy.name + ":")
        while (enemy.health > 0 && noOne.health > 0){
            fight(enemy);
        }if(noOne.health <= 0){
            console.log("Valar Morghulis.  *You are DEAD*")
            isAlive = false;
        }else if(enemy.health <= 0){
            console.log(`You killed ${enemy.name}.`)
            noOne.level += 1;
            noOne.attack += 5;
            noOne.health +=5;
            if (enemy.name === "Polliver"){
                console.log("'A fine little blade.. Maybe I'll pick my teeth with it...'  [Needle] has been added to your inventory.  Your damage is greatly increased.")
                noOne.weapons.push("Needle");
                noOne.attack += 100;
                enemies.splice(enemies.indexOf(enemy), 1);
            }else{
                enemies.splice(enemies.indexOf(enemy), 1);
            }
        }
    }
}

 function randomEnemy(){
    var random = Math.floor(Math.random()*enemies.length)
    return enemies[random]
 }

function run(enemy){ //gives a 50% to take damage when running.
    var random = Math.floor(Math.random()*2)
    if (random === 1){
        noOne.health -= enemy.attack
        console.log(`You get away, but ${enemy.name} strikes you for ${enemy.attack} damage as you flee. `)
        console.log(`Your current health is: ${noOne.health}`)
    } else {
        console.log("You get away unharmed!")

    }
}

 function fight(enemy){
    var randomHit = Math.floor(Math.random()*100)
    if (randomHit <= 50){
        noOne.health -= enemy.attack
        console.log(`${enemy.name} strikes you for ${enemy.attack}`)
        console.log(`Your health is now: ${noOne.health}`)
    } else {
        enemy.health -= noOne.attack
        console.log(`You hit ${enemy.name} for ${noOne.attack}`)
        console.log(`${enemy.name}'s health is now: ${enemy.health}`)
    }
 }

function getHelped(){
    if (tickler.health > 0){
        console.log(tickler);
        var action1 = readline.keyIn("Jaqen H'ghar offers to kill 'The Tickler'.  Would you like him to? [ Y ] Yes [ N ] No     ",{limit: `yn`})
            if (action1 === 'y'){
                console.log("The Tickler is found dead in the courtyard.  A debt has been payed to the Red God.");
                enemies.splice(enemies.indexOf(tickler),1);
                tickler.health = 0;

            } else{
                noOne.health -= tickler.attack;
                console.log(`${tickler.name} strikes you for ${tickler.attack}`);
                console.log(`Your health is now: ${noOne.health}`);
            }
    }else if (serAmory.health > 0){
        console.log(serAmory);
        var action2 = readline.keyIn("Jaqen H'ghar offers to kill another man.  Would you like to give him Ser Amory's name?[ Y ] Yes [ N ] No   ", {limit: `yn`})
            if (action2 === 'y'){
                console.log("Ser Amory collapses and dies in front of Tywinn Lanister.  A poison dart is found in his neck.  A debt has been payed to the Red God.")
                enemies.splice(enemies.indexOf(serAmory),1);
                serAmory.health = 0;
            } else{
                noOne.health -= serAmory.attack;
                console.log(`${serAmory.name} strikes you for ${serAmory.attack}`);
                console.log(`Your health is now: ${noOne.health}`);
            }
    }else if (noOne.items.length < 1) {
        var action = readline.keyIn("A man offers a coin to a girl.  Does she accept it? [ Y ] Yes [ N ] No   ", {limit: `yn`})        
            if (action === 'y'){
                noOne.items.push("An Iron Coin");
                console.log("A man has given a girl a coin.  Valar Morghulis.");
                console.log("Your health has been increased.");
                noOne.health += 50;
            }else{
                console.log("A man is dissapointed, but accepts a girl's desicion.")
            }
    }else{
        console.log("You take a rest.  You health has been increased.")
        noOne.health += 20
        }
}

