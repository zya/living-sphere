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
var color1 = new THREE.Color(1.0, 0.2, 0.1);
var color2 = new THREE.Color(1.0, 0.2, 0.1);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

var startTime = Date.now();

var geometry = new THREE.SphereGeometry(400, 200, 200);

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
  },
  color1: {
    type: "c",
    value: color1
  },
  color2: {
    type: "c",
    value: color2
  }
};

var material = new THREE.ShaderMaterial({
  vertexShader: vs,
  fragmentShader: fs,
  wireframe: true,
  uniforms: uniforms,
  vertexColors: THREE.FaceColors
});

_.forEach(geometry.faces, function (face) {
  face.color = new THREE.Color(Math.random(), Math.random(), Math.random());
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
// controls.center.set(0, 75, 0);

window.amp = amp;
window.val1 = val1;
window.val2 = val2;

document.addEventListener('click', function () {

  var random = (Math.random() * 1.5) - 0.75;

  dynamics.animate(color1, {
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  }, {
    type: dynamics.easeIn,
    duration: 1000
  });

  dynamics.animate(window, {
    amp: window.amp + random,
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
  material.uniforms.color1.value = color1;
  material.uniforms.color2.value = color2;
  // mesh.rotation.x += 0.002;
  // mesh.rotation.y += 0.002;
  // mesh.rotation.z += 0.002;
  renderer.render(scene, camera);
}

animate();