var processedData = [];
var categories = [];
var colors = ["#21ff21","#ff2121","#282C34","#F0F000","#FF80FF","#8080FF"];

var minX, maxX, xAxisLength;
var minY, maxY, yAxisLength;

var margin = 50;
var axisAmount = 15;

function handleInputClick(){
  var fileInput = document.getElementById('raw-data-input');
  fileInput.value = null;
}

function handleInputChange() {
  var fileInput = document.getElementById('raw-data-input');
  processedData = [];
  categories = [];
  readFile(fileInput.files[0]);
}

function readFile( file ){
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    parseData(e.target.result);
    plotGraph(processedData);
  };
  fileReader.readAsText(file);
}

function parseData( rawData ) {
  rawData.split("\n").forEach(function(line){
    if(line.length > 0){
      var arguments = line.split(",");
      processedData.push(arguments);
    }
  });
}

function plotGraph(){
    clearCanvas();
    extractCategories();
    extractPlotBounds();
    printAxises();
    printValues();
    populateLegend();
}

// get axis min max
function extractPlotBounds(){
  minX = Number(processedData[0][0]);
  maxX = minX;
  minY = Number(processedData[0][1]);
  maxY = minY;

  for(var entry = 1; entry < processedData.length ; entry++){
    var x = Number(processedData[entry][0]);
    var y = Number(processedData[entry][1]);

    if(x < minX){
      minX = x;
    }else if(x > maxX){
      maxX = x;
    }

    if(y < minY){
      minY = y;
    }else if(y > maxY){
      maxY = y;
    }
  }

  xAxisLength = maxX - minX;
  yAxisLength = maxY - minY;
}

function extractCategories(){
  for(var entry = 0; entry < processedData.length ; entry++){
    if(categories.indexOf(processedData[entry][2]) === -1){
      categories.push(processedData[entry][2]);
    }
  }
}

function printAxises(){
  var ctx = canvas.getContext('2d'),
    height = canvas.height,
    width = canvas.width;

    // calculate axis increment
    var XaxisOnCanvas = width / axisAmount; // X
    var XaxisOnData = recalculate(XaxisOnCanvas, width, xAxisLength);
    var YaxisOnCanvas = height / axisAmount; // Y
    var YaxisOnData = recalculate(YaxisOnCanvas, height, yAxisLength);

    // Y axis
    for(i = minY; i <= maxY; i += YaxisOnData){
      var y =  yRelativeValue(i);
      printStroke(margin, y, margin - 10, y, "black");
      printNumber(5,y+4, Number(i.toFixed(2)), "black");
    }
    if(0 > minY && 0 < maxY){
      y =  yRelativeValue(0);
      printThinStroke(margin, y, width - margin, y, "black" );
    }

    // X axis
    for(i = minX; i <= maxX; i += XaxisOnData){
      var x = xRelativeValue(i);
      printStroke(x,height - margin, x, height - margin + 10, "black");
      printNumber(x-6, height - margin + 24, Number(i.toFixed(2)), "black");
    }
    if(0 > minX && 0 < maxX){
      x = xRelativeValue(0);
      printThinStroke(x,height - margin , x, margin, "black");
    }
}

function printValues(){

  processedData.forEach(function(row){
    var originalX = row[0];
    var originalY = row[1];
    var value = row[2];

    var x = xRelativeValue(originalX);
    var y = yRelativeValue(originalY);
    var color = colors[categories.indexOf(value)];
    printRectangle(x,y,7, color);
  });
}

function populateLegend(){
  var html = '<p><b>';
  categories.map(function(category){
    html += '<font color='+colors[categories.indexOf(category)]+'>'+category+
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>';
  });
  html += '</b></p>';
  document.getElementById("legend").innerHTML = html;
}
