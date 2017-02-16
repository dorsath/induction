let Properties = require("./game_properties.js");
let Vec3 = require('./vec3.js');

module.exports = {
  setup: function(canvas){
    let width = Properties.aspects[0];
    let height = Properties.aspects[1];
    let gl = canvas.getContext("webgl2");

    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;

    var aspect = width / height;
    var near = 0.01;
    var far  = 50;
    var fieldOfViewInRadians = 1.57079633;
    this.perspectiveMatrix = this.perspective(aspect, near, far, fieldOfViewInRadians);
    this.viewMatrix = this.view(new Vec3(0, 0, -1), new Vec3(0, 0, 1));


    //this.viewMatrix = [

    this.gl = gl;
    this.clear();
  },
  clear: function(){
    let gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  },
  perspective: function(aspect, near, far, fieldOfViewInRadians){
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0                        ,   0,
      0         , f, 0                        ,   0,
      0         , 0, (near + far) * rangeInv  ,  -1,
      0         , 0, near * far * rangeInv * 2,   0
    ];
  },
  view: function(vector, offset){
    var up = new Vec3(0, 1, 0);
    var z = vector.crossProduct(up).unitVector();
    var y = vector.unitVector();
    var x = y.crossProduct(up).unitVector();

    return [
      x.x                 ,   x.y                 ,   x.z                 , 0,
      y.x                 ,   y.x                 ,   y.z                 , 0,
      z.x                 ,   z.x                 ,   z.z                 , 0,
      x.dotProduct(offset),   y.dotProduct(offset),   z.dotProduct(offset), 1
    ];
  }
}

