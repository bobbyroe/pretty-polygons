import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.CircleGeometry(1, 4);

function getPlane(index) {
  const hue = 1 - index * 0.05;
  const lightness = index * 0.05;
  const color = new THREE.Color().setHSL(hue, 1, lightness);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.33
  });
  const mesh = new THREE.Mesh(geometry, material);
  const scale = 1 - index * 0.05;
  mesh.scale.multiplyScalar(scale);
  mesh.rotation.z = Math.PI * index * 0.02;
  const offset = index * 0.1;
  function update (t) {
    mesh.rotation.z = Math.cos(t + offset);
  }
  return { mesh, update };
}

const planes = [];
const numPlanes = 20;
let plane;
for (let i = 0; i < numPlanes; i += 1) {
  plane = getPlane(i);
  planes.push(plane);
  scene.add(plane.mesh);
}

let timeMult = 0.0004;
function animate(timeStep) {
  requestAnimationFrame(animate);
  planes.forEach((p) => p.update(timeStep * timeMult));
  renderer.render(scene, camera);
}
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
