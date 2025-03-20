
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.position.set(0, 0, 0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 200);

// const camera = new THREE.OrthographicCamera( 1000 / - 2, 1000 / 2, 500 / 2, 500 / - 2, 1, 1000 );
// scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function pointsIdentification(x, y, z) {
    const ch = new THREE.SphereGeometry(1)
    const chmat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(x, y, z);
    scene.add(chmesh)
}

//#region Function 18 (tubeGeometry)
function fun18() {
    
    const origin = new THREE.Vector2(0, 0);
    const width = 90, height = 90;
    const depth = 10;
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(origin.x, origin.y, 0),
        new THREE.Vector3(origin.x + width, origin.y - width / 10, 0),

    ]);
    for (let i = 0; i < curve.points.length; i++) {
        const element = curve.points[i];
        pointsIdentification(element.x)
        console.log(element);
    }

    const geometry = new THREE.TubeGeometry(curve, 10, depth, 10, false);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);

    // Create edges geometry and line segments
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'white' });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    scene.add(lineSegments)

    scene.add(mesh);
    camera.position.z = 100;
}
//#endregion


//#region Function 19  Object Hierarchy 
function fun19() {

    const helper = new THREE.AxesHelper(100);
    scene.add(helper);

    
    const box = new THREE.BoxGeometry(50 ,50 ,50);
    const Material = new THREE.MeshBasicMaterial({color : 'red' , wireframe : true});
    const boxMesh = new THREE.Mesh(box , Material);
    scene.add(boxMesh);
    boxMesh.position.set(100, 0 ,0 )


    const sphere = new THREE.SphereGeometry(25);
    const sphereMesh = new THREE.Mesh(sphere , Material);
    
    // scene.add(sphereMesh)
    boxMesh.add(sphereMesh)

}
//#endregion

fun19();

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
