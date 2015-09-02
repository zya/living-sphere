var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var dynamics = require('dynamics.js');
var vs = require('./lib/shaders/vertex.vert')();
var fs = require('./lib/shaders/fragment.frag')();
var _ = require('lodash');

var amp = 0.5;
var val1 = 100;
var val2 = 50;
var speed1 = 0.002;
var speed2 = 0.004;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

var startTime = Date.now();

var geometry = new THREE.SphereGeometry(400, 300, 300);

var uniforms = {
  time: {
    type: "f",
    value: 1.0
  },
  amp: {
    type: "f",
    value: 1.0
  },
  val1: {
    type: "f",
    value: 300.0
  },
  val2: {
    type: "f",
    value: 200.0
  }
};

var phongUniforms = THREE.ShaderLib.phong.uniforms;
// console.log(THREE.ShaderLib.phong.fragmentShader);
console.log(_.merge(uniforms, THREE.UniformsLib.lights, phongUniforms));
var material = new THREE.ShaderMaterial({
  vertexShader: vs,
  fragmentShader: fs,
  wireframe: true,
  uniforms: _.merge(uniforms, THREE.UniformsLib.lights, phongUniforms),
  vertexColors: THREE.FaceColors,
  lights: true,
  shading: THREE.SmoothShading
});


_.forEach(geometry.faces, function(face, index) {
  // to add colours to each face
  face.color = new THREE.Color(Math.random(), Math.random(), Math.random());
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.THREE = THREE;

var renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.userPan = false;
controls.userPanSpeed = 0.0;
controls.maxDistance = 5000.0;
controls.maxPolarAngle = Math.PI * 0.495;

var light = new THREE.PointLight(0xFF4500, 0.9);
var light2 = new THREE.PointLight(0x800080, 0.8);

var lightp = new THREE.SphereGeometry(30);
var lightp2 = new THREE.SphereGeometry(30);
var lightpmesh = new THREE.Mesh(lightp);
var lightpmesh2 = new THREE.Mesh(lightp2);

light.position.set(2800, 100, 0.0);
light2.position.set(-1800, -200, 0.0);
lightpmesh.position.set(0.0, 0.0, 0.0);

var ambient = new THREE.AmbientLight(0xFFF0F5); // soft white ambient
scene.add(ambient);
scene.add(light, light2);
scene.add(lightpmesh, lightpmesh2);

window.light = light;
window.lightMesh = lightpmesh;
window.amp = amp;
window.val1 = val1;
window.val2 = val2;

document.addEventListener('click', function() {

  var random = (Math.random() * 1) - 0.50;

  dynamics.animate(window, {
    // amp: window.amp + random,
    val1: Math.random() * 500,
    val2: Math.random() * 400
  }, {
    type: dynamics.easeIn,
    duration: 1000
  });
});

function animate() {
  requestAnimationFrame(animate);
  var time = Date.now() - startTime;
  material.uniforms.time.value = time;
  material.uniforms.amp.value = window.amp;
  material.uniforms.val1.value = window.val1;
  material.uniforms.val2.value = window.val2;
  lightpmesh.position.set(light.position.x, light.position.y, light.position.z);
  lightpmesh2.position.set(light2.position.x, light2.position.y, light2.position.z);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.002;
  mesh.rotation.z += 0.002;

  renderer.render(scene, camera);
}

animate();
