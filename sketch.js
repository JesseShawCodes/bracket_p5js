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
let padding = 30;

function preload() {
  jsonData = loadJSON('data.json');
  championData = loadJSON('championship.json');
  champion = loadJSON('champion.json');
}

function setup() {
  createCanvas(3200, 3800);
}

function draw() {
  background(255, 250, 255);
  drawBracket();
}

function drawBracket() {
  // round (yStart, color, lineStartX, lineEndX, groupA, groupB, position, height)
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
  
  round5(
    55 + (matchUpHeight * 6), 
    bracketColor, 
    900,
    1300,
    championData.round5.roundMatchups,
    "left",
    matchUpHeight * 10,
    0
  );
  round5(
    55 + (matchUpHeight * 6), 
    bracketColor, 
    width - 900, 
    width - 1300,
    championData.round5.roundMatchups,
    "right",
    matchUpHeight * 10,
    1
  );
  
  // Championship
  
  round6(height - (height * 0.05), 600, 600, bracketColor, championData.round6.roundMatchups);

  winner(champion);
}

function getSongAttributes(group, iteration, songKey) {
  // text(group, 600,  Math.random() * (height - 10) + 10)
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

function bracketContentSong(yStart, rectStart, rectEnd, bgColor, songName, textColor, position, fontSize = 36, rectangleHeight = 40, yStartSong = 10) {
  textSize(fontSize)
  let rectWidth = textWidth(songName) + 2 * padding;
  if (position === "right") {
    var endX = (width) - 10 - (width - rectStart);
    rectStart = endX - rectWidth;
  }
  noStroke();
  fill(`#${bgColor}`);
  rect(rectStart, yStart - 20, rectWidth, rectangleHeight + 10, 12, 12, 12, 12);

  fill(`#${textColor}`)

  text(songName, rectStart + (padding * 0.4), yStart + yStartSong);
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
  // text(JSON.stringify(groupA[0]), 900, 900)
  let groups = [groupA, groupB];
  for (let i = 0; i < groups.length; i++) {
    for (let r = 0; r < groups[i].length; r++) {
      bracketContent(yStart, groups[i], r, lineStartX, lineEndX, yStart, color, position, height);
      yStart += (matchUpHeight * 8) + (matchUpSpace * 8);
    }
  }
}

function round5(yStart, color, lineStartX, lineEndX, groupA, position, height, iteration) {
  bracketContent(yStart, groupA, iteration, lineStartX, lineEndX, yStart, color, position, height)
}

function round6(yStart, xStart, xEnd, color, groupA) {
  // stroke(color);

  bracketContentSong(yStart, xStart, xEnd, groupA[0].attributes.song1.song.attributes.artwork.bgColor, groupA[0].attributes.song1.song.attributes.name, groupA[0].attributes.song1.song.attributes.artwork.textColor2, "left", fontSize = 56, rectangleHeight = 100, yStartSong = 40);

  bracketContentSong(yStart, width - xEnd, width - xStart, groupA[0].attributes.song2.song.attributes.artwork.bgColor, groupA[0].attributes.song2.song.attributes.name, groupA[0].attributes.song2.song.attributes.artwork.textColor2, "right", fontSize = 56, rectangleHeight = 100, yStartSong = 40);
}

function winner(winner) {
  noStroke();
  // rect(rectStart, yStart - 20, rectWidth, rectangleHeight + 10, 12, 12, 12, 12);
  drawCenteredRect(width - (width * 0.5), 1000, 200, 200, winner)

  textAlign(CENTER)
  fill(`#${winner.song.attributes.artwork.textColor2}`);
  text("Winner:", width - (width * 0.5), height - (height * 0.25))
  text(winner.song.attributes.name, width - (width * 0.5), height - (height * 0.2))
  textAlign(LEFT)
}

function drawCenteredRect(centerX, centerY, rectWidth, rectHeight, winner) {
  console.log(winner.song.attributes.artwork.bgColor);
  fill(`#${winner.song.attributes.artwork.bgColor}`);
  let x = centerX - rectWidth / 2;
  let y = centerY - rectHeight / 2;
  rect(x, y, rectWidth, rectHeight);
}
