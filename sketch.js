const bracketWeight = 5;
const bracketColor = "#000"
const textWeight = 1;
const matchUpSpace = 60;
const matchUpHeight = 160;

const numTeams = 64;
const numRounds = Math.log2(numTeams);
let rounds = [];
let teams = [];

// Song boxes
let padding = 20;

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
  // round1(yStart, color, lineStartX, lineEndX, groupA, groupB, position, height)
  strokeWeight(bracketWeight);
  round1(55, bracketColor, 10, 200, jsonData.group1.round1.roundMatchups, jsonData.group2.round1.roundMatchups, "left", matchUpHeight)
  round1(55, bracketColor, width - 10, width - 200, jsonData.group3.round1.roundMatchups, jsonData.group4.round1.roundMatchups, "right", matchUpHeight)
  
  round2(
    55 + (matchUpHeight / 2), 
    bracketColor, 
    200, 
    200 + 190, 
    jsonData.group1.round2.roundMatchups, 
    jsonData.group2.round2.roundMatchups, 
    "left",
    (matchUpHeight * 1.5)
  )
  round2(
    55 + (matchUpHeight / 2), 
    bracketColor, 
    width - (200), 
    width - (420), 
    jsonData.group3.round2.roundMatchups, 
    jsonData.group4.round2.roundMatchups, 
    "right",
    (matchUpHeight * 1.5)
  )
  
  round3(
    55 + (matchUpHeight * 1.5), 
    bracketColor, 
    390, 
    640,
    jsonData.group1.round3.roundMatchups,
    jsonData.group2.round3.roundMatchups,
    "left",
    matchUpHeight * 2.5
  );
  round3(
    55 + (matchUpHeight * 1.5), 
    bracketColor, 
    width - (420), 
    width - (640), 
    jsonData.group3.round3.roundMatchups, 
    jsonData.group4.round3.roundMatchups, 
    "right",
    (matchUpHeight * 2.5)
  )  
  round4(
    55 + (matchUpHeight * 3), 
    bracketColor, 
    640, 
    900,
    jsonData.group1.round4.roundMatchups,
    jsonData.group2.round4.roundMatchups,
    "left",
    matchUpHeight * 5
  );
  round4(
    55 + (matchUpHeight * 3), 
    bracketColor, 
    width - 640, 
    width - 900,
    jsonData.group3.round4.roundMatchups,
    jsonData.group4.round4.roundMatchups,
    "right",
    matchUpHeight * 5
  );
  
  // Final Four
  
  // round5(55 + (matchUpHeight * 7), bracketColor, 1000, 1400);
  // round5(55 + (matchUpHeight * 7), bracketColor, width - 1000, width - 1400);
  
  // Championship
  
  // round6(height - (height / 3), bracketColor);
}

function getSongAttributes(group, iteration, songKey) {
  return group[iteration].attributes[songKey]?.song?.attributes;
}

function bracketContent(yStart, group, iteration, lineStartX, lineEndX, yStart, color, position, height) {
  stroke(color);
  strokeWeight(bracketWeight);
  line(lineStartX, yStart, lineEndX, yStart);
  line(lineEndX, yStart, lineEndX, yStart + height);
  line(lineEndX, yStart + height, lineStartX, yStart + height);

  var songAttrs = getSongAttributes(group, iteration, 'song1');
  bracketContentSong(
    yStart, 
    lineStartX, 
    lineEndX,
    songAttrs.artwork.bgColor, 
    songAttrs.name, 
    songAttrs.artwork.textColor2, 
    position
  );
  var songAttrs = getSongAttributes(group, iteration, 'song2');
  bracketContentSong(
    yStart + height, 
    lineStartX, 
    lineEndX,
    songAttrs.artwork.bgColor, 
    songAttrs.name, 
    songAttrs.artwork.textColor2, 
    position
  );
}

function bracketContentSong(yStart, rectStart, rectEnd, bgColor, songName, textColor, position) {
  let rectWidth = textWidth(songName) + 2 * padding;
  if (position === "right") {
    // Something needs to be adjusted here for rounds beyond round 1
    var endX = (width) - 10 - (width - rectStart);
    rectStart = endX - rectWidth;
  }
  noStroke();
  fill(`#${bgColor}`);
  rect(rectStart, yStart - 20, rectWidth, 40);

  fill(`#${textColor}`)
  textSize(20)
  text(songName, rectStart + (padding * 0.4), yStart + 10);
}

function round1(yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
  let groups = [groupA, groupB]
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
      yStart += matchUpHeight + matchUpSpace;
    }
  }
}

function round2(yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
  let groups = [groupA, groupB];
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
      yStart += (matchUpHeight * 2) + (matchUpSpace * 2);
    }
  }
}

function round3(yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
  let groups = [groupA, groupB];
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
      yStart += (matchUpHeight * 4) + (matchUpSpace * 4);
    }
  }
}

function round4(yStart, color, lineStartX, lineEndX, groupA, groupB, position, height) {
  let groups = [groupA, groupB];
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
      yStart += (matchUpHeight * 8) + (matchUpSpace * 8);
    }
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
