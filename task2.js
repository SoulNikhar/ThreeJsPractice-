import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

let sceneObjects = [];

const controls = new OrbitControls(camera, renderer.domElement);

const baseGeometry = new THREE.BoxGeometry(5, 0.2, 5);
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: false,
});
const baseBox = new THREE.Mesh(baseGeometry, baseMaterial);
baseBox.receiveShadow = true;
scene.add(baseBox);


const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

function removePreviousObjects() {
  sceneObjects.forEach((e) => {
    if (e.isMesh && e.geometry) e.geometry.dispose();
    if (e.isMesh && e.material) e.material.dispose();
    scene.remove(e);
  });
  sceneObjects = [];
}

function addShadowsToLight(light) {
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50;
}


function addPointLightsAndCubes() {
  removePreviousObjects();
  const light1 = new THREE.PointLight(0xffffff, 50);
  light1.position.set(0, 5, 0);
  addShadowsToLight(light1);
  scene.add(light1);
  sceneObjects.push(light1);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material1 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  const cube1 = new THREE.Mesh(geometry, material1);
  cube1.position.set(-1, 1, 0);
  cube1.castShadow = true;
  scene.add(cube1);
  sceneObjects.push(cube1);

  const cube2 = new THREE.Mesh(geometry, material2);
  cube2.position.set(1, 1, 0);
  cube2.castShadow = true;
  scene.add(cube2);
  sceneObjects.push(cube2);
}

function addDirectionalLightsAndSpheres() {
  removePreviousObjects();
  const light1 = new THREE.DirectionalLight(0xff0000, 1);
  light1.position.set(1, 3, 3);
  addShadowsToLight(light1);
  scene.add(light1);
  sceneObjects.push(light1);

  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material1 = new THREE.MeshNormalMaterial();
  const material2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });

  const sphere1 = new THREE.Mesh(geometry, material1);
  sphere1.position.set(-1, 1, 1);
  sphere1.castShadow = true;
  scene.add(sphere1);
  sceneObjects.push(sphere1);

  const sphere2 = new THREE.Mesh(geometry, material2);
  sphere2.position.set(1, 1, -1);
  sphere2.castShadow = true;
  scene.add(sphere2);
  sceneObjects.push(sphere2);
}


function addSpotLightsAndCones() {
  removePreviousObjects();

  // Set up the first spotlight
  const light1 = new THREE.SpotLight(0x0000ff, 5);
  light1.position.set(2, 4, 2);
  light1.castShadow = true; // Enable shadow for the light
  scene.add(light1);
  sceneObjects.push(light1);

  // Set up the second spotlight
  const light2 = new THREE.SpotLight(0xff00ff, 10);
  light2.position.set(-2, 4, -2);
  light2.castShadow = true; // Enable shadow for the light
  scene.add(light2);
  sceneObjects.push(light2);

  // Set up geometry and materials for the cones
  const geometry = new THREE.ConeGeometry(0.5, 1, 32);
  const material1 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const material2 = new THREE.MeshStandardMaterial({ color: 0xff00ff });

  // Create and position the first cone
  const cone1 = new THREE.Mesh(geometry, material1);
  cone1.position.set(-1, 0.5, 1);
  cone1.castShadow = true; // Enable shadow for the cone
  cone1.receiveShadow = true; // Enable receiving shadow for the cone
  scene.add(cone1);
  sceneObjects.push(cone1);

  // Create and position the second cone
  const cone2 = new THREE.Mesh(geometry, material2);
  cone2.position.set(1, 0.5, -1);
  cone2.castShadow = true; // Enable shadow for the cone
  cone2.receiveShadow = true; // Enable receiving shadow for the cone
  scene.add(cone2);
  sceneObjects.push(cone2);

  // Ensure the scene renderer has shadows enabled
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use softer shadows
}

 
function addHemisphereLightAndTorusKnot() {
  removePreviousObjects();

  const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 64, 16);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffa500,
    wireframe: false,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.position.set(0, 2, 0);
  torusKnot.castShadow = true;
  torusKnot.receiveShadow = true;
  scene.add(torusKnot);
  sceneObjects.push(torusKnot);

  const hemiLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 2);
  hemiLight.position.set(0, 5, 0);
  scene.add(hemiLight);
  sceneObjects.push(hemiLight);

  // Add a DirectionalLight for shadow casting
  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(2, 5, 2);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 10;
  scene.add(dirLight);
  sceneObjects.push(dirLight);

  // Enable shadows in the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function addRectAreaLightAndCylinder() {
  removePreviousObjects();

  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x008080 });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(0, 1.5, 0);
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  scene.add(cylinder);
  sceneObjects.push(cylinder);

  const rectLight = new THREE.RectAreaLight(0xffffff, 5, 7, 5);
  rectLight.position.set(0, 4, 2);
  scene.add(rectLight);
  sceneObjects.push(rectLight);

  // Add a SpotLight for shadow casting
  const spotLight = new THREE.SpotLight(0xffffff, 3);
  spotLight.position.set(2, 5, 2);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.5;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);
  sceneObjects.push(spotLight);

  // Enable shadows in the renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function addDirectionalLightAndTube() {
  removePreviousObjects();

  const light = new THREE.DirectionalLight(0x008000, 5);
  light.position.set(0, 3, 8);
  light.castShadow = true; // Enable shadows
  scene.add(light);
  sceneObjects.push(light);

  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1, 0, 1),
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(1, 1, -1),
    new THREE.Vector3(-1, 0, -1),
    new THREE.Vector3(-1, 0 , 1)
  ]); 
  const geometry = new THREE.TubeGeometry(path, 20, 0.2, 8, false);
  const material = new THREE.MeshStandardMaterial({ color: 0x000f0ff });
  const tube = new THREE.Mesh(geometry, material);
  tube.position.set(0, 1.5, 0);
  tube.castShadow = true;
  tube.receiveShadow = true;
  scene.add(tube);
  sceneObjects.push(tube);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function addSpotLightAndTetrahedron() {
  removePreviousObjects();

  const light = new THREE.SpotLight(0xff0000, 10);
  light.position.set(0, 4, 0);
  light.castShadow = true;
  scene.add(light);
  sceneObjects.push(light);

  const geometry = new THREE.TetrahedronGeometry(0.7);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const tetrahedron = new THREE.Mesh(geometry, material);
  tetrahedron.position.set(0, 0.5, 0);
  tetrahedron.castShadow = true;
  tetrahedron.receiveShadow = true;
  scene.add(tetrahedron);
  sceneObjects.push(tetrahedron);
}

function addPointLightAndSphere() {
  removePreviousObjects();

  const light = new THREE.PointLight(0x00ffff, 70);
  light.position.set(0, 2, 2);
  light.castShadow = true;
  scene.add(light);
  sceneObjects.push(light);

  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0xff4500 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 1, 0);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);
  sceneObjects.push(sphere);
}

function addAmbientLightAndDodecahedron() {
  removePreviousObjects();

  const light = new THREE.AmbientLight(0x404040, 10);
  scene.add(light);
  sceneObjects.push(light);

  // Add a directional light for shadows (since AmbientLight does not cast shadows)
  const shadowLight = new THREE.DirectionalLight(0xffffff, 5);
  shadowLight.position.set(2, 5, 2);
  shadowLight.castShadow = true;
  scene.add(shadowLight);
  sceneObjects.push(shadowLight);

  const geometry = new THREE.DodecahedronGeometry(0.7);
  const material = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: false });
  const dodecahedron = new THREE.Mesh(geometry, material);
  dodecahedron.position.set(0, 1, 0);
  dodecahedron.castShadow = true;
  dodecahedron.receiveShadow = true;
  scene.add(dodecahedron);
  sceneObjects.push(dodecahedron);
}

function addSpotLightAndOctahedron() {
  removePreviousObjects();

  const light = new THREE.SpotLight(0x0000ff, 10);
  light.position.set(2, 3, 0);
  light.castShadow = true;
  scene.add(light);
  sceneObjects.push(light);

  const light2 = new THREE.SpotLight(0x0000ff, 10);
  light2.position.set(0, 3, 0);
  light2.castShadow = true;
  scene.add(light2);
  sceneObjects.push(light2);

  const geometry = new THREE.OctahedronGeometry(0.6);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
  const octahedron = new THREE.Mesh(geometry, material);
  octahedron.castShadow = true;
  octahedron.receiveShadow = true;
  scene.add(octahedron);
  sceneObjects.push(octahedron);
}

function addRectAreaLightAndTorus() {
  removePreviousObjects();

  const light = new THREE.RectAreaLight(0xffffff, 20);
  light.position.set(0, 1, 0);
  scene.add(light);
  sceneObjects.push(light);

  // Add a SpotLight for shadows (since RectAreaLight does not cast shadows)
  const shadowLight = new THREE.SpotLight(0xffffff, 5);
  shadowLight.position.set(3, 3, 3);
  shadowLight.castShadow = true;
  scene.add(shadowLight);
  sceneObjects.push(shadowLight);

  const geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x0000ff });
  const torus = new THREE.Mesh(geometry, material);
  torus.castShadow = true;
  torus.receiveShadow = true;
  scene.add(torus);
  sceneObjects.push(torus);
}

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "1":
      addPointLightsAndCubes();
      break;
    case "2":
      addDirectionalLightsAndSpheres();
      break;
    case "3":
      addSpotLightsAndCones();
      break;
    case "4":
      removePreviousObjects();
      break;
    case "5":
      addHemisphereLightAndTorusKnot();
      break;
    case "6":
      addRectAreaLightAndCylinder();
      break;
    case "7":
      addDirectionalLightAndTube();
      break;
    case "8":
      addSpotLightAndTetrahedron();
      break;
    case "9":
      addPointLightAndSphere();
      break;
    case "0":
      addAmbientLightAndDodecahedron();
      break;
    case "q":
      addSpotLightAndOctahedron();
      break;
    case "w":
      addRectAreaLightAndTorus();
      break;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();






























// -------------------   code 1   -------------------
// The code below is a refactored version of the code above.


// import * as THREE from 'three';
// import { GUI } from 'lil-gui';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(5, 5, 10);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 2);
// pointLight.position.set(0, 3, 1);
// pointLight.castShadow = true;
// scene.add(pointLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// directionalLight.position.set(-5, 8, 5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// const spotLight = new THREE.SpotLight(0xffffff, 10, 20 , Math.PI / 2);
// spotLight.position.set(3, 4, 0);
// spotLight.castShadow = true;
// scene.add(spotLight);

// // const hemisphereLight = new THREE.HemisphereLight(0x00ffff , 0xff00ff, 10);
// // hemisphereLight.position.set(1.5,-1,1);
// // scene.add(hemisphereLight);


// // const helper = new THREE.CameraHelper(spotLight.shadow.camera);
// // scene.add(helper);



// const floorGeometry = new THREE.PlaneGeometry(20, 20);
// const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.rotation.x = -Math.PI / 2;
// floor.position.y = -1;
// floor.receiveShadow = true;
// scene.add(floor);

// const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(), material1);
// mesh1.position.set(-4, 1, 0);
// scene.add(mesh1);

// const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.8 });
// const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(), material2);
// mesh2.position.set(-1.5, 1, 0);
// mesh2.castShadow = true;
// scene.add(mesh2);

// const material3 = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 200 });
// const mesh3 = new THREE.Mesh(new THREE.BoxGeometry(), material3);
// mesh3.position.set(1.5, 1, 0);
// mesh3.castShadow = true;
// scene.add(mesh3);

// const material4 = new THREE.MeshPhysicalMaterial({ color: 0xffff00, roughness: 0.2, metalness: 0.7 });
// const mesh4 = new THREE.Mesh(new THREE.BoxGeometry(), material4);
// mesh4.position.set(4, 1, 0);
// mesh4.castShadow = true;
// scene.add(mesh4);

// const material5 = new THREE.MeshLambertMaterial({ color: 0x00ffff });
// const mesh5 = new THREE.Mesh(new THREE.BoxGeometry(), material5);
// mesh5.position.set(-4, 1, 2);
// mesh5.castShadow = true;
// scene.add(mesh5);

// const material6 = new THREE.MeshToonMaterial({ color: 0xff00ff  });
// const mesh6 = new THREE.Mesh(new THREE.BoxGeometry(), material6);
// mesh6.position.set(-1.5, 1, 2);
// mesh6.castShadow = true;
// scene.add(mesh6);

// const material7 = new THREE.MeshNormalMaterial();
// const mesh7 = new THREE.Mesh(new THREE.BoxGeometry(), material7);
// mesh7.position.set(1.5, 1, 2);
// mesh7.castShadow = true;
// scene.add(mesh7);

// const material8 = new THREE.MeshMatcapMaterial();
// const mesh8 = new THREE.Mesh(new THREE.BoxGeometry(), material8);
// mesh8.position.set(4, 1, 2);
// mesh8.castShadow = true;
// scene.add(mesh8);

// const gui = new GUI();
// const lightFolder = gui.addFolder('Light Controls');
// lightFolder.add(ambientLight, 'intensity', 0, 10, 0.01).name('Ambient Light');
// lightFolder.add(pointLight, 'intensity', 0, 10, 0.01).name('Point Light');
// lightFolder.add(directionalLight, 'intensity', 0, 10, 0.01).name('Directional Light');
// lightFolder.add(spotLight, 'intensity', 0, 10, 0.01).name('Spot Light');
// lightFolder.open();


// document.addEventListener('keydown' , (event) =>{
//     console.log(event);
//     switch (event.key) {
//         case '1':
//             ambientLight.visible = !ambientLight.visible;
//             break;
//         case '2':
//             pointLight.visible = !pointLight.visible;
//             break;
//         case '3':
//             directionalLight.visible = !directionalLight.visible;
//             break;
//         case '4':
//             spotLight.visible = !spotLight.visible;
//             break;
//         case '5':
//             hemisphereLight.visible = !hemisphereLight.visible;
//             break;
    
//         default:
//             break;
//     }  
// })


// function animate() {
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });


// animate();

