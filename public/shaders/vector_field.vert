#version 300 es
precision mediump float;

uniform mat4 pMatrix;
uniform mat4 vMatrix;
uniform vec3 coordinate;
uniform vec3 vector;

in vec2 vertexPosition;

out vec2 relativeCoordinate;
out vec4 debugColor;

void main(){
  float tileSize = 1.0/16.0;
  mat4 mMatrix = mat4(1);

  vec3 up = vec3(0, 1, 0);
  mat3 rotationMatrix = mat3(1);
  //if (vector.x == 0.0 && vector.z == 0.0){
  //  if (vector.y < 0.0)
  //    rotationMatrix = mat3(
  //          vec3(1,  0, 0),
  //          vec3(0, -1, 0),
  //          vec3(0,  0, 1)
  //        );
  //} else {
  //  vec3 new_z =  cross(normalize(vector), up);
  //  vec3 new_y = normalize(vector);

  //  vec3 new_x = normalize(cross(new_y, up));

  //  rotationMatrix = mat3(new_x, new_y, new_z);
  //}

  //vec4 vertexRelPosition = vec4(rotationMatrix * vec3(vertexPosition, 0), 1) * tileSize + vec4(coordinate.xy, -coordinate.z, 0);
  vec4 vertexRelPosition = vec4(vertexPosition, 0, 1);


  gl_Position = pMatrix * vMatrix * (vertexRelPosition + vec4(0, 0, -10, 0));

  //gl_Position = vec4(vertexPosition * vec2(2) - vec2(1), 0, 1);
  relativeCoordinate = vec2(vertexPosition.x, vertexPosition.y);
}

