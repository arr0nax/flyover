var song;
var shapes = [];
var colors = [];

function preload() {
  song = loadSound('audio/house no. 3.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  song.play();
  fft = new p5.FFT();
  fft.setInput(song);
  background(100);
}

function draw(){

  background(100);
  var spectrum = fft.analyze();
  var averages = [];
  var c = 0;
  var total = 0;
  for ( i = 0; i<spectrum.length; i++) {
    total += spectrum[i];
    c++;
    if (c>10) {
      averages.push(total/50);
      total = 0;
      c = 0;
    }
  }
  console.log(averages.length)
  var widthpoints = width/averages.length;

  var currentcolor = color(150*sin((100+frameCount)/100)+150,150*sin((200+frameCount)/80)+150, 150*sin((300+frameCount)/60)+150);


  for (i = 0; i<averages.length; i++) {
    push();
    map(averages[i], 0, 255, height, 0)]);
    stroke(255,255,255);
    fill(colors[i]);
    beginShape();
    for (j = 2; j<shapes[i].length; j++){
      vertex(shapes[i][j][0], (shapes[i][j][1] - i*10));
    }
    vertex(shapes[i][2][0], shapes[i][2][1]);
    endShape();
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
