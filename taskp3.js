//#region  import abd Helper
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

function pointsIdentification(x, y) {
    const ch = new THREE.SphereGeometry(0.5)
    const chmat = new THREE.MeshPhysicalMaterial({ color: 'blue' })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(x, y);
    scene.add(chmesh)
}

// White directional light at half intensity shining from the top.
const directionalTop = new THREE.DirectionalLight(0xffffff, 1);
directionalTop.position.set(0, 50, 0)
scene.add(directionalTop);

const directionalDown = new THREE.DirectionalLight(0xffffff, 1);
directionalDown.position.set(0, -20, -50)
scene.add(directionalDown);

const directionalRight = new THREE.DirectionalLight(0xffffff, 1);
directionalRight.position.set(50, 0, 50)
scene.add(directionalRight);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight4.position.set(-50, 0, 0)
scene.add(directionalLight4);

//#endregion



//#region Handle (fun 20 - 23 )
const turnRight = 0;

//LOCK BASE
function fun20() {
    const x_handle_Position = 0, y_handle_Position = 0, z_handle_Position = 0;
    const width = 10, height = 29, radius = 7;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    path.moveTo(origin.x, origin.y + height / 2);
    path.absarc(origin.x, origin.y + radius, radius, Math.PI * 1.5, Math.PI / 2, false);
    path.quadraticCurveTo(origin.x - 5, origin.y + radius * 2, origin.x - 5, origin.y + radius * 2 + height / 4);
    path.lineTo(origin.x - width, origin.y + radius * 2 + height / 4);
    path.lineTo(origin.x - width, origin.y - height / 4);
    path.lineTo(origin.x - 5, origin.y - height / 4);
    path.quadraticCurveTo(origin.x - 5, origin.y, origin.x, origin.y);

    const LockExtrude = 5;
    const extrudeSettings = { depth: LockExtrude, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({ color: '#e4e6e8' });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(x_handle_Position, y_handle_Position, z_handle_Position)
    scene.add(mesh);

    const circle1 = new THREE.Mesh(new THREE.CircleGeometry(1.5), new THREE.MeshPhysicalMaterial({ wireframe: false, side: THREE.DoubleSide }));
    const circle2 = new THREE.Mesh(new THREE.CircleGeometry(1.5), new THREE.MeshPhysicalMaterial({ wireframe: false, side: THREE.DoubleSide }));
    circle1.position.set(-7.5, -4, LockExtrude + 0.1)
    circle2.position.set(-7.5, height / 2 + 3, LockExtrude + 0.1)
    mesh.add(circle1);
    mesh.add(circle2);

    if (turnRight) {
        mesh.rotateY(Math.PI);
        circle1.position.set(-7.5, -4, -0.1)
        circle2.position.set(-7.5, height / 2 + 3, -0.1)
    }

    const pit = new THREE.Shape();
    const pos = new THREE.Vector2(0 , 0);
    const rad = 0.5;
    pit.moveTo(pos.x , pos.y);
    pit.absarc( pos.x , pos.y , rad , Math.PI * 1.5 , Math.PI * 0.5 , false);
    pit.absarc( pos.x - rad, pos.y + rad, rad , 0 , Math.PI  , false);
    pit.absarc( pos.x - rad * 2 , pos.y , rad  , Math.PI / 2 , Math.PI * 1.5  , false);
    pit.absarc( pos.x - rad, pos.y - rad, rad , Math.PI , 0   , false);
    
    const pitHole = new THREE.ExtrudeGeometry(pit, { depth: 0.1, bevelEnabled: false });
    const pitHoleMat = new THREE.MeshPhysicalMaterial({ color: 'black' });
    const meshPit = new THREE.Mesh(pitHole, pitHoleMat);
    meshPit.position.set(rad , 0 , 0 )
    circle1.add(meshPit);

    const pitHole2 = pitHole.clone();
    const meshPit2 = new THREE.Mesh(pitHole2, pitHoleMat);
    meshPit2.position.set(rad , 0 , 0 )
    circle2.add(meshPit2)    

    const lock = fun23();
    mesh.add(lock);
}

// LOCK HANDLE
function fun21() {
    const depth = 5.3, height = 50;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, -height);

    path.moveTo(origin.x, origin.y);
    path.absarc(origin.x + depth / 2, origin.y, depth / 2, Math.PI, 0, false);
    path.lineTo(origin.x + depth, origin.y + height);
    path.lineTo(origin.x, origin.y + height);

    const extrudeSettings = { depth: 2, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({ color: '#f2f3f4', wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);

    mesh.position.set(-4.85, -9, 6)

    const curve = fun22();
    mesh.add(curve);

    if (turnRight) {
        mesh.rotateY(Math.PI)
        mesh.position.set(0.5, -9, -4)
    }
    return mesh;
}


// HANDLE CURVATURE 
function fun22() {
    const innerRadius = 3, deep = 2;
    const path = new THREE.Shape();
    const heightOfHandle = 0;
    const origin = new THREE.Vector2(0, heightOfHandle);

    path.moveTo(origin.x, origin.y);
    path.absarc(origin.x + innerRadius, origin.y, innerRadius, Math.PI, Math.PI / 2, true);
    path.absarc(origin.x + innerRadius, origin.y + innerRadius * 2, innerRadius, Math.PI * 1.5, 0, false);
    path.lineTo(origin.x + innerRadius * 2 - deep, origin.y + innerRadius * 2);
    path.absarc(origin.x + innerRadius, origin.y + innerRadius * 2, innerRadius - deep, 0, Math.PI * 1.5, true);
    path.absarc(origin.x + innerRadius, origin.y, innerRadius + deep, Math.PI / 2, Math.PI, false);

    const extrudeSettings = { depth: 5.3, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({ color: '#f2f3f4', wireframe: false , roughness : 100 , metalness : 0});
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.rotateY(Math.PI / 2);

    return mesh;
}


// LOCK 
function fun23() {
    const lockHeight = 10, lockWidth = 9.5;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    path.quadraticCurveTo(origin.x + 1, origin.y, origin.x + 0.5, origin.y + lockHeight / 2);
    path.quadraticCurveTo(origin.x, origin.y + lockHeight - lockHeight / 4, origin.x - lockWidth / 3, origin.y + lockHeight);
    path.quadraticCurveTo(origin.x - lockWidth / 3 - lockWidth / 4, origin.y + lockHeight + 0.4, origin.x - lockWidth / 3 - lockWidth / 2, origin.y + lockHeight);
    path.quadraticCurveTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 6, origin.y + lockHeight - lockHeight / 6, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 3, origin.y + lockHeight - lockHeight / 5);
    path.bezierCurveTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 4 - lockWidth / 2, origin.y + lockHeight - lockHeight / 3, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth, origin.y + lockHeight / 1.5, origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 8 - lockWidth / 2, origin.y + lockHeight / 4);
    path.lineTo(origin.x - lockWidth / 3 - lockWidth / 2 - lockWidth / 3, origin.y + lockHeight / 10);
    path.lineTo(origin.x - lockWidth / 1.2, origin.y + lockHeight / 15);
    path.quadraticCurveTo(origin.x - lockWidth / 2, origin.y + lockHeight / 15, origin.x - lockWidth / 2, origin.y - lockHeight / 3)
    path.lineTo(origin.x + 0.2, origin.y - lockHeight / 3)
    path.quadraticCurveTo(origin.x + 1, origin.y, origin.x, origin.y + lockHeight / 2)

    const deepLock = 2;
    const extrudeSettings = {
        depth: deepLock,
        bevelEnabled: false
    };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshPhysicalMaterial({ color: '#f2f3f4', wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(2, 3, 5)

    const radius = lockHeight / 2.5;
    const hemisphereGeometry = new THREE.SphereGeometry(radius, 15, 15, 0, Math.PI);
    const matSphere = new THREE.MeshPhysicalMaterial({ color: '#f2f3f4', wireframe: false });
    const sphereMesh = new THREE.Mesh(hemisphereGeometry, matSphere);
    sphereMesh.position.set(-lockWidth / 2, lockHeight / 2, 1);
    mesh.add(sphereMesh);

    if (turnRight) {
        mesh.position.set(2, 2, -2);
        sphereMesh.position.set(-5, lockHeight / 2, -0.1);
        sphereMesh.rotateX(Math.PI)
    }

    const HandleLock = fun21();
    mesh.add(HandleLock);

    return mesh;
}

function fun24() {
    
    scene.add(meshPit);

}
// Call the parent function
fun20();


//#region Render

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

//#endregion


