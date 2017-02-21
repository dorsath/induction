let {ShaderHelper, TextureLoader, Renderer, Renderables} = require('brickworks');
let {Tile} = Renderables;


module.exports = {
  prerequisites: {
    'shaders': ['vector_field'],
    'textures': ['arrow.png']
  },

  setup: function(){
    let gl = Renderer.gl;
    this.program = ShaderLoader.get("vector_field").program;
    this.buffers = Tile.createBuffer();
    this.texture = TextureLoader.get("arrow.png");
  },
  render: function(texture, coordinate, vector){
    let gl = Renderer.gl;
    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers);
    gl.vertexAttribPointer(this.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3fv(gl.getUniformLocation(this.program, "coordinate"), coordinate);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "pMatrix"), false, Renderer.pMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "vMatrix"), false, Renderer.vMatrix);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_3D, texture);
    gl.uniform1i(gl.getUniformLocation(this.program, "dataTexture"), 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.getUniformLocation(this.program, "arrowTexture"), 1);

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
    gl.bindTexture(gl.TEXTURE_3D, null);
    return texture;
  }
};


