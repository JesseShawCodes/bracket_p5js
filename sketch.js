const bracketWeight = 5;
const bracketColor = "#000"
const textWeight = 1;
const matchUpSpace = 60;
const matchUpHeight = 60;

const numTeams = 64;
const numRounds = Math.log2(numTeams);
let rounds = [];
let teams = [];

// Song boxes
let padding = 20;

// 
let leftBracket = ["group1", "group2"];
let rightBracket = ["group3", "group4"];

// Load the song and preprocess it.
function preload() {
  jsonData = loadJSON('data.json')
}
function setup() {
  createCanvas(3200, 3800);
}

function draw() {
  background(255, 250, 255);
  drawBracket();
}

function drawBracket() {
  // round1(yStart, color, lineStartX, lineEndX, groupA, groupB)
  strokeWeight(bracketWeight);
  round1(55, bracketColor, 10, 200, jsonData.group1.round1.roundMatchups, jsonData.group2.round1.roundMatchups)
  round1(55, bracketColor, width - 10, width - 200, jsonData.group3.round1.roundMatchups, jsonData.group4.round1.roundMatchups)
  
  round2(55 + (matchUpHeight / 2), bracketColor, 200, 200 + 190)
  round2(55 + (matchUpHeight / 2), bracketColor, width - (200), width - (420))
  
  round3(55 + (matchUpHeight * 1.5), bracketColor, 390, 640);
  round3(55 + (matchUpHeight * 1.5), bracketColor, width - 420, width - 640);
  
  round4(55 + (matchUpHeight * 3.5), bracketColor, 640, 1000);
  round4(55 + (matchUpHeight * 3.5), bracketColor, width - 640, width - 1000);
  
  // Final Four
  
  round5(55 + (matchUpHeight * 7), bracketColor, 1000, 1400);
  round5(55 + (matchUpHeight * 7), bracketColor, width - 1000, width - 1400);
  
  // Championship
  
  round6(height - (height / 3), bracketColor);
}

function getSongAttributes(group, iteration, songKey) {
  return group[iteration].attributes[songKey]?.song?.attributes;
}

function bracketContent(yStart, group, iteration, lineStartX, lineEndX, yStart, color, songAttrs) {
  stroke(color);
  strokeWeight(bracketWeight);
  line(lineStartX, yStart, lineEndX, yStart);
  line(lineEndX, yStart, lineEndX, yStart + matchUpHeight);
  line(lineEndX, yStart + matchUpHeight, lineStartX, yStart + matchUpHeight);

  var songAttrs = getSongAttributes(group, iteration, 'song1');
  bracketContentSong(yStart, lineStartX, lineStartX, songAttrs.artwork.bgColor, songAttrs.name, songAttrs.artwork.textColor2);
  var songAttrs = getSongAttributes(group, iteration, 'song2');
  bracketContentSong(yStart + matchUpHeight, lineStartX, lineStartX, songAttrs.artwork.bgColor, songAttrs.name, songAttrs.artwork.textColor2, group);
}

function bracketContentSong(yStart, rectStart, textStart, bgColor, songName, textColor, groupName) {
  // text(JSON.stringify(groupName), 400, yStart)
  noStroke();
  fill(`#${bgColor}`);
  rect(rectStart, yStart - 20, textWidth(songName) + 2 * padding, 40);

  fill(`#${textColor}`)
  textSize(20)
  text(songName, rectStart + (padding * 0.4), yStart + 10);
}

function round1(yStart, color, lineStartX, lineEndX, groupA, groupB) {
  let groups = [groupA, groupB]
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color);
      yStart += matchUpHeight + matchUpSpace;
    }
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
