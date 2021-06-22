let detector;

var canvas;
let vid;
let playing = true;



function preload(){
  
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);  
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    stroke(0);
    strokeWeight(3);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(0);
    textSize(18);
    text(object.label, object.x + 6, object.y + 20);
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Canvas");
  vid = createVideo("object2.mov", vidLoad);
  
  
}

function draw() {
  
  let img = vid.get();
  detector.detect(img, gotDetections);
  image(img, 0,0);
  counter = nf(vid.time(), 0, 2);
  textSize(12);
  text(counter, windowWidth*0.47, windowHeight/2);
  
}

function vidLoad() {
  vid.hide();
  vid.loop();
  vid.volume(0);
  vid.size(windowWidth, windowHeight);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
