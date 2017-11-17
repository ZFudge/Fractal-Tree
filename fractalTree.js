var lines = {
  speed: 5,
  canvas: document.getElementById('canv'),
  length: 50,
  width: 10,
  angle: 45,
  colors: ['#F0F','#FA0','#0F0','#0FF']
};

lines.context = lines.canvas.getContext('2d');
lines.context.lineCap = 'round';
lines.context.strokeStyle = lines.colors[Math.floor(Math.random()*lines.colors.length)];
lines.context.lineWidth = lines.width;
lines.context.beginPath();
lines.context.moveTo(lines.canvas.width/2, lines.canvas.height);
lines.context.lineTo(lines.canvas.width/2, lines.canvas.height - lines.length);
lines.context.stroke();

function mainFunc(growths, x, y, len, w, a) {
  if (growths > 0 && w > 0.5) {
    
    lines.context.translate(x, y);
    lines.context.rotate(a * Math.PI / 180);
    
    const destination =  - len;
    const half = ( - len) / 2;
    
    lines.context.strokeStyle = lines.colors[Math.floor(Math.random()*lines.colors.length)];
    lines.context.lineWidth = w;
    lines.context.beginPath();
    lines.context.moveTo(0, 0);
    lines.context.lineTo(x, destination);//causes initial elongation
    //lines.context.quadraticCurveTo(x-5, half, x, destination);//causes initial elongation
    lines.context.stroke();
    
    mainFunc(growths - 1, 0, destination, len * 0.8, w * 0.8, a);
    lines.context.rotate(-a * Math.PI / 180);
    lines.context.translate(x, y);
    mainFunc(growths - 1, 0, destination, len * 0.8, w * 0.8, -a);
    lines.context.rotate(a * Math.PI / 180);
    lines.context.translate(x, y);
    
    //lines.context.rotate(-a * Math.PI / 180);
    //lines.context.translate(x, y);
    //lines.context.translate(x, destination+len);
    //mainFunc(growths - 1, 0, 0, len * 0.5, w * 0.6, -a);
  }
}
mainFunc(6, lines.canvas.width/2, lines.canvas.height - lines.length, lines.length * 0.8, lines.width * 0.8, lines.angle);


//let loop = setInterval(mainFunc,lines.speed);