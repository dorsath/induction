#version 300 es
precision mediump float;
uniform mat4 pMatrix;
uniform mat4 vMatrix;


in vec3 vertexPosition;

void main(){
  gl_Position = pMatrix * vMatrix * vec4(vertexPosition, 1);
}

