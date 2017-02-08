#version 300 es
precision mediump float;

in vec2 vertexPosition;
//uniform vec2 screenSize;
//uniform vec2 cameraPosition;

out vec2 relativeCoordinate;

void main(){
  vec2 tileSize = vec2(1024);

  gl_Position = vec4(vertexPosition * vec2(2) - vec2(1), 0, 1);
  relativeCoordinate = vec2(vertexPosition.x, vertexPosition.y);
}

