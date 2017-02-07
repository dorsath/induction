function Vec3(x, y, z){
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}


Vec3.prototype = {
  magnitude: function(){
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  unitVector: function(){
    return this.divideScalar(this.magnitude());
  },
  multiplyScalar: function(scalar){
    return new Vec3(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar
    );
  },
  divideScalar: function(scalar){
    return this.multiplyScalar(1/scalar);
  },
  addScalar: function(scalar){
    return new Vec3(
      this.x + scalar,
      this.y + scalar,
      this.z + scalar
    );
  },
  subtractScalar: function(scalar){
    return this.addScalar(-scalar);
  },
  crossProduct: function(other){
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  },
  add: function(other){
    return new Vec3(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    );
  },
  subtract: function(other){
    return new Vec3(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z
    );
  }
}



module.exports = Vec3;
