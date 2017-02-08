var Vec3 = require('./vec3.js');

function Line(begin, end){
  this.pointBegin  = begin || new Vec3();
  this.pointEnd    = end   || new Vec3();
}

Line.prototype = {
  vector: function(){
    return this.pointEnd.subtract(this.pointBegin);
  },
  fragments: function(n){
    var result = [];
    var vector = this.vector();
    var step = vector.magnitude() / n;

    for(var i = 0; i < n; i++){
      result.push(new Line(
        this.pointBegin.add(vector.multiplyScalar(i * step)),
        this.pointBegin.add(vector.multiplyScalar((i + 1) * step))
      ));
    }
    return result;
  },
  calculateMagneticField: function(current, coordinate, nFragments){
    var permeability = 4e-7 * Math.PI;
    var constants = (permeability * current)/(4 * Math.PI);

    return this.fragments(nFragments).map(function(fragment){
      var r = coordinate.subtract(fragment.pointBegin);
      var dlxr = fragment.vector().crossProduct(r.unitVector());
      return dlxr.multiplyScalar(constants / Math.pow(r.magnitude(),2));
    }).reduce(function(a, b) { return a.add(b); }, new Vec3());
  }
}

module.exports = Line;

