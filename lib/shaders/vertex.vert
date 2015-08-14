float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
  float rand = random(vec2(position.x, position.y));

  vec3 p = vec3(position.x * rand, position.y * rand, position.z * rand);
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(p,0.9);
}
