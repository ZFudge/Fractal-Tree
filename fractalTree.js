const tree = {
  seed: true,
  length: 100,
  width: 10,
  angle: 45,
  branches: 4,
  straight: true,
  colors: ['#F0F','#FA0','#0F0','#0FF'],
  colorStack: [],
  returnToDefault: false
};
const canvas = document.getElementById('canv');
const context = canvas.getContext('2d');
context.lineCap = 'round';
//context.fillStyle = 'black';
//context.fillRect(0,0,canvas.width,canvas.height);

function grow(growths, x, y, len, w, a, c) {
  context.translate(x, y);
  if (growths > 0) {
    context.strokeStyle = tree.colorStack[growths-1];
    context.lineWidth = w;
    const endLine = -len, half = -len/2;
    if (!tree.seed) context.rotate(a * Math.PI / 180);
    context.beginPath();
    context.moveTo(0, 0);
    const bend = Math.random() * 50;
    //if (a < 0) bend -= bend * 2;
    (tree.seed || tree.straight) ? context.lineTo(0, -len) : context.quadraticCurveTo(bend, half, x, -len); //causes initial elongation
    context.stroke();
    if (tree.seed) tree.seed = false;

    context.save();
    
    const newColor = tree.colors[Math.floor(Math.random()*tree.colors.length)];
    grow(growths - 1, 0, -len, len * 0.8, w * 0.8, a, newColor);

    context.restore();
    context.save();
    
    grow(growths - 1, 0, -len, len * 0.8, w * 0.8, -a, newColor);
    
    context.restore();
  }
}
//context.strokeStyle = tree.colors[Math.floor(Math.random()*tree.colors.length)];
//context.quadraticCurveTo(x-5, half, x, destination);//causes initial elongation
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
  tree.length = parseInt(newLen);
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

function regrowth() {
  tree.seed = true;
  context.fillStyle = 'white';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.save();
  grow(tree.branches, canvas.width/2, canvas.height*0.95, tree.length, tree.width, tree.angle, tree.colors[Math.floor(Math.random() * tree.colors.length)]); // , tree.colors[Math.floor(Math.random() * tree.colors.length)]
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

setColorStack();

context.save();
grow(tree.branches, canvas.width/2, canvas.height*0.95, tree.length, tree.width, tree.angle, tree.colors[Math.floor(Math.random() * tree.colors.length)]); // , tree.colors[Math.floor(Math.random() * tree.colors.length)]
context.restore();