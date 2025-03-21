//#region  import abd Helper
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { log } from 'three/tsl';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

function pointsIdentification(x, y) {
    const ch = new THREE.SphereGeometry(0.5)
    const chmat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(x, y);
    scene.add(chmesh)
}

//#endregion



//#region Handle (fun 20 - 23 )
const turnRight = false;

//#region Function  20  Lock Base 
function fun20() {
    const width = 10, height = 29, radius = 7;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    path.moveTo(origin.x, origin.y + height / 2);
    path.absarc(origin.x, origin.y + radius, radius, Math.PI * 1.5, Math.PI / 2, false);
    path.quadraticCurveTo(origin.x - 5, origin.y + radius * 2, origin.x - 5, origin.y + radius * 2 + height / 4)
    path.lineTo(origin.x - width, origin.y + radius * 2 + height / 4)
    path.lineTo(origin.x - width, origin.y - height / 4)
    path.lineTo(origin.x - 5, origin.y - height / 4)
    path.quadraticCurveTo(origin.x - 5, origin.y, origin.x, origin.y)
    path.lineTo()
    const extrudeSettings = {
        depth: 5,
        bevelEnabled: false
    };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshNormalMaterial({ wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(0, 56, - 11);

    scene.add(mesh);

    const lock = fun21();
    path.add(lock);


    const circle1 = new THREE.Mesh(new THREE.CircleGeometry(1.5), new THREE.MeshBasicMaterial({ wireframe: false }));
    const circle2 = new THREE.Mesh(new THREE.CircleGeometry(1.5), new THREE.MeshBasicMaterial({ wireframe: false }));
    circle1.position.set(-7, 52, - 5.9);
    circle2.position.set(-7, 72, - 5.9);
    scene.add(circle1)
    scene.add(circle2)


    if (turnRight) {
        mesh.rotateY(Math.PI);
        mesh.position.set(5, 56, - 6)
        circle1.position.set(12.5, 52, - 5.9);
        circle2.position.set(12.5, 72, - 5.9);
    }

    return geo;

}
//#endregion

//#region Function  21  // Lock Handle 
function fun21() {
    const depth = 5, width = 30, height = 50, slice = 10;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    // pointsIdentification(origin.x, origin.y)
    path.moveTo(origin.x, origin.y);
    path.absarc(origin.x + depth / 2, origin.y, depth / 2, Math.PI, 0, false);
    path.lineTo(origin.x + depth, origin.y + height)
    path.lineTo(origin.x, origin.y + height)
    const extrudeSettings = {
        depth: 2,
        bevelEnabled: false
    };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    scene.add(mesh);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    const line = new THREE.Line(geo, lineMaterial);
    scene.add(line);

    const upperCurve = fun22();
    path.add(upperCurve)


    const upperLock = fun23();
    path.add(upperLock)
}
//#endregion

//#region Function  22 // Lock Curve
function fun22() {
    const help = new THREE.AxesHelper(10);
    // scene.add(help)
    const innerRadius = 3, deep = 2;
    const path = new THREE.Shape();
    const origin = new THREE.Vector2(0, 50);
    path.moveTo(origin.x, origin.y);
    path.absarc(origin.x + innerRadius, origin.y, innerRadius, Math.PI, Math.PI / 2, true);
    path.absarc(origin.x + innerRadius, origin.y + innerRadius * 2, innerRadius, Math.PI * 1.5, 0, false);
    path.lineTo(origin.x + innerRadius * 2 - deep, origin.y + innerRadius * 2)
    path.absarc(origin.x + innerRadius, origin.y + innerRadius * 2, innerRadius - deep, 0, Math.PI * 1.5, true);
    path.absarc(origin.x + innerRadius, origin.y, innerRadius + deep, Math.PI / 2, Math.PI, false);

    path.lineTo(origin.x, origin.y);
    // pointsIdentification(origin.x , origin.y)

    const curveWidth = 5;
    const extrudeSettings = {
        depth: curveWidth,
        bevelEnabled: false
    };
    const geo = new THREE.ExtrudeGeometry(path, extrudeSettings);
    const geoMat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.rotateY(Math.PI / 2)
    scene.add(mesh);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    const line = new THREE.Line(geo, lineMaterial);
    mesh.add(line);
}
//#endregion

//#region Function  23 // Lock 
function fun23() {
    const help = new THREE.AxesHelper(10);
    // scene.add(help)
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
    const geoMat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false });
    const mesh = new THREE.Mesh(geo, geoMat);
    mesh.position.set(origin.x + lockWidth / 2, origin.y + 59, -6)
    if (turnRight) {
        mesh.rotateY(Math.PI)
        mesh.position.set(origin.x + 0.25, origin.y + 59, -4)
    }
    scene.add(mesh);

    var lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    var line = new THREE.Line(geo, lineMaterial);
    mesh.add(line);

    const radius = lockHeight / 2.5;
    const widthSegments = 15;
    const heightSegments = 15;
    const phiStart = 0;
    const phiLength = Math.PI;

    const hemisphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength);
    const matSphere = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false });
    const sphereMesh = new THREE.Mesh(hemisphereGeometry, matSphere)
    sphereMesh.position.set(-lockWidth / 2, lockHeight / 2, deepLock - 1);
    mesh.add(sphereMesh)

    if (turnRight) {
        sphereMesh.rotateY(Math.PI)
    }

    var lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    var line = new THREE.Line(hemisphereGeometry, lineMaterial);
    sphereMesh.add(line);

    return mesh;
}
//#endregion

//#endregion



//#region Function Hierarchy 

// let ac = [];
// let counbt = 0;
// function getAllChildren(mesh) {
//     mesh.children.forEach(child => {
//         console.log(++counbt);
//         ac.push(child);
//         if (child.children.lenght > 0) {
//             getAllChildren(child);
//         }
//     });
//     return ac;
// }
// console.log(ac);

// function getAllChildrenOfANyMesh(mesh) {
//     let arr = [];
//     getChildrenOfAnyMesh(mesh, arr)
//     return arr;
// }


// function getChildrenOfAnyMesh(mesh, parentArray) {
//     for (const child of mesh.children) {
//         parentArray.push(child);
//         if (child.children.length > 0) {
//             getChildrenOfAnyMesh(child, parentArray);
//         }
//     }
// }


function getAllChildren(mesh, ac = []) {
    mesh.children.forEach(child => {
        ac.push(child);
        if (child.children.length > 0) {
            getAllChildren(child, ac);
        }
    });
    return ac;
}


function fun25() {
    const hell = new THREE.AxesHelper(5);
    // scene.add(hell);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: 'green', wireframe: true }));
    cube.position.set(0, -10, 0)
    scene.add(cube);
    cube.add(fun26());
    cube.add(fun28());

    // const allChildren = []
    // let chi =  ;

    // const x = getAllChildrenOfANyMesh(cube);
    // console.log("Cube", x);



    let allChildren = getAllChildren(cube);
    console.log(allChildren);

}
function fun26() {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(10), new THREE.MeshBasicMaterial({ color: 'white', wireframe: true }));
    sphere.position.set(-10, 0, 0);
    sphere.add(fun27(10))
    sphere.add(fun27(20))
    return sphere;
}

function fun28() {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(5, 20, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    cone.position.set(10, 0, 0)
    cone.add(fun27(20))
    return cone;
}

function fun27(l) {
    const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(2, 3, 100, 16), new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
    torusKnot.position.set(0, l, 0)
    return torusKnot;
}
//#endregion

// Base();
fun25();






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
