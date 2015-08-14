var THREE = require('three');
var vs = require('./lib/shaders/vertex.vert')();
var fs = require('./lib/shaders/fragment.frag')();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

var geometry = new THREE.SphereGeometry(400);

var material = new THREE.ShaderMaterial({
  vertexShader: vs,
  wireframe: true
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
