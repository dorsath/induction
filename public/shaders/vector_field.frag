#version 300 es

precision mediump float;
precision lowp sampler3D;

uniform sampler3D dataTexture;
in vec2 relativeCoordinate;
out vec4 theColor;

void main(){
  vec4 dataPoint = texture(dataTexture, vec3(relativeCoordinate, 0.5));
  theColor = vec4(vec2(10) * dataPoint.xy, 0, 1);
  //theColor = vec4(relativeCoordinate, 0.0, 1);


  //gl_FragColor = vec4(texture3D(dataTexture, vec3(relativeCoordinate, 0.5)),1);
  //vec2 wallsTextureFormat = vec2(6,19);
  //vec2 textureCoordinate = vec2(mod(textureID, wallsTextureFormat.x),floor(textureID / wallsTextureFormat.x));
  //gl_FragColor = texture2D(wallsTexture, (relativeCoordinate + textureCoordinate) / wallsTextureFormat);
}

