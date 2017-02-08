console.log("Induction");

var Renderer = require('./src/renderer.js');
var ShaderLoader = require('./src/shader_loader.js');
var TextureLoader = require('./src/texture_loader.js');
var Vec3 = require('./src/vec3.js');
var Line = require('./src/line.js');
var VectorField = require('./src/vector_field.js');

var texture;

var canvas = document.getElementById('game-canvas');
var stuffToLoad = [
  ShaderLoader.load("vector_field.vert"),
  ShaderLoader.load("vector_field.frag"),
  TextureLoader.load("arrow.png")


];

Renderer.setup(canvas);

Promise.all(stuffToLoad).then(function(){
  TextureLoader.buildTextures(Renderer.gl);
  VectorField.setup();

  render();


});

function render(){

  Renderer.clear();
  VectorField.render(texture);
  //requestAnimationFrame(render);
}


function buildGrid(){
  var line = new Line(new Vec3(0, 0.5, 1), new Vec3(1, 0.5, 0.5));
  var current = 20;
  //var coordinate = new Vec3(0.4, 0.4, 0.5);

  var vectorField = [];
  var gridDensity = 32;
  var xRange = [0, 1];
  var yRange = [0, 1];
  var zRange = [0, 1];
  var z = 0.5;
  for(var z = zRange[0]; z < zRange[1] * gridDensity; z++){
    for(var y = yRange[0]; y < yRange[1] * gridDensity; y++){
      for(var x = xRange[0]; x < xRange[1] * gridDensity; x++){
        var B = line.calculateMagneticField(current, new Vec3(x / gridDensity, y / gridDensity, z / gridDensity), 30);
        vectorField.push(B.x * 1e4);
        vectorField.push(B.y * 1e4);
        vectorField.push(B.z * 1e4);
      }
    }
  }
  console.log("done...", vectorField.length);
  texture = VectorField.buildDataTexture(new Float32Array(vectorField), [gridDensity, gridDensity, gridDensity]);
}

buildGrid();
