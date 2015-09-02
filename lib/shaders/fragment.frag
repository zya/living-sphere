precision highp float;
// uniform vec3 color1;
// uniform vec3 color2;
// uniform float time;
// varying vec3 vColor;
// varying vec3 vCoord;
varying vec3 nColor;
varying vec2 vUv;
varying vec3 vecPos;
varying vec3 vecNormal;

uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];
uniform float pointLightDistance[MAX_POINT_LIGHTS];
uniform vec3 ambientLightColor;

void main() {
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
    for(int l = 0; l < MAX_POINT_LIGHTS; l++) {
        vec3 lightDirection = normalize(vecPos - pointLightPosition[l]);
        addedLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.08, 1.0) * pointLightColor[l] * 1.2;
    }

  gl_FragColor = vec4(nColor, 0.2) * addedLights * vec4(ambientLightColor, 1.0);
}
