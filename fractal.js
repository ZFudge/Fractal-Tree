const canvas = document.getElementById('fractal-canvas');
const context = canvas.getContext('2d');

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const tree = {
  seed: true,
  length: 100,
  width: 10,
  angle: 45,
  angleOffset: 1,
  branches: 3,
  curve: 0,
  fruit: false,
  fruitSwitch: function() {
    this.fruit = !this.fruit; 
    regrowth();
  },
  colorful: true,
  inverted: false,
  asynch: false,
  asynchDelay: 5,
  growthUnits: 10,
  colors: ['#3B0F00','#541500','#751D00','#8F2501',  '#2BAD00','#00DE1E',  '#6000DE','#AF02E8',   '#E80288','#E80253','#E8022C', '#A30000'],
  colorStack: [],
  returnToDefault: false,
  callCount: 0,
  seedHeight: canvas.height / 2 + window.innerHeight/2 * 0.3,
  getNewSeedHeight: function() {
    return canvas.height / 2 + window.innerHeight/2 * 0.3;
  }
};

// rescursively draws tree branches from seed to finish
async function grow(growths, x, y, len, w, a) {
  context.lineCap = 'round';
  context.translate(x, y);
  if (growths < tree.branches) {
    if (tree.asynch) await timeout(tree.asynchDelay);

    (tree.colorful) ? context.strokeStyle = tree.colors[growths] : (tree.inverted) ? context.strokeStyle = 'white' : context.strokeStyle = 'black';
    context.lineWidth = w;
    const endLine = -len, half = -len/2;
    if (!tree.seed) context.rotate(a * Math.PI / 180);
    context.beginPath();
    context.moveTo(0, 0);

    (tree.seed) ? context.lineTo(0, -len) : context.quadraticCurveTo(tree.curve * a * len / 50, half, x, -len); //causes initial elongation
    context.stroke();

    if (tree.seed) tree.seed = false;

    context.save();
    
    (tree.asynch) ? await grow(growths + 1, 0, -len, len * 0.8, w * 0.8, a) : grow(growths + 1, 0, -len, len * 0.8, w * 0.8, a);

    context.restore();
    context.save();
    
    (tree.asynch) ? await grow(growths + 1, 0, -len, len * 0.8, w * 0.8, -a / tree.angleOffset) : grow(growths + 1, 0, -len, len * 0.8, w * 0.8, -a / tree.angleOffset);
    
    context.restore();
  } else if (tree.fruit) {
    (tree.colorful) ? context.fillStyle = tree.colors[Math.floor(growths)] : (tree.inverted) ? context.fillStyle = 'white' : context.fillStyle = 'black';
    context.beginPath();
    context.arc(0,0, w * 2, 0,2 * Math.PI);
    context.fill();
  }
}

// resets canvas, tree object, and invokes growth
async function regrowth() {
  tree.seed = true;
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  (tree.asynch) ? await grow(0, canvas.width/2, tree.seedHeight, tree.length, tree.width, tree.angle) : grow(0, canvas.width/2, tree.seedHeight, tree.length, tree.width, tree.angle); //, tree.colors[Math.floor(Math.random() * tree.colors.length)]); // , tree.colors[Math.floor(Math.random() * tree.colors.length)]
  context.restore();
}

async function asynchronousGrowth() {
  tree.asynch = !tree.asynch;
  if (tree.asynch) {
    await regrowth();
    if (tree.asynch) tree.asynch = !tree.asynch;
  }
}

// Ranged inputs

const branchSlide = document.getElementById('branchSlider');
const branchValue = document.getElementById('branch-value');
function adjustBranches(newBrNum) {
  branchValue.innerHTML = tree.branches = parseInt(newBrNum);
  regrowth();
}
function resetBranches() {
  if (tree.returnToDefault) {
    tree.branches = branchValue.innerHTML = branchSlide.value = 3;
    regrowth();
  }
}

const angleSlide = document.getElementById('angleSlider');
const angleValue = document.getElementById('angle-value');
function adjustAngle(newAng) {
  tree.angle = parseInt(newAng);
  angleValue.innerHTML = newAng + "&deg;";
  regrowth();
}
function resetAngle() {
  if (tree.returnToDefault) {
    tree.angle = angleValue.innerHTML = angleSlide.value = 45;
    regrowth();
  }
}

const angleOffsetSlide = document.getElementById('angleOffsetSlider');
const angleOffsetValue = document.getElementById('angle-offset-value');
function adjustAngleOffset(newAngOff) {
  tree.angleOffset = parseFloat(newAngOff).toFixed(1);
  angleOffsetValue.innerHTML = ((parseFloat(newAngOff) - 1) * 100 ).toFixed(0)  + '&deg;';
  regrowth();
}
function resetAngleOffset() {
  if (tree.returnToDefault) {
    tree.angleOffset = angleOffsetSlide.value = 1;
    angleOffsetValue.innerHTML = '0%';
    regrowth();
  }
}

const widthSlide = document.getElementById('widthSlider');
const widthValue = document.getElementById('width-value');
function adjustWidth(newWid) {
  widthValue.innerHTML = tree.width = parseInt(newWid);
  regrowth();
}
function resetWidth() {
  if (tree.returnToDefault) {
    tree.width = widthValue.innerHTML = widthSlide.value = 10;
    regrowth();
  }
}

const lengthSlide = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('length-value');
function adjustLength(newLen) {
  lengthValue.innerHTML = tree.length = parseFloat(newLen);
  regrowth();
}
function resetLength() {
  if (tree.returnToDefault) {
    tree.length = lengthValue.innerHTML = lengthSlide.value = 100;
    regrowth();
  }
}

const curveSlide = document.getElementById('curveSlider');
const curveValue = document.getElementById('curve-value');
function adjustCurve(newCurve) {
  tree.curve = parseFloat(newCurve);
  curveValue.innerHTML = parseFloat(newCurve).toFixed(2);
  regrowth();
}
function resetCurve() {
  if (tree.returnToDefault) {
    tree.curve = curveSlide.value = 0;
    curveValue.innerHTML = '0.00';
    regrowth();
  }
}

const asyncDelaySlide = document.getElementById('asyncSlider');
const asyncDelayValue = document.getElementById('async-value');
function adjustAsyncDelay(newAsync) {
  tree.asynchDelay = parseFloat(newAsync);
  asyncDelayValue.innerHTML = newAsync + "ms";
}
const resetAsyncDelay = () => (tree.returnToDefault) ? tree.asynchDelay = asyncDelayValue.innerHTML = asyncDelaySlide.value = 5 : null;

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
  if (tree.inverted) {
    Array.from(document.getElementsByTagName('span')).forEach(function(cur,ind,arr){cur.style.color='#EEE'});
    document.body.style.backgroundColor = 'black';
  } else {
    Array.from(document.getElementsByTagName('span')).forEach(function(cur,ind,arr){cur.style.color='black'});
    document.body.style.backgroundColor = 'white';
  }
  regrowth();
};

setColorStack();

window.addEventListener('resize', screen);
function screen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; 
  (window.innerHeight < 600) ? tree.seedHeight = canvas.height - 210 : tree.seedHeight = tree.getNewSeedHeight();
  regrowth();
}

screen();

const controls = document.getElementById('controls-fixed-bottom');
const controlsContainer = document.getElementById('outer-controls-container');
//controlsContainer.addEventListener('mouseenter', () => controls.style.opacity = 1);
//controlsContainer.addEventListener('mouseleave', () => controls.style.opacity = 0.5);

