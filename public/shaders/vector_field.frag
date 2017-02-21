#version 300 es

precision mediump float;
precision lowp sampler3D;

uniform sampler3D dataTexture;
uniform sampler2D arrowTexture;
in vec3 relativeCoordinate;
in vec4 debugColor;
out vec4 theColor;

void main(){
  vec4 dataPoint = texture(dataTexture, vec3(relativeCoordinate));
  if (length(theColor.w) < 0.5){
    theColor = abs(dataPoint);
  } else
    discard;
  //theColor = texture(arrowTexture, relativeCoordinate);
  //if (length(theColor) > 1.1)
  //  discard;
  //else
  //  theColor = vec4(1);
}

