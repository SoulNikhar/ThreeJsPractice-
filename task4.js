import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const origin = new THREE.Vector2(0, 0);
// console.log(origin.x, origin.y);

const height = 2,
  width = 2;
const shape = new THREE.Shape();
shape.moveTo(origin.x, origin.y);
shape.lineTo(origin.x + width, origin.y);
shape.lineTo(origin.x + width, origin.y + height);
shape.lineTo(origin.x + width + width, origin.y + height);
shape.lineTo(origin.x + width + width, origin.y + height + height);
shape.lineTo(origin.x + width, origin.y + height + height);
shape.lineTo(origin.x + width, origin.y + height + height + height);
shape.lineTo(origin.x, origin.y + height + height + height);
shape.lineTo(origin.x, origin.y + height + height);
shape.lineTo(origin.x - width, origin.y + height + height);
shape.lineTo(origin.x - width, origin.y + height);
shape.lineTo(origin.x, origin.y + height);
shape.lineTo(origin.x, origin.y);

const extrudeLength = 10;
class CustomCurve extends THREE.Curve {
  getPoint(t) {
    return new THREE.Vector3(extrudeLength * t, 0, 0);
  }
}
const customPath = new CustomCurve();

const extrudeSettings = {
  bevelEnabled: false,
  steps: 1,
  extrudePath: customPath,
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const vertices = [];
const positionAttribute = geometry.attributes.position;

for (let i = 0; i < positionAttribute.count; i++) {
  const x = positionAttribute.getX(i);
  const y = positionAttribute.getY(i);
  const z = positionAttribute.getZ(i);
  vertices.push([x, y, z]);
}

const uniqueVertices = [...new Set(vertices.map((v) => JSON.stringify(v)))].map(
  (v) => JSON.parse(v)
);

// console.log(uniqueVertices);

const maxX = Math.max(...uniqueVertices.map((v) => v[0]));
const lastCrossSection = uniqueVertices.filter((v) => v[0] === maxX);

const previousXValues = uniqueVertices.map((v) => v[0]).filter((x) => x < maxX);
const secondMaxX =
  previousXValues.length > 0 ? Math.max(...previousXValues) : null;
const previousCrossSection =
  secondMaxX !== null ? uniqueVertices.filter((v) => v[0] === secondMaxX) : [];

const distBetweenPointsPerpendicular =
  lastCrossSection[0][0] - previousCrossSection[0][0];
const distBetweenPointsBase = height;

let actualMaxAngle = Math.atan(
  distBetweenPointsPerpendicular / distBetweenPointsBase
);
// console.log(actualMaxAngle * (180 / Math.PI));

var angleDegrees = 28;
if (angleDegrees > actualMaxAngle * (180 / Math.PI)) {
  angleDegrees = actualMaxAngle * (180 / Math.PI);
}

const angleRadians = angleDegrees * (Math.PI / 180);
const distToMove = distBetweenPointsBase * Math.tan(angleRadians);

const verticesAtZero = uniqueVertices.filter((v) => v[0] === 0);
const verticesAtExtrudeLength = uniqueVertices.filter(
  (v) => v[0] === extrudeLength
);

console.log(verticesAtZero, verticesAtExtrudeLength);

const verticesToUpdate1 = verticesAtZero
  .filter(([x, y, z]) => !(x === 0 && y === 0 && (z === -2 || z === 0)))
  .map((v) => ({
    old: v,
    new: [v[0] + distToMove * (v[1] / 2), v[1], v[2]],
  }));

const verticesToUpdate2 = verticesAtExtrudeLength
  .filter(([x, y, z]) => !(x === extrudeLength && y === 0 && (z === -2 || z === 0)))
  .map((v) => ({
    old: v,
    new: [v[0] - distToMove * (v[1] / 2), v[1], v[2]],
  }));

console.log(verticesToUpdate1 , verticesToUpdate2);

verticesToUpdate1.forEach(({ old: oldVertex, new: newVertex }) => {
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    if (x === oldVertex[0] && y === oldVertex[1] && z === oldVertex[2]) {
      positionAttribute.setXYZ(i, newVertex[0], newVertex[1], newVertex[2]);
    }
  }
});
verticesToUpdate2.forEach(({ old: oldVertex, new: newVertex }) => {
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    if (x === oldVertex[0] && y === oldVertex[1] && z === oldVertex[2]) {
      positionAttribute.setXYZ(i, newVertex[0], newVertex[1], newVertex[2]);
    }
  }
});
positionAttribute.needsUpdate = true;
geometry.computeVertexNormals();
mesh.geometry = geometry;

const edgeMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 80,
});
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, edgeMaterial);
mesh.add(line);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
