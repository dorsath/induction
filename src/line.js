let {ShaderHelper, TextureLoader, Renderer, Renderables} = require('brickworks');
let {vec3} = require('gl-matrix');

let segments = 10;
let radius = 0.05;
function Line(begin, end){
  this.pointBegin  = begin || vec3.create();
  this.pointEnd    = end   || vec3.create();

}

Line.prerequisites = {
  'shaders': ['line'],
  'textures': []
};

Line.setup = function(){
    let gl = Renderer.gl;
    this.shader = ShaderLoader.get("line");
    this.program = ShaderLoader.get("line").program;

}

Line.prototype = {
  createVertices: function(){
    let vertices = [];
    let offAxis = this.vector();
    vec3.subtract(offAxis, offAxis, vec3.fromValues(1, 1, 1));
    vec3.normalize(offAxis, offAxis);

    for (var i = 0; i < segments; i++){
      let dTheta = Math.PI * 2 / segments;
      let theta = dTheta * i;
      //let point = vec3.clone(this.pointBegin);
      {
        let point = vec3.fromValues(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
        vec3.add(point,point, this.pointBegin);
        vertices.push(point[0]);
        vertices.push(point[1]);
        vertices.push(point[2]);
      }

      {
      let point = vec3.fromValues(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
      vec3.add(point,point, this.pointEnd);
      vertices.push(point[0]);
      vertices.push(point[1]);
      vertices.push(point[2]);
      }

      {
      let point = vec3.fromValues(Math.cos(theta + dTheta) * radius, 0, Math.sin(theta + dTheta) * radius);
      vec3.add(point,point, this.pointEnd);
      vertices.push(point[0]);
      vertices.push(point[1]);
      vertices.push(point[2]);
      }

      {
      let point = vec3.fromValues(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
      vec3.add(point,point, this.pointBegin);
      vertices.push(point[0]);
      vertices.push(point[1]);
      vertices.push(point[2]);
      }

      {
      let point = vec3.fromValues(Math.cos(theta + dTheta) * radius, 0, Math.sin(theta + dTheta) * radius);
      vec3.add(point,point, this.pointEnd);
      vertices.push(point[0]);
      vertices.push(point[1]);
      vertices.push(point[2]);
      }

      {
      let point = vec3.fromValues(Math.cos(theta + dTheta) * radius, 0, Math.sin(theta + dTheta) * radius);
      vec3.add(point,point, this.pointBegin);
      vertices.push(point[0]);
      vertices.push(point[1]);
      vertices.push(point[2]);
      }
    }

    console.log(Line.shader);
    console.log(vertices.length);
    let gl = Renderer.gl;
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  },
  render: function(){
    let gl = Renderer.gl;
    gl.useProgram(Line.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(Line.shader.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(gl.getUniformLocation(Line.program, "pMatrix"), false, Renderer.pMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(Line.program, "vMatrix"), false, Renderer.vMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 180 / 3);
  },
  vector: function(){
    var out = vec3.create();
    vec3.subtract(out, this.pointEnd, this.pointBegin);
    return out;
  },
  fragments: function(n){
    var result = [];
    var vector = this.vector();
    var step = vec3.length(vector) / n;

    for(var i = 0; i < n; i++){
      var a = vec3.create();
      vec3.scale(a, vector, i * step);
      vec3.add(a, a, this.pointBegin);

      var b = vec3.create();
      vec3.scale(b, vector, (i + 1) * step);
      vec3.add(b, b, this.pointBegin);
      
      result.push(new Line(a, b));
    }
    return result;
  },
  calculateMagneticField: function(current, coordinate, nFragments){
    var permeability = 4e-7 * Math.PI;
    var constants = (permeability * current)/(4 * Math.PI);

    return this.fragments(nFragments).map(function(fragment){
      var r = vec3.create();

      var r_unit = vec3.create();
      vec3.subtract(r, coordinate, fragment.pointBegin);
      vec3.normalize(r_unit, r);

      var dlxr = vec3.create();
      vec3.cross(dlxr, fragment.vector(), r_unit);
      vec3.scale(dlxr, dlxr, constants / Math.pow(vec3.length(r),2));

      return dlxr;
    }).reduce(function(a, b) { vec3.add(a, a, b); return a; }, vec3.create());
  }
}

module.exports = Line;

