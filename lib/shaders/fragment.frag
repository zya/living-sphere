uniform vec3 color1;
uniform vec3 color2;
uniform float time;
varying vec3 vColor;
varying vec3 vCoord;
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
  vColor.x * sin(time * 0.0002), vColor.yz;
  gl_FragColor = vec4(nColor, 0.2);
}
