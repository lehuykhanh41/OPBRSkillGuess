const skills = [
  "I've Come to Put an End to This War", // 0
"Griffon Slash",
"Black Vortex",
"Black Hole - Liberation",
"Give it to me !",
"Ikoku Sovereignty",
"Divine Departure",
"I Wouldn't Want You Guys to Get Hurt",
"Oden Nitoryu: Gun Modoki",
"Oden Nitoryu: Paradise Totsuka",
"Crimson Hound Bite",
"Meteor Volcano",
"Blast Breath",
"No Escape",
"Gear 4 Snakeman King Cobra",
"Gear 4 Bounceman King Kong Gun",
"Unlock Gear 4",
"Gum-Gum Kong Organ Gun",
"Gum-Gum Giant",
"Thunder Bagua",
"I Will Protect You",
"Smash Buster",
"Dyna Stone",
"Is Your Resolve Yet?",
"Red-Haired Onslaught",
"Griffon Thrust",
"Heavenly Bon-bons",
"Maser Cannon",
"Conqueror of 3 Worlds Ragnarok",
"Entertain Me",
"3-Sword Style: Purgatory Onigiri",
"EX Zoro's 2nd Skill",
"Namuji Glacier Fang",
"Divine Swiftness: White Serpent",
"Punk Vise",
"Damned Punk",
"Gamma Knife",
"Puncture Willie",
"Gum-Gum Lightning",
"Gum-Gum Bajrang Gun",
"Fire Gun",
"Ace / Yamato Skill 2 (Ace)",
"I wanna Live Freely!",
"Narikabura Arrow",
"If You Have a Death Wish, Step Ahead",
"Out of My Way!", // 45 
"Lightning Blast", // 46
"Thunder Lance",
"I Will Not Lose",
"The Lightning Cloud of Zeus",
"The Sun Itself, Prometheus",
"Slicing Wave",
"Imperial Flame",
"Firebird Star",
"Gum-Gum Bazooka",
"Ice Age",
"The Phoenix",
"You're Much Calmer Than I Expected",
"I Have Had Enough",
"Drop Your Valuables and Leave !",
"Oden Nitoryu Paradise Waterfall",
"Scyther Sonic",
"Electro Blast", //62 (63 in World)
"Gum-Gum Giant Stamp",
"Ultra Instinct",
"Gum-Gum Red Hawk",
"Yashikaburi Blash",
"No One Harms a Friend of Mine !",
"Cursed Technique Hollow Purple",
"No One Can Escape !", // 70 in World
"3 Sword Style: Flame Dragon",
"Stop Right There !",
"You Must Be Very Brave Huh?",
"Such an Incompetent Opponent",
"Franky General Cannon",
"Did you just say something?",
"Water Breathing: I'm Drowning",
"United States of Smash",
"Black Lightning",
"Domain Expansion: Infinite Void",
"Brulee Best Girl?",
"Fire Breathing: Roast Me Please",// 82
"Can I See Your Panties?",
"Serious Punch",
"I am Atomic",
"Aqua's Purification",
"Love Breathing: No Girls Like Me",
"Domain Expansion: Malevolent Shrine",
"Pirate Docking 6",
"Tana P & the Legend of 50 RD",
];

class Question {
  constructor (src, correct) {
    this.src = src;// Image source.
    this.correct = correct; // Index of the correct answer.
  }
}

var originalQuestionList = [];
var questionList = [];
var score = 0;
var bestScore = 0;

var alreadyGot = [];

function setUp() {
  for (let i = 0; i < 46; i++) {
    originalQuestionList[i] = new Question("img/IMG_" + (4611 + i) + ".jpg", i);
  } 
}

function createQuestions() {
  
  for (let i = 0; i < 15; i++) {
    let counteru = 0;
    let result = Math.floor(Math.random() * 46);
    if (alreadyGot.length == 0) {
      alreadyGot.push(result);
    } 
    else {
      while (counteru < alreadyGot.length) {
        if (result == alreadyGot[counteru]) {
          result = Math.floor(Math.random() * 46);
          counteru = -1;
        }
        counteru++;
      }
    }
    alreadyGot.push(result)
    questionList[i] = originalQuestionList[result];
  }
}

function reset() {

  originalQuestionList = [];
  questionList = [];
  setUp();
  createQuestions();
  changeQuestion();
  score = 0;
  document.getElementById("currentStreak").innerHTML = score;
  counter = 0;
  document.getElementById("currentQuestion").innerHTML = counter+1;

  for (let n = 0; n < 4; n++) {
     document.getElementById("answer" + n).style.backgroundColor = "white";
     document.getElementById("answer" + n).style.color = "black";
  }
}


let currentQuestion = undefined;
let correctAnswer = -1;

function changeQuestion() {
  currentQuestion = questionList.pop();
  document.getElementById("icon").src = currentQuestion.src;

  let values = [-1, -1, -1, -1];
  let answerPlaced = false;

  for (let i = 0; i < 4; i++) {
    if (!answerPlaced) {
      if (values[0] > -1 && values[1] > -1 && values[2] > -1) {
        document.getElementById("answer" + i).innerHTML = skills[currentQuestion.correct];
        correctAnswer = i;
        answerPlaced = true;
      } else {
        if (Math.random() < 0.4) {
          document.getElementById("answer" + i).innerHTML = skills[currentQuestion.correct];
          answerPlaced = true;
          values[i] = currentQuestion.correct;
          correctAnswer = i;
        } else {
          let rand = Math.floor(Math.random() * 90);
          while (rand == values[0] || rand == values[1] || rand == values[2] || rand == values[3]) {
            rand = Math.floor(Math.random() * 90);
          }
          document.getElementById("answer" + i).innerHTML = skills[rand];
          values[i] = rand;
        }
      }
    } else {
      let rand = Math.floor(Math.random() * 90);
          while (rand == values[0] || rand == values[1] || rand == values[2] || rand == values[3]) {
            rand = Math.floor(Math.random() * 90);
          }
          document.getElementById("answer" + i).innerHTML = skills[rand];
          values[i] = rand;
    }
  }
}


/*
for (let c = 0 ; c < 45; c++ ){
  console.log(originalQuestionList[c].src + " " + skills[c]);  
}
*/

let counter = 0;

function update() {
  document.getElementById("currentQuestion").innerHTML = counter+1;

  if (score > bestScore) {
    bestScore = score;
    document.getElementById("bestStreak").innerHTML = bestScore;
  }

  if (counter >= 15) {
    alert("Congratulations! Your score is " + score + "/15. Press OK to play again.");
    reset();
  }
}

function answer(button, index) {

  if (index == correctAnswer) {

    document.getElementById(button).style.backgroundColor = "green";
    document.getElementById(button).style.color = "white";
    document.getElementById(button).innerHTML = "CORRECT !";
    counter++;
    score++;
    document.getElementById("currentStreak").innerHTML = score;

    if (counter < 15) {
    setTimeout(() => {
      document.getElementById(button).style.backgroundColor = "white";
      document.getElementById(button).style.color = "black";
      changeQuestion();
    }, 700);
  }

  } else {
    document.getElementById(button).style.backgroundColor = "red";
    document.getElementById(button).style.color = "white";
    document.getElementById(button).innerHTML = "INCORRECT !";

    document.getElementById("answer" + correctAnswer).style.backgroundColor = "green";
    document.getElementById("answer" + correctAnswer).style.color = "white";

    counter++;
    if (counter < 15) {
    setTimeout(() => {
      document.getElementById(button).style.backgroundColor = "white";
      document.getElementById(button).style.color = "black";

      document.getElementById("answer" + correctAnswer).style.backgroundColor = "white";
      document.getElementById("answer" + correctAnswer).style.color = "black";
      changeQuestion();
      
    }, 700);
  }
  }
  update();
}


setUp();
createQuestions();
changeQuestion();
update();
console.log("Version 1.0.0");
