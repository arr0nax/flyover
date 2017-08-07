var song;
var shapes = [];
var colors = [];

function preload() {
  song = loadSound('gogo.m4a');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  song.play();
  fft = new p5.FFT();
  fft.setInput(song);
  background(135, 206, 250);
}

function draw(){

  background(0,0,0);
  var spectrum = fft.analyze();
  var averages = [];
  var c = 0;
  var total = 0;
  for ( i = 0; i<spectrum.length; i++) {
    total += spectrum[i];
    c++;
    if (c>50) {
      averages.push(total/50);
      total = 0;
      c = 0;
    }
  }
  var widthpoints = width/averages.length;

  var currentcolor = color(150*sin((100+frameCount)/100)+150,150*sin((200+frameCount)/80)+150, 150*sin((300+frameCount)/60)+150);
  shape = [];
  colors.push(currentcolor)
  shape.push([0, height/2]);

  for (i = 0; i<averages.length; i++) {
    shape.push([widthpoints+(i*widthpoints*2), map(averages[i], 0, 255, height, 0)]);
  }
  shape.push([width, height/2]);
  shape.push([width, height]);
  shape.push([0,height]);
  shapes.push(shape);
  for (i = shapes.length-1; i>=0; i--) {
    stroke(255,255,255);
    fill(colors[i]);
    beginShape();
      for (j = 2; j<shapes[i].length; j++){
        vertex(shapes[i][j][0], (shapes[i][j][1] - i*10));
      }
    endShape();
  }
  if (shapes.length>50) {
    shapes.shift();
    colors.shift();
  }

}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
