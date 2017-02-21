console.log("Induction");
var Line = require('./src/line.js');
//var Vec3 = require('./src/vec3.js');
var VectorField = require('./src/vector_field.js');
let {vec3} = require('gl-matrix');

let Brickworks = require('brickworks');
let {Benchmark, Renderer, MouseInput} = Brickworks;

var gridDensity = 16;
var canvas = document.getElementById('game-canvas');


var rotation = Math.PI / 2;
var distance = 2;
Brickworks.Renderer.setup(canvas);
Brickworks.GameLoader.add(VectorField, Line);
Brickworks.GameLoader.load().then(function(){ return Brickworks.GameLoader.setup() } ).then(function(){
  Renderer.setView(rotation, distance);
  for(n in lines){
    lines[n].createVertices();
  }

  render();

});


var texture;

var z = 0.5;

function render(){
  Renderer.clear();
  let mouseMovement = MouseInput.mouseMovementThisFrame;
  let rad = mouseMovement[0] / 100;
  rotation += rad;
  Renderer.setView(rotation, distance);


  Brickworks.Renderer.clear();
  for (var i = 0; i < gridDensity; i++){
    for (var j = 0; j < gridDensity; j++){
      VectorField.render(texture, vec3.fromValues(i / gridDensity, j / gridDensity, z), vec3.fromValues(0, 1, 0));
    }
  }

  for(n in lines){
    lines[n].render();
  }
  z = Math.min(Math.max(z + MouseInput.mouseWheelDelta[1] / 200, 0), 1);
  
  requestAnimationFrame(render);
  MouseInput.resetMouseData();
  
}


var lines = [
  new Line(vec3.fromValues(0.6, 0.0, 0.5),vec3.fromValues(0.6, 1.0, 0.5)),
  new Line(vec3.fromValues(0.4, 1.0, 0.5),vec3.fromValues(0.4, 0.0, 0.5)),
];

function buildGrid(){


  var current = 50;
  //var coordinate = new Vec3(0.4, 0.4, 0.5);

  var vectorField = [];
  var xRange = [0, 1];
  var yRange = [0, 1];
  var zRange = [0, 1];
  var z = 0.5;
  
  Benchmark.start("grid");
  for(var z = zRange[0]; z < zRange[1] * gridDensity; z++){
    for(var y = yRange[0]; y < yRange[1] * gridDensity; y++){
      for(var x = xRange[0]; x < xRange[1] * gridDensity; x++){
        var B = lines.map(function(line){
          return line.calculateMagneticField(current,vec3.fromValues(x / gridDensity, y / gridDensity, z / gridDensity), 30);
        }).reduce(function(a, b){ vec3.add(a, a, b); return a;}, vec3.create());
        vectorField.push(B[0] * 1e4);
        vectorField.push(B[1] * 1e4);
        vectorField.push(B[2] * 1e4);
      }
    }
  }

  Benchmark.note("grid", "done");
  texture = VectorField.buildDataTexture(new Float32Array(vectorField), [gridDensity, gridDensity, gridDensity]);
  Benchmark.note("grid", "texture");
  Benchmark.report("grid");
}

buildGrid();
