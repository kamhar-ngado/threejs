import "./style.css";
import * as THREE from "three";
import { Material, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const white = 0xffffff;
const blue = 0x5391c9;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: blue,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.PointLight(blue);
light.position.set(50, 50, 50);

const ambientlight = new THREE.AmbientLight(white);
scene.add(light, ambientlight);

const lightHelper = new THREE.PointLightHelper(light);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: white });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const galaxy = new THREE.TextureLoader().load("img/galaxy.jpg");
scene.background = galaxy;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
