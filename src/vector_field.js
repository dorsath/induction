let ShaderHelper = require('./shader_helper.js');
let Renderer = require('./renderer.js');
let TextureLoader = require('./texture_loader.js');

module.exports = {
  setup: function(){
    let gl = Renderer.gl;
    this.buffers = ShaderHelper.initBuffers();
    this.program = ShaderHelper.initShaders("vector_field");
    gl.useProgram(this.program);
    gl.uniform2fv(gl.getUniformLocation(this.program, "screenSize"), [gl.drawingBufferWidth, gl.drawingBufferHeight]);
    this.vertexPositionAttribute = gl.getAttribLocation(this.program, "vertexPosition");
  },
  render: function(texture){
    let gl = Renderer.gl;
    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers);
    gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);

    //gl.uniform2fv(gl.getUniformLocation(this.program, "position"), position);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, texture);
    gl.uniform1i(gl.getUniformLocation(this.program, "dataTexture"), 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  },
  buildDataTexture: function(data, aspects){
    let gl = Renderer.gl;
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_3D, texture);
    gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGB32F, aspects[0], aspects[1], aspects[2], 0, gl.RGB, gl.FLOAT, data);
    
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, 0);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    //gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_3D, null);
    return texture;
  }
};


