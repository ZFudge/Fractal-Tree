const tree = {
  seed: true,
  length: 100,
  width: 10,
  angle: 45,
  branches: 4,
  curve: 0,
  fruit: false,
  colorful: true,
  inverted: false,
  colors: ['#3B0F00','#541500','#751D00','#8F2501',  '#2BAD00','#00DE1E','#6000DE','#AF02E8','#E80288','#E80253','#E8022C'],
  //colors: ['#F0F','#FA0','#0F0','#0FF', '#0004FF','#8400FF'],
  colorStack: [],
  returnToDefault: false
};
const canvas = document.getElementById('canv');
const context = canvas.getContext('2d');
context.lineCap = 'round';

function grow(growths, x, y, len, w, a) {
  context.translate(x, y);
  if (growths < tree.branches) {
    (tree.colorful) ? context.strokeStyle = tree.colors[growths] : (tree.inverted) ? context.strokeStyle = 'white' : context.strokeStyle = 'black';
    context.lineWidth = w;
    const endLine = -len, half = -len/2;
    if (!tree.seed) context.rotate(a * Math.PI / 180);
    context.beginPath();
    context.moveTo(0, 0);
    const bend = Math.random();
    //if (Math.random() < 0) bend -= bend * 4;
    (tree.seed) ? context.lineTo(0, -len) : context.quadraticCurveTo(tree.curve * a * len / 50, half, x, -len); //causes initial elongation
    context.stroke();
    if (tree.seed) tree.seed = false;

    context.save();
    
    grow(growths + 1, 0, -len, len * 0.8, w * 0.8, a);

    context.restore();
    context.save();
    
    grow(growths + 1, 0, -len, len * 0.8, w * 0.8, -a);
    
    context.restore();
  } else if (tree.fruit) {
    context.fillStyle = tree.colors[Math.floor(Math.random() * tree.colors.length)];
    context.beginPath();
    context.arc(0,0, w * 2, 0,2 * Math.PI);
    context.fill();
  }
}
function adjustAngle(newAng) {
  tree.angle = parseInt(newAng);
  regrowth();
}
const angleSlide = document.getElementById('angleSlider');
function resetAngle() {
  if (tree.returnToDefault) {
    tree.angle = 45;
    angleSlide.value = 45;
  }
  regrowth();
}

function adjustWidth(newWid) {
  tree.width = parseInt(newWid);
  regrowth();
}
const widthSlide = document.getElementById('widthSlider');
function resetWidth() {
  if (tree.returnToDefault) {
    tree.width = 10;
    widthSlide.value = 10;
  }
  regrowth();
}

function adjustLength(newLen) {
  tree.length = parseFloat(newLen);
  regrowth();
}
const lengthSlide = document.getElementById('lengthSlider');
function resetLength() {
  if (tree.returnToDefault) {
    tree.length = 100;
    lengthSlide.value = 100;
  }
  regrowth();
}

function adjustBranches(newBrNum) {
  tree.branches = parseInt(newBrNum);
  regrowth();
}
const branchSlide = document.getElementById('branchSlider');
function resetBranches() {
  if (tree.returnToDefault) {
    tree.branches = 3;
    branchSlide.value = 3;
  }
  regrowth();
}

function adjustCurve(newCurve) {
  tree.curve = parseFloat(newCurve);
  regrowth();
}
const curveSlide = document.getElementById('curveSlider');
function resetCurve() {
  if (tree.returnToDefault) {
    tree.curve = 0;
    curveSlide.value = 0;
  }
  regrowth();
}

function regrowth() {
  tree.seed = true;
  (tree.inverted) ? context.fillStyle = 'black' : context.fillStyle = 'white';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.save();
  grow(0, canvas.width/2, canvas.height*0.95, tree.length, tree.width, tree.angle); //, tree.colors[Math.floor(Math.random() * tree.colors.length)]); // , tree.colors[Math.floor(Math.random() * tree.colors.length)]
  context.restore();
}

document.addEventListener("keydown", keyPushed);
document.addEventListener("keyup", keyReleased);
function keyPushed(btn) { if (btn.keyCode === 17) tree.returnToDefault = true; }
function keyReleased(btn) { if (btn.keyCode === 17) tree.returnToDefault = false; }

function setColorStack() {
  tree.colorStack = [];
  for (let i=0; i<parseInt(branchSlide.max); i++) {
    tree.colorStack.push(tree.colors[Math.floor(Math.random() * tree.colors.length)]);
  }
}
function resetColor() {
  setColorStack();
  regrowth();
}

function colorOnOff() {
  tree.colorful = !tree.colorful;
  regrowth();
}

const invert = () => {
  tree.inverted = !tree.inverted;
  regrowth();
};

context.fillStyle = 'white';
context.fillRect(0,0,canvas.width,canvas.height);
setColorStack();
context.save();
grow(0, canvas.width/2, canvas.height*0.95, tree.length, tree.width, tree.angle, tree.colors[Math.floor(Math.random() * tree.colors.length)]); // , tree.colors[Math.floor(Math.random() * tree.colors.length)]
context.restore();