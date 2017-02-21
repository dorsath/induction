#version 300 es
precision mediump float;

uniform mat4 pMatrix;
uniform mat4 vMatrix;
uniform vec3 coordinate;
uniform vec3 vector;

in vec2 vertexPosition;

out vec3 relativeCoordinate;
out vec4 debugColor;

void main(){
  float tileSize = 1.0/16.0;

  vec3 up = vec3(0, 1, 0);
  vec4 vertexRelPosition = vec4(vec3((vertexPosition * tileSize), 0) + coordinate, 1);

  gl_Position = pMatrix * vMatrix * vertexRelPosition;

  //gl_Position = pMatrix * vMatrix * (vertexRelPosition + vec4(0, 0, -10, 0));

  //gl_Position = vec4(vertexPosition * vec2(2) - vec2(1), 0, 1);
  relativeCoordinate = vertexRelPosition.xyz;
}

