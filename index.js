console.log("Induction");

var Vec3 = require('./src/vec3.js');

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
    console.log("vector: " , vector);

    for(var i = 0; i < n; i++){
      result.push(new Line(
        this.pointBegin.add(vector.multiplyScalar(i * step)),
        this.pointBegin.add(vector.multiplyScalar((i + 1) * step))
      ));
    }
    return result;
  },
}

function calculateMagneticField(current, line, coordinate, nFragments){
  var permeability = 4e-7 * Math.PI;
  var constants = (permeability * current)/(4 * Math.PI);

  return line.fragments(nFragments).map(function(fragment){
    var r = coordinate.subtract(fragment.pointBegin);
    var dlxr = fragment.vector().crossProduct(r.unitVector());
    return dlxr.multiplyScalar(constants / Math.pow(r.magnitude(),2));
  }).reduce(function(a, b) { return a.add(b); }, new Vec3());
}

var line = new Line(new Vec3(0, 1, 1), new Vec3(1, 1, 1));
var current = 1;
var coordinate = new Vec3(0.4, 0.9, 1);
var magneticField = calculateMagneticField(current, line, coordinate, 100);

console.log("Line: ", line);
console.log("Coordinate: ", coordinate);
console.log("MagneticField: ", magneticField.divideScalar(1e4), "G");
