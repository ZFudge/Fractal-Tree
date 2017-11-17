var lines = {
  seed: true,
  canvas: document.getElementById('canv'),
  length: 100,
  width: 20,
  angle: 45,
  layers: 3,
  colors: ['#F0F','#FA0','#0F0','#0FF']
};
lines.context = lines.canvas.getContext('2d');
lines.context.lineCap = 'round';
//lines.context.fillStyle = 'black';
//lines.context.fillRect(0,0,lines.canvas.width,lines.canvas.height);
lines.context.strokeStyle = 'black';

function tree(growths, x, y, len, w, a, c) {
  if (growths > 0) {
    //console.log(growths);
lines.context.strokeStyle = c;
    lines.context.translate(x, y);
    lines.context.save();
    (lines.seed) ? lines.seed = false : lines.context.rotate(a * Math.PI / 180);
    lines.context.beginPath();
    lines.context.moveTo(0, 0);
    
    const endLine =  - len;const half = ( - len) / 2;
    lines.context.lineWidth = w;
    lines.context.lineTo(0, -len);
    //lines.context.quadraticCurveTo(-5, half, x, -len);//causes initial elongation
    lines.context.stroke();
    
    const newColor = lines.colors[Math.floor(Math.random()*lines.colors.length)];
    tree(growths - 1, 0, -len, len * 0.8, w * 0.8, a, newColor);
    lines.context.restore();
    //lines.context.translate(x, y);
    //lines.context.rotate(-a * Math.PI / 180)
    lines.context.save();
    tree(growths - 1, 0, -len, len * 0.8, w * 0.8, -a, newColor);
    lines.context.restore();
  }
}
lines.context.save();
tree(lines.layers, lines.canvas.width/2, lines.canvas.height*0.95, lines.length, lines.width, lines.angle, lines.colors[Math.floor(Math.random() * lines.colors.length)]); // , lines.colors[Math.floor(Math.random() * lines.colors.length)]
lines.context.restore();

    //lines.context.strokeStyle = lines.colors[Math.floor(Math.random()*lines.colors.length)];
//lines.context.quadraticCurveTo(x-5, half, x, destination);//causes initial elongation

const slider = document.getElementById('slider');
function regrowth(newAng) {
  lines.angle = parseInt(newAng);
  lines.seed = true;
  lines.context.fillStyle = 'white';
  lines.context.fillRect(0,0,lines.canvas.width,lines.canvas.height);
  lines.context.save();
  tree(lines.layers, lines.canvas.width/2, lines.canvas.height*0.95, lines.length, lines.width, lines.angle, lines.colors[Math.floor(Math.random() * lines.colors.length)]); // , lines.colors[Math.floor(Math.random() * lines.colors.length)]
  lines.context.restore();
}