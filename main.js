var THREE = require('three');
var dynamics = require('dynamics.js');
var vs = require('./lib/shaders/vertex.vert')();
var fs = require('./lib/shaders/fragment.frag')();
var amp = 2.0;
var val1 = 300;
var val2 = 200;
var speed1 = 0.002;
var speed2 = 0.004;
var color = new THREE.Color(1.0, 0.2, 0.1);
var color2 = new THREE.Color(1.0, 0.2, 0.1);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
var startTime = Date.now();

var geometry = new THREE.SphereGeometry(500, 200, 100);
console.log(geometry.vertices.length);

var m = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
});

var material = new THREE.ShaderMaterial({
  vertexShader: vs,
  fragmentShader: fs,
  wireframe: true,
  uniforms: {
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
    color: {
      type: "c",
      value: color
    },
    color2: {
      type: "c",
      value: color2
    }
  },
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
window.amp = amp;
window.val1 = val1;
window.val2 = val2;

document.addEventListener('click', function() {

  var random = Math.random() * 10 - 5;
  dynamics.animate(window, {
    amp: amp + random
  }, {
    type: dynamics.spring,
    frequency: 400,
    friction: 200,
    duration: 2500
  });

  dynamics.animate(color, {
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  }, {
    type: dynamics.easeIn,
    duration: 1000
  });

  dynamics.animate(window, {
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
  material.uniforms.color.value = color;
  material.uniforms.color2.value = color2;
  // mesh.rotation.y += 0.0001;
  // mesh.rotation.z += 0.00002;
  // mesh.rotation.x += 0.00002;
  renderer.render(scene, camera);
}

animate();
