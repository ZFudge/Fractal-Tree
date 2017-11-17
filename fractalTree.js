var lines = {
  seed: true,
  speed: 5,
  canvas: document.getElementById('canv'),
  length: 100,
  width: 10,
  angle: 45,
  colors: ['#F0F','#FA0','#0F0','#0FF']
};
lines.context = lines.canvas.getContext('2d');
lines.context.lineCap = 'round';
lines.context.fillStyle = 'black';
lines.context.fillRect(0,0,lines.canvas.width,lines.canvas.height);
lines.context.strokeStyle = 'white';

function tree(growths, x, y, len, w, a) {
  if (growths > 0) {
    console.log(growths);
    lines.context.translate(x, y);
    (lines.seed) ? lines.seed = false : lines.context.rotate(a * Math.PI / 180);
    lines.context.beginPath();
    lines.context.moveTo(0, 0);
    
    const endLine = y - len;const half = (y - len) / 2;
    lines.context.lineWidth = w;
    lines.context.lineTo(0, -len);
    lines.context.stroke();
    
    tree(growths - 1, 0, -len, len * 0.8, w * 0.8, a);
    
  }
}

tree(2, lines.canvas.width/2, lines.canvas.height, lines.length, lines.width, lines.angle);


    //lines.context.strokeStyle = lines.colors[Math.floor(Math.random()*lines.colors.length)];
//lines.context.quadraticCurveTo(x-5, half, x, destination);//causes initial elongation