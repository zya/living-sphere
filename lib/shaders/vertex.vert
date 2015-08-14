uniform float time;
uniform float amp;
uniform float val1;
uniform float val2;

float random(vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {

  float sinedX = sin((time - position.x - val1) * 0.004) * 30.0 * random(position.xz) * 1.2;
  float sinedY = cos((time - position.y + val2) * 0.002) * 20.0 * random(position.yz) * 1.8;
  float sinedZ = sin((time - position.z + val2) * 0.0001) * 20.0 * random(position.yz) * 1.8;
  vec3 p = vec3(position.x + (sinedX * amp), position.y + sinedY * amp, sinedZ * amp);

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(p, 1.0);
}
