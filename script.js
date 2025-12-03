// *******************************
//  Programming Assignment – Unit 3
//  Bouncing 3D Object with Color Change
//  Author: Safal Panta
// *******************************

// ----- SCENE SETUP -----
const scene = new THREE.Scene();
// Light faded yellow background as requested (hex #FFFFAA)
scene.background = new THREE.Color(0xFFFFAA);

// ----- CAMERA -----
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5; // Move camera back to see object

// ----- RENDERER -----
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ----- LIGHTING -----
// Soft yellow light (FFFFAA) from upper-left
const light = new THREE.DirectionalLight(0xFFFFAA, 1.2);
light.position.set(-5, 5, 5);   // Upper-left corner
scene.add(light);

// ----- CREATE 3D OBJECT -----
// You can switch to THREE.BoxGeometry() or THREE.TorusKnotGeometry()
const geometry = new THREE.SphereGeometry(0.3, 32, 32);

// Initial base color
let objectColor = new THREE.Color(0x00ff00);
const material = new THREE.MeshStandardMaterial({ color: objectColor });

const myMesh = new THREE.Mesh(geometry, material);
scene.add(myMesh);

// ----- MOVEMENT VARIABLES -----
// Small increments to keep movement smooth
let dx = 0.02;
let dy = 0.015;

// Scene boundaries (experiment as needed)
// Scene boundaries — compute from camera frustum so edges match the view
function computeLimits(objectRadius = 0.3, objectZ = 0) {
  const distance = Math.abs(camera.position.z - objectZ);
  const vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians
  const height = 2 * Math.tan(vFOV / 2) * distance;
  const width = height * camera.aspect;
  return { x: width / 2 - objectRadius, y: height / 2 - objectRadius };
}

let { x: LIMIT_X, y: LIMIT_Y } = computeLimits(0.3, 0);

// ----- RANDOM COLOR FUNCTION -----
// Return a THREE.Color with a random vibrant color
function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

// ----- ANIMATE LOOP -----
function animate() {
  requestAnimationFrame(animate);

  // Move object
  myMesh.position.x += dx;
  myMesh.position.y += dy;

  // ----- BOUNCE LOGIC -----
  // If hitting left or right
  if (myMesh.position.x > LIMIT_X) {
    myMesh.position.x = LIMIT_X; // clamp so we don't keep flipping
    dx = -Math.abs(dx);
    material.color.copy(getRandomColor());
  } else if (myMesh.position.x < -LIMIT_X) {
    myMesh.position.x = -LIMIT_X;
    dx = Math.abs(dx);
    material.color.copy(getRandomColor());
  }

  if (myMesh.position.y > LIMIT_Y) {
    myMesh.position.y = LIMIT_Y;
    dy = -Math.abs(dy);
    material.color.copy(getRandomColor());
  } else if (myMesh.position.y < -LIMIT_Y) {
    myMesh.position.y = -LIMIT_Y;
    dy = Math.abs(dy);
    material.color.copy(getRandomColor());
  }

  renderer.render(scene, camera);
}

animate();

// ----- RESIZE HANDLER -----
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Recompute limits so the bounce area always matches the visible frustum
  const limits = computeLimits(0.3, 0);
  LIMIT_X = limits.x;
  LIMIT_Y = limits.y;
});
