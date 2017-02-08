let Properties = require("./game_properties.js");

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
    this.gl = gl;
    this.clear();
  },
  clear: function(){
    let gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}

