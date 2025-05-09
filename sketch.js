const bracketWeight = 5;
const textWeight = 1;
const matchUpSpace = 60;
const matchUpHeight = 60;

const numTeams = 64;
const numRounds = Math.log2(numTeams);
let rounds = [];
let teams = [];

// Load the GeoJSON and preprocess it.
function preload() {
  jsonData = loadJSON('data.json')
}
function setup() {
  createCanvas(3200, 3800);
  // textAlign(CENTER, CENTER); // Center the text
  // rectMode(CENTER);          // Center the rectangle
}

function draw() {
  background(255, 250, 255);
  drawBracket();
}

function initializeTeams() {
  for (let i = 0; i < numTeams; i++) {
    teams.push(`Team ${i + 1}`);
  }
  // console.log(teams);
}

function drawBracket() {
  strokeWeight(bracketWeight);
  round1(55, 'rgb(61,1,1)', 10, 200)
  round1(55, 'rgb(58,0,61)', width - 10, width - 200)
  
  round2(55 + (matchUpHeight / 2), 'rgb(14,0,15)', 200, 200 + 190)
  round2(55 + (matchUpHeight / 2), '#382A00', width - (200), width - (420))
  
  round3(55 + (matchUpHeight * 1.5), '#3D0026', 390, 640);
  round3(55 + (matchUpHeight * 1.5), '#433C00', width - 420, width - 640);
  
  round4(55 + (matchUpHeight * 3.5), '#433C00', 640, 1000);
  round4(55 + (matchUpHeight * 3.5), '#433C00', width - 640, width - 1000);
  
  // Final Four
  
  round5(55 + (matchUpHeight * 7), '#433C00', 1000, 1400);
  round5(55 + (matchUpHeight * 7), '#433C00', width - 1000, width - 1400);
  
  // Championship
  
  round6(height - (height / 3), '#001308');
}

function bracketContent(yStart, group, iteration, lineStartX, lineEndX, yStart, color) {
  // console.log("bracketContent");
  stroke(color);
  strokeWeight(bracketWeight);
  line(lineStartX, yStart, lineEndX, yStart);
  line(lineEndX, yStart, lineEndX, yStart + matchUpHeight)
  line(lineEndX, yStart + matchUpHeight, lineStartX, yStart + matchUpHeight)
  bracketContentSong(yStart, group[iteration].attributes.song1.song.attributes.artwork.bgColor, group[iteration].attributes.song1.song.attributes.name, group[iteration].attributes.song1.song.attributes.artwork.textColor1);

  noStroke()
  fill(100, 150, 255);
  rect(3, yStart + 40, 200, 20);
    
  fill(0);
  textSize(24);
  text(group[iteration].attributes.song2.song.attributes.name, 6, yStart + matchUpHeight + 8);
}

function bracketContentSong(yStart, bgColor, songName, textColor) {
  noStroke();
  text(`#${bgColor}`, 440, yStart)
  fill(`#${bgColor}`);
  rect(3, yStart - 3, 200, 20);


  fill(`#${textColor}`)
  textSize(24)
  text(songName, 6, yStart + 5);
}

function round1(yStart, color, lineStartX, lineEndX) {
  var group1round1 = jsonData.group1.round1.roundMatchups;
  for (let r = 0; r < group1round1.length; r++) {
    bracketContent(yStart, group1round1, r, lineStartX, lineEndX, yStart, color);
    yStart += matchUpHeight + matchUpSpace;
  }
  
  // GROUP 2
  var group2round1 = jsonData.group2.round1.roundMatchups;

  for (let r = 0; r < group2round1.length; r++) {
    /*
    stroke(color);
    strokeWeight(bracketWeight);
    line(lineStartX, yStart, lineEndX, yStart);
    line(lineEndX, yStart, lineEndX, yStart + matchUpHeight)
    line(lineEndX, yStart + matchUpHeight, lineStartX, yStart + matchUpHeight)
    
    noStroke();
    
    fill(`#${JSON.stringify(group2round1[r].attributes.song1.song.attributes.artwork.bgColor)}`);
    rect(3, yStart - 3, 200, 20);
    
    fill(0);
    textSize(14);
    text(group2round1[r].attributes.song1.song.attributes.name, 6, yStart + 5);
    noStroke()
    let {bgColor, textColor1} = group2round1[r].attributes.song2.song.attributes.artwork
    fill(`#${bgColor}`);
    rect(3, yStart + 40, 200, 40);
    
    fill(`#${textColor1}`);
    textSize(24);
    text(group2round1[r].attributes.song2.song.attributes.name, 6, yStart + matchUpHeight + 8);
    */
    bracketContent(yStart, group2round1, r, lineStartX, lineEndX, yStart, color);
    yStart += matchUpHeight + matchUpSpace;

  }
}

function round2(yStart, color, lineStartX, lineEndX) {
  for (let r = 0; r < 8; r++) {
    stroke(color);
    strokeWeight(bracketWeight);
    line(lineStartX, yStart, lineEndX, yStart);
    line(lineEndX, yStart, lineEndX, yStart + (matchUpHeight * 2));
    line(lineStartX, yStart + (matchUpHeight * 2), lineEndX, yStart + (matchUpHeight * 2));
    
    yStart += (matchUpHeight * 2) + matchUpSpace * 2;
  }
}

function round3(yStart, color, lineStartX, lineEndX) {
  for (let r = 0; r < 4; r++) {
    stroke(color);
    strokeWeight(bracketWeight);
    
    line(lineStartX, yStart, lineEndX, yStart);
    line(lineEndX, yStart, lineEndX, yStart + (matchUpHeight * 2) * 2);
    line(lineStartX, yStart + (matchUpHeight * 2) * 2, lineEndX, yStart + (matchUpHeight * 2) * 2);
    
    yStart += (matchUpHeight * 4) + matchUpSpace * 4;
  }
}

function round4(yStart, color, lineStartX, lineEndX) {
  for (let r = 0; r < 2; r++) {
    stroke(color);
    strokeWeight(bracketWeight);
    line(lineStartX, yStart, lineEndX, yStart);
    line(lineEndX, yStart, lineEndX, yStart + ((matchUpHeight * 2) * 2)*2);
    line(lineStartX, yStart + ((matchUpHeight * 2) * 2)*2, lineEndX, yStart + ((matchUpHeight * 2) * 2)*2);
    
    yStart += (matchUpHeight * 4) + matchUpSpace * 12;
  }
}

function round5(yStart, color, lineStartX, lineEndX) {
    stroke(color);
    line(lineStartX, yStart, lineEndX, yStart);
    line(lineEndX, yStart, lineEndX, yStart + ((matchUpHeight * 2) * 2)*4);
    line(lineStartX, yStart + ((matchUpHeight * 2) * 2)*4, lineEndX, yStart + ((matchUpHeight * 2) * 2)*4);
}

function round6(yStart, color) {
    stroke(color);
    line(10, yStart, 400, yStart);
    line(width - 10, yStart, width - 400, yStart)
}
