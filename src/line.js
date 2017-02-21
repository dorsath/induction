let {vec3} = require('gl-matrix');

function Line(begin, end){
  this.pointBegin  = begin || vec3.create();
  this.pointEnd    = end   || vec3.create();
}

Line.prototype = {
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

