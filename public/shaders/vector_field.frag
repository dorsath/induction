#version 300 es

precision mediump float;
precision lowp sampler3D;

uniform sampler3D dataTexture;
uniform sampler2D arrowTexture;
in vec2 relativeCoordinate;
in vec4 debugColor;
out vec4 theColor;

void main(){
  vec4 dataPoint = texture(dataTexture, vec3(relativeCoordinate, 0.5));
  //theColor = vec4(vec2(10) * dataPoint.xy, 0, 1);
  theColor = texture(arrowTexture, relativeCoordinate);
  if (length(theColor) > 1.1)
    discard;
  else
    theColor = vec4(1);
}

