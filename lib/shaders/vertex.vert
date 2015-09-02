precision highp float;
uniform float time;
uniform float amp;
uniform float val1;
uniform float val2;

varying vec2 vUv;
varying vec3 vecPos;
varying vec3 vecNormal;
// uniform vec3 color1;
// uniform vec3 color2;


// varying vec3 vColor;
// varying vec3 vCoord;
varying vec3 nColor;

highp float rand(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {

  float sinedX = sin((time - position.x - val1) * 0.004) * 30.0 * rand(position.xz) * 1.2;
  float sinedY = cos((time - position.y + val2) * 0.002) * 20.0 * rand(position.xz) * 1.8;
  float sinedZ = sin((time - position.z + val2) * 0.0001) * 20.0 * rand(position.yz) * 1.8;
  vec3 p = vec3(position.x + (sinedX * amp), position.y + sinedY * amp, position.z + sinedZ * amp);

  float f = mod(position.x, 2.0);
  float f3 = mod(position.z, 8.0);
  float f2 = mod(position.z, 2.0);

  nColor = color;
  vUv = uv;
  vecPos = (modelMatrix * vec4(p, 1.0 )).xyz;
  vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  // vCoord = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
