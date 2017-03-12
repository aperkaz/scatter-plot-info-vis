/* Helper class */

// Canvas drawing methods
function printStroke(xStart, yStart ,xFinish, yFinish, color){
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xFinish, yFinish);
  ctx.lineWidth=2;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

function printThinStroke(xStart, yStart ,xFinish, yFinish, color){
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xFinish, yFinish);
  ctx.lineWidth=1;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

function printNumber(x, y, value, color){
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
  ctx.closePath();
}

function printRectangle(x, y, size, color){
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x-size/2, y-size/2, size, size);
  ctx.closePath();
}

function clearCanvas() {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Calculate point relative position
function xRelativeValue(value){
  var ctx = canvas.getContext('2d'),
    height = canvas.height,
    width = canvas.width;

    var xPos = recalculate( (value-minX), xAxisLength , width-2*margin);
    var x = xPos + margin;
    return x;
}

function yRelativeValue(value){
  var ctx = canvas.getContext('2d'),
    height = canvas.height,
    width = canvas.width;

  var yPos = recalculate( (value-minY), yAxisLength , height-2*margin);
  var y =  height - ( yPos + margin);
  return y;
}

function recalculate(oDistance, oSerieSize, newSerieSize){
  return oDistance * newSerieSize / oSerieSize;
}
