//#region imports
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);
camera.position.set(0, 0, 500);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
const origin = new THREE.Vector2(0, 0);
//#endregion

//#region  function - 1
function fun1() {
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

    const extrudeSettings = {
        bevelEnabled: false,
        steps: 1,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 0),
        ]),
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

    const uniqueVertices = [
        ...new Set(vertices.map((v) => JSON.stringify(v))),
    ].map((v) => JSON.parse(v));

    console.log(uniqueVertices);
}
//#endregion

//#region  function - 2
function fun2() {
    camera.position.set(0, 0, 200);
    const points = [];
    function addPoint(x, y) {
        points.push(new THREE.Vector3(x, y, 0));
    }
    const shape = new THREE.Shape();
    shape.moveTo(25, 25);
    addPoint(25, 25);
    shape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    addPoint(20, 0);
    addPoint(0, 0);

    shape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    addPoint(-30, 0);
    addPoint(-30, 35);

    shape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    addPoint(-30, 55);
    addPoint(-10, 77);
    addPoint(25, 95);

    shape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    addPoint(60, 77);
    addPoint(80, 55);
    addPoint(80, 35);

    shape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    addPoint(80, 0);
    addPoint(50, 0);

    shape.bezierCurveTo(35, 0, 25, 25, 25, 25);
    addPoint(35, 0);
    addPoint(25, 25);

    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1 });
    const material = new THREE.MeshBasicMaterial({
        color: "#ff0000",
        wireframe: false,

    });
    const mesh = new THREE.Mesh(geometry, material);
    //   scene.add(mesh);

    const vertexMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
    points.forEach((point) => {
        const vertexGeometry = new THREE.SphereGeometry(1, 16, 16);
        const vertexMesh = new THREE.Mesh(vertexGeometry, vertexMaterial);
        vertexMesh.position.set(point.x, point.y, 0);
        // scene.add(vertexMesh);
    });

    const heart2 = new THREE.Shape();
    heart2.moveTo(0, 0);
    heart2.lineTo(-15, -25);
    heart2.lineTo(-30, -30);
    heart2.lineTo(-50, -25);
    heart2.lineTo(-60, 0);
    heart2.lineTo(-50, 25);
    heart2.lineTo(-30, 50);
    heart2.lineTo(-5, 70);
    heart2.lineTo(0, 75);


    const extrudeSettings = {
        depth: 10,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 0),
        ]),
    }

    const hgeometry = new THREE.ExtrudeGeometry(heart2, extrudeSettings);
    const hmaterial = new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: false });
    const hmesh = new THREE.Mesh(hgeometry, hmaterial);
    hmesh.rotateY(-Math.PI / 2)
    scene.add(hmesh);
}
//#endregion

//#region  function - 3
function fun3() {
    const shape = new THREE.Shape();
    const vertices = [];
    function addPoints(v) {
        vertices.push(new THREE.Vector3(v[0], v[1], 0));
    }
    shape.moveTo(5, -3);
    shape.bezierCurveTo(5, -3, 5, -3, 5, -3);
    shape.bezierCurveTo(5, -3, 4.5, -4.5, 4.5, -4.5);
    shape.bezierCurveTo(4.5, -4.5, 3, -5, 3, -5);
    shape.bezierCurveTo(3, -5, 2, -5, 2, -5);
    shape.bezierCurveTo(2, -5, 1, -4, 1, -4);
    shape.bezierCurveTo(1, -4, -1, -2, -1, -2);
    shape.bezierCurveTo(-1, -2, -2, -2, -2, -2);
    shape.bezierCurveTo(-2, -2, -3, -3, -3, -3);
    shape.bezierCurveTo(-3, -3, -3.5, -4, -3.5, -4);
    shape.bezierCurveTo(-3.5, -4, -5, -4, -5, -4);
    shape.bezierCurveTo(-5, -4, -6, -3, -6, -3);
    shape.bezierCurveTo(-6, -3, -6, -1, -6, -1);
    shape.bezierCurveTo(-6, -1, -5, 0, -5, 0);
    shape.bezierCurveTo(-5, 0, -4, 0, -4, 0);
    shape.bezierCurveTo(-4, 0, -3, 0, -3, 0);
    shape.bezierCurveTo(-3, 0, -2, 1, -2, 1);
    shape.bezierCurveTo(-2, 1, -2, 2, -2, 2);
    shape.bezierCurveTo(-2, 2, -3, 2.5, -3, 2.5);
    shape.bezierCurveTo(-3, 2.5, -5, 2.5, -5, 2.5);
    shape.bezierCurveTo(-5, 2.5, -6, 2, -6, 2);
    shape.bezierCurveTo(-6, 2, -7, 2.5, -7, 2.5);
    shape.bezierCurveTo(-7, 2.5, -7.5, 3.5, -7.5, 3.5);
    shape.bezierCurveTo(-7.5, 3.5, -7, 4.5, -7, 4.5);
    shape.bezierCurveTo(-7, 4.5, -6, 5, -6, 5);
    shape.bezierCurveTo(-6, 5, -5, 5, -5, 5);
    shape.bezierCurveTo(-5, 5, -4, 5, -4, 5);
    shape.bezierCurveTo(-4, 5, -3, 4.5, -3, 4.5);
    shape.bezierCurveTo(-3, 4.5, -2, 3.5, -2, 3.5);
    shape.bezierCurveTo(-2, 3.5, -1, 3.5, -1, 3.5);
    shape.bezierCurveTo(-1, 3.5, 0, 4.5, 0, 4.5);
    shape.bezierCurveTo(0, 4.5, 1, 5, 1, 5);
    shape.bezierCurveTo(1, 5, 2, 6, 2, 6);
    shape.bezierCurveTo(2, 6, 3, 6, 3, 6);
    shape.bezierCurveTo(3, 6, 4, 6, 4, 6);
    shape.bezierCurveTo(4, 6, 5, 5, 5, 5);
    shape.bezierCurveTo(5, 5, 5, 4, 5, 4);
    shape.bezierCurveTo(5, 4, 4.5, 3.5, 4.5, 3.5);
    shape.bezierCurveTo(4.5, 3.5, 4, 3, 4, 3);
    shape.bezierCurveTo(4, 3, 3, 3, 3, 3);
    shape.bezierCurveTo(3, 3, 2, 3, 2, 3);
    shape.bezierCurveTo(2, 3, 1.5, 2, 1.5, 2);
    shape.bezierCurveTo(1.5, 2, 2.5, 1, 2.5, 1);
    shape.bezierCurveTo(2.5, 1, 3.5, 0, 3.5, 0);
    shape.bezierCurveTo(3.5, 0, 3.5, -1, 3.5, -1);
    shape.bezierCurveTo(3.5, -1, 4.5, -2, 4.5, -2);


    addPoints([5, -3]);
    addPoints([4.5, -4.5]);
    addPoints([3, -5]);
    addPoints([2, -5]);
    addPoints([1, -4]);
    // addPoints([-1, -2]);
    // addPoints([-2, -2]);
    // addPoints([-3, -3]);
    // addPoints([-3.5, -4]);
    // addPoints([-5, -4]);
    // addPoints([-6, -3]);
    // addPoints([-6, -1]);
    // addPoints([-5, 0]);
    // addPoints([-4, 0]);
    // addPoints([-3, 0]);
    // addPoints([-2, 1]);
    // addPoints([-2, 2]);
    // addPoints([-3, 2.5]);
    // addPoints([-5, 2.5]);
    // addPoints([-6, 2]);
    // addPoints([-7, 2.5]);
    // addPoints([-7.5, 3.5]);
    // addPoints([-7, 4.5]);
    // addPoints([-6, 5]);
    // addPoints([-5, 5]);
    // addPoints([-4, 5]);
    // addPoints([-3, 4.5]);
    // addPoints([-2, 3.5]);
    // addPoints([-1, 3.5]);
    // addPoints([0, 4.5]);
    // addPoints([1, 5]);
    // addPoints([2, 6]);
    // addPoints([3, 6]);
    // addPoints([4, 6]);
    // addPoints([5, 5]);
    // addPoints([5, 4]);
    // addPoints([4.5, 3.5]);
    // addPoints([4, 3]);
    // addPoints([3, 3]);
    // addPoints([2, 3]);
    // addPoints([1.5, 2]);
    // addPoints([2.5, 1]);
    // addPoints([3.5, 0]);
    // addPoints([3.5, -1]);
    // addPoints([4.5, -2]);

    const extrudeSetting = {
        depth: 1,
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 1)
        ])
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    // console.log(vertices);

    vertices.forEach((v) => {
        const vertexGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
        const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
        vertexMesh.position.set(v.x, v.y, v.z);
        // scene.add(vertexMesh);
    });

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    scene.add(edges);
}
//#endregion

//#region  function - 4
function fun4() {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    // const circle = new THREE.CircleGeometry(2);
    // Create a shape for the circle
    const shape = new THREE.Shape();
    const radius = 2;
    const segments = 32;
    const angleStep = (Math.PI * 2) / segments;

    for (let i = 0; i <= segments; i++) {
        const theta = i * angleStep;
        shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }
    const extrudeSettings = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -5),
            // new THREE.Vector3(0, 5, 0)
        ])
    };
    const extrude = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const extrudeMesh = new THREE.Mesh(extrude, extrudeMaterial);
    scene.add(extrudeMesh);

}
//#endregion

//#region  function - 5
function fun5() {

    let helper = new THREE.GridHelper();
    helper.rotation.x = Math.PI * 0.5;
    scene.add(helper);

    function extrudePath(points, depth) {
        let geometry = new THREE.PlaneGeometry(0, 0, points.length - 1, 1);
        let pos = geometry.attributes.position;

        for (let i = 0, l = points.length, p; i < l; i++) {
            let p = points[i];
            pos.setXYZ(i, p.x, p.y, p.z + depth);
            pos.setXYZ(i + points.length, p.x, p.y, p.z)
        }

        geometry.computeVertexNormals();
        return geometry;
    }

    const pCount = 11;
    let controlPts = new Array(pCount).fill().map((p, idx) => {
        return new THREE.Vector3(-(pCount - 1) * 0.5 + idx, (Math.random() - 0.5) * 2, Math.random());
    });

    let curve = new THREE.CatmullRomCurve3(controlPts);
    let pts = curve.getSpacedPoints(100);

    let g = extrudePath(pts, 1);
    let m = new THREE.MeshBasicMaterial({ color: "aqua", wireframe: true });
    let o = new THREE.Mesh(g, m);
    scene.add(o);

}
//#endregion

//#region  function - 6
function fun6() {
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    const height = 300;
    var width = 100, diameter = 10;

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height);
    shape.quadraticCurveTo(origin.x, origin.y + height + height / 12, origin.x - width * 3.5 / 15, origin.y + height + height / 23);
    shape.lineTo(origin.x - width, origin.y + height - height / 10);
    shape.lineTo(origin.x - width, origin.y + height - height / 10 - height / 5);
    shape.lineTo(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.35 * height / 4));
    shape.quadraticCurveTo(origin.x - width * 2 / 5 - 2, origin.y + height + height / 10 - (1.35 * height / 4), origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.4 * height / 4));
    shape.lineTo(origin.x - width * 2 / 5, origin.y);
    shape.quadraticCurveTo(origin.x - width / 5, origin.y - width / 5, origin.x, origin.y);
    var radius = diameter / 2;
    if (radius > height / 8 || radius < 0 || radius > width / 2.5) {
        radius = Math.min(height / 8, width / 2.5 - 3, height / 10);
    }
    width = Math.max(width, 20);
    const hole = new THREE.Path();
    hole.absarc(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.3 * height / 4) + height / 10, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const extrudeSetting = {
        depth: 1,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);
}

//#endregion

//#region  function - 7
function fun7() {

    const vertices = [];
    function addPoints(v) {
        vertices.push(new THREE.Vector3(v[0], v[1], 0));
    }
    const origin = new THREE.Vector2(0, 0);
    const height = 100, width = 50;
    var radius = 20;

    const startAngle = 0;
    const endAngle = Math.PI / 2;
    console.log(startAngle, endAngle);

    const shape = new THREE.Shape();
    shape.moveTo(origin.x, origin.y);

    // shape.bezierCurveTo(origin.x, origin.y, origin.x, origin.y + height / 2, origin.x, origin.y + height );
    shape.absarc(origin.x, origin.y, radius, startAngle, endAngle, false);
    shape.lineTo()
    // shape.lineTo(origin.x, origin.y + height)
    // shape.quadraticCurveTo(origin.x - 20, origin.y + height + 10, origin.x - 40, origin.y + height);
    // shape.lineTo(origin.x , origin.y );
    // shape.bezierCurveTo( origin.x, origin.y + height, origin.x, origin.y + height, origin.x - width / 5, origin.y + height + 3);
    // shape.bezierCurveTo(origin.x - width / 5, origin.y + height + 3, origin.x - width * 2 / 5, origin.y + height + 3, origin.x - width, origin.y + height - height / 10);
    // shape.bezierCurveTo(origin.x - width, origin.y + height - height / 10, origin.x - width, origin.y + height - height / 10 - height / 4, origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4);
    // shape.bezierCurveTo(origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4, origin.x - width * 2 / 5, origin.y, origin.x, origin.y);

    const extrudeSetting = {
        depth: 1,
    }

    // const geo  = new THREE.ShapeGeometry(shape);
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const mesh = new THREE.Mesh(geo, mat);
    // mesh.rotateY( - Math.PI / 2)
    scene.add(mesh);

    const axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);

    let ch = 10;
    ch = 12;
    console.log(ch);

    var c = 100;
    var c = 102;
    console.log(c);

    function che() {
        let ch = 50;
        console.log(ch, c);
    }
    che();


    // const len = vertices.length;
    // console.log(getX(vertices[len - 1])  ,  vertices[0]);
    // addPoints([(vertices[0][0] - vertices[len - 1][0]) / 2, origin.y - height / 20]);

    const vertexGeo = new THREE.SphereGeometry(1);
    const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
    const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
    vertexMesh.position.set(origin.x - 20, origin.y + height + 10);
    scene.add(vertexMesh);
    //         hole.absarc(x, y, radius, 0, Math.PI * 2);
    //         shape.holes.push(hole);

}
//#endregion

//#region  function - 8
function fun8() {

    const shape = new THREE.Shape();
    const origin = { x: 0, y: 0 };
    const width = 10;
    const height = 20;

    const points = [
        new THREE.Vector2(origin.x, origin.y),
        new THREE.Vector2(origin.x, origin.y + height),
        // new THREE.Vector2(origin.x - width / 5 , origin.y + height + 3),
        new THREE.Vector2(origin.x - width / 5 + 1, origin.y + height + 3.5),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + 3),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + 3),
        // new THREE.Vector2(origin.x - width , origin.y + height - height / 10),
        new THREE.Vector2(origin.x - width + 1, origin.y + height - height / 10),
        new THREE.Vector2(origin.x - width + 1, origin.y + height - height / 10 - height / 4),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.3 * height / 4)),
        new THREE.Vector2(origin.x - width * 2 / 5, origin.y),
        new THREE.Vector2(origin.x - width / 5 + 1, origin.y - 2),
        new THREE.Vector2(origin.x, origin.y)
    ];

    const splineCurve = new THREE.SplineCurve(points);

    const splinePoints = splineCurve.getPoints(900);

    shape.moveTo(splinePoints[0].x, splinePoints[0].y);

    for (let i = 1; i < splinePoints.length; i++) {
        shape.lineTo(splinePoints[i].x, splinePoints[i].y);
    }

    shape.lineTo(splinePoints[0].x, splinePoints[0].y);

    const extrudeSettings = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 3)
        ])
    };
    const extrude = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const extrudeMesh = new THREE.Mesh(extrude, extrudeMaterial);
    extrudeMesh.rotateZ(Math.PI / 2);
    scene.add(extrudeMesh);

    const edgeo = new THREE.EdgesGeometry(extrude);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    extrudeMesh.add(edges);

}

//#endregion

//#region  function - 9
function fun9() {
    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);
    let width = 100, height = 100;
    let diameter = 8, depth = 10;

    if (diameter > depth) {
        diameter = depth;
    }
    width = Math.max(width, 90)
    height = Math.max(height, 60)
    depth /= 2;
    shape.moveTo(origin.x + 5, origin.y);
    shape.lineTo(origin.x + width - 5, origin.y);
    shape.quadraticCurveTo(origin.x + width, origin.y, origin.x + width, origin.y + 7);
    shape.lineTo(origin.x + width, origin.y + height / 3)
    shape.absarc(origin.x + width - depth, origin.y + height / 3, depth, 0, Math.PI, false);
    shape.lineTo(origin.x + width - depth - depth, origin.y + depth + depth + 5)
    shape.quadraticCurveTo(origin.x + width - depth - depth, origin.y + depth + depth, origin.x + width - depth - depth - 5, origin.y + depth + depth);
    shape.lineTo(origin.x + depth + depth + 5, origin.y + depth + depth);
    shape.quadraticCurveTo(origin.x + depth + depth, origin.y + depth + depth, origin.x + depth + depth, origin.y + depth * 2 + 5)
    shape.lineTo(origin.x + depth + depth, origin.y + height - depth - 20);
    shape.quadraticCurveTo(origin.x + depth + depth, origin.y + height - depth - 10, origin.x + depth + depth + 5, origin.y + height - depth - 5);
    shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + 10, origin.x + depth + depth + width / 2 - 5, origin.y + height - depth);
    shape.quadraticCurveTo(origin.x + depth + depth + width / 2, origin.y + height - depth - 5, origin.x + depth + depth + width / 2, origin.y + height - depth - 10)
    shape.lineTo(origin.x + depth + depth + width / 2, origin.y + height - depth - height / 6)
    shape.absarc(origin.x + depth + width / 2 + depth + depth, origin.y + height - depth - height / 6, depth, 0, Math.PI, true)  // circle 2 
    shape.lineTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height - depth - height / 6)
    shape.lineTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height + depth - 10)
    shape.quadraticCurveTo(origin.x + depth + depth + width / 2 + depth + depth, origin.y + height + depth, origin.x + depth + depth + width / 2 + depth + depth - 5, origin.y + height + depth + 5)
    shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + depth * 2 + 20, origin.x + 5, origin.y + height + depth + 5);
    shape.quadraticCurveTo(origin.x, origin.y + height + depth, origin.x, origin.y + height + depth - 10);
    shape.lineTo(origin.x, origin.y + height - depth);
    shape.lineTo(origin.x, origin.y + 5);
    shape.quadraticCurveTo(origin.x, origin.y, origin.x + 3, origin.y);
    const extrudeSetting = {
        depth: 10,
    }
    const radius = diameter / 2;
    const hole1 = new THREE.Path();
    hole1.absarc(origin.x + width - depth, origin.y + height / 3 - 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(origin.x + depth + depth + width / 2 + depth, origin.y + height - height / 9, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);

    // shape.quadraticCurveTo(origin.x + depth + depth, origin.y + height - depth - 10, origin.x + depth + depth + 5, origin.y + height - depth - 5);
    // shape.quadraticCurveTo((origin.x + depth * 5 + width / 2) / 2 - 5, origin.y + height + 10, origin.x + depth + depth + width / 2 - 5, origin.y + height - depth);
    // shape.quadraticCurveTo(origin.x + depth + depth + width / 2, origin.y + height - depth - 5, origin.x + depth + depth + width / 2, origin.y + height - depth - 10)


    const ch = new THREE.SphereGeometry(3)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    // chmesh.position.set(origin.x, origin.y + height - depth);
    // chmesh.position.set(origin.x + depth + depth, origin.y + height - depth - 10);
    // scene.add(chmesh)
}
//#endregion

//#region function - 10 
function fun10() {
    const radius = 10, depth = 35, height = 300, width = 300;
    const origin = new THREE.Vector2(0, 0);
    let shape = new THREE.Shape();

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height)
    shape.absarc(origin.x + width / 4, origin.y + height - depth, width / 4, Math.PI, 0, true);
    shape.absarc(origin.x + width / 2 - depth / 2, origin.y + height - depth, depth / 2, 0, Math.PI, true);
    shape.absarc(origin.x + width / 4, origin.y + height - depth, width / 4 - depth, 0, Math.PI, false);
    shape.moveTo(origin.x + depth, origin.y + height - depth);
    shape.lineTo(origin.x + depth, origin.y + depth)
    shape.lineTo(origin.x + width - depth, origin.y + depth)
    shape.lineTo(origin.x + width - depth, origin.y + depth + height / 3)
    shape.absarc(origin.x + width - depth / 2, origin.y + depth + height / 3, depth / 2, Math.PI, 0, true);
    shape.lineTo(origin.x + width, origin.y)
    shape.lineTo(origin.x, origin.y);

    const hole1 = new THREE.Path();
    hole1.absarc(origin.x + width / 2 - depth / 2, origin.y + height - depth + 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(origin.x + width - depth / 2, origin.y + depth + height / 3 - 5, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole2);

    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0, bevelEnabled: false });
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    const ch = new THREE.SphereGeometry(2)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(origin.x + width - depth / 2, origin.y + depth + height / 3 - 5);
    // chmesh.position.set(origin.x + width - depth / 2, origin.y  + height / 3);
    // scene.add(chmesh)


}
//#endregion

//#region Function - 11
function fun11() {


    const spotLight = new THREE.SpotLight(0x00ff00, 1000);
    spotLight.position.set(0, 4, 0);
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    const planeSize = 400;
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        // side: THREE.DoubleSide,
        wireframe: false
    });
    const mesh1 = new THREE.Mesh(planeGeo, planeMat);
    mesh1.rotation.x = Math.PI * - .5;
    mesh1.position.set(0, -50, 0)
    scene.add(mesh1);


    const shape = new THREE.Shape();
    const origin = new THREE.Vector2(0, 0);


    let height = 400, width = 500, depth = 57, diameter = 10;
    if (diameter > depth) {
        diameter = depth
    }
    if (height < depth) {
        height = depth + 10
    }

    // Desire Shape formation
    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height - depth - 10);
    shape.quadraticCurveTo(origin.x, origin.y + height - depth, origin.x - 10, origin.y + height - depth)
    shape.lineTo(origin.x - width, origin.y + height - depth);
    shape.absarc(origin.x - width - depth / 2, origin.y + height - depth, depth / 2, 0, Math.PI, true);
    shape.absarc(origin.x - width - depth, origin.y + height - depth + depth / 2, depth / 2, 3 * (Math.PI) / 2, Math.PI / 2, true);
    shape.absarc(origin.x - width - depth / 2, origin.y + height, depth / 2, Math.PI, 0, true);
    shape.lineTo(origin.x + depth - 10, origin.y + height)
    shape.quadraticCurveTo(origin.x + depth, origin.y + height, origin.x + depth, origin.y + height - 10)
    shape.lineTo(origin.x + depth, origin.y)
    shape.absarc(origin.x + depth / 2, origin.y, depth / 2, 0, Math.PI, true)

    // Hole
    const circle = new THREE.Path();
    circle.absarc(origin.x - width - depth / 2, origin.y + height - depth / 2, diameter / 2, 0, Math.PI * 2, true);
    shape.holes.push(circle);

    // Extrude Geometry 
    const extrudeSetting = {
        depth: 50,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    // const mat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false })
    const mat = new THREE.MeshNormalMaterial({ color: 'green', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Side bala light hai ye 
    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);
}
//#endregion

//#region  Function - 12  (dependent)
function fun12() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 200, doorWidth = 120, holeDiameter = 100, handleHeight = 50, handleWidth = 50;

    //  handle height calculation

    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }
    if (doorWidth < holeDiameter + 20 ) {
        doorWidth = holeDiameter 
    }

    // holeDiameter calculation
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }

    //  Door  formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y)

    

    let x_handleMove = 0, y_handleMove = 148;

    //  Handle
    let handle = new THREE.Shape();
    // y_handleMove -= (doorHeight - handleHeight) / 2;
    handle.moveTo( origin.x, origin.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo(origin.x + holeDiameter + 20,  origin.y + doorHeight - (doorHeight - handleHeight) / 2)
    handle.lineTo( origin.x + holeDiameter + 20,  origin.y + (doorHeight - handleHeight) / 2)
    handle.lineTo( origin.x - handleWidth,  origin.y + (doorHeight - handleHeight) / 2)
    handle.lineTo( origin.x - handleWidth,  origin.y + handleHeight + (doorHeight - handleHeight) / 2)
    handle.lineTo( origin.x,  origin.y + handleHeight + (doorHeight - handleHeight) / 2)

    //  Door Hole
    const doorHole = new THREE.Path();
    doorHole.absarc(origin.x + 10 + holeDiameter / 2, origin.y + doorHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    doorShape.holes.push(doorHole);


    // Handle Hole
    const HandleHole = new THREE.Path();
    HandleHole.absarc( origin.x + 10 + holeDiameter / 2,  origin.y + handleHeight + (doorHeight - handleHeight) / 2 - handleHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);


    const deep = 10;
    //  Extrude setting
    const extrudeSetting = {
        depth: deep,
    }

    //  Extrude for door 
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    //  Extrude for Handle
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(0, 0, deep)
    scene.add(handlesrMesh);


    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    doorMesh.add(doorEdges);

    // Edge line for Handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handleEdges.position.set(0, 0, deep)
    doorMesh.add(handleEdges);

}
//#endregion

//#region  Function - 13 (independent)
function fun13() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 400, doorWidth = 500, holeDiameter = 100, handleHeight = 90, handleWidth = 150;

    //  Door  formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y)

    //  handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }

    // holeDiameter calculation
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }

    //  Handle
    let handle = new THREE.Shape();
    const originHandle = new THREE.Vector2(0, 0);
    handle.moveTo( originHandle.x,  originHandle.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo( originHandle.x + holeDiameter + 20,  originHandle.y + doorHeight - (doorHeight - handleHeight) / 2)
    handle.lineTo( originHandle.x + holeDiameter + 20,  originHandle.y + (doorHeight - handleHeight) / 2)
    handle.lineTo( originHandle.x - handleWidth,  originHandle.y + (doorHeight - handleHeight) / 2)
    handle.lineTo( originHandle.x - handleWidth,  originHandle.y + handleHeight + (doorHeight - handleHeight) / 2)
    handle.lineTo( originHandle.x,  originHandle.y + handleHeight + (doorHeight - handleHeight) / 2)

    //  Door Hole
    const doorHole = new THREE.Path();
    doorHole.absarc(origin.x + 10 + holeDiameter / 2, origin.y + doorHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    doorShape.holes.push(doorHole);


    // Handle Hole
    const HandleHole = new THREE.Path();
    HandleHole.absarc( originHandle.x + 10 + holeDiameter / 2,  originHandle.y + handleHeight + (doorHeight - handleHeight) / 2 - handleHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);

    const shapeDeep = 40;
    //  Extrude setting
    const extrudeSetting = {
        depth: shapeDeep,
    }

    //  Extrude for door 
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    //  Extrude for Handle
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(0, 0, shapeDeep)
    scene.add(handlesrMesh);


    // Edge line for Door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    doorMesh.add(doorEdges);

    // Edge line for Handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handleEdges.position.set(0, 0, shapeDeep)
    doorMesh.add(handleEdges);

}
//#endregion

//#region  function - 14
function fun14() {
    const origin = new THREE.Vector2(0, 0);
    let doorHeight = 400, doorWidth = 500, holeDiameter = 100, handleHeight = 90, handleWidth = 150;

    // Door formation
    const doorShape = new THREE.Shape();
    doorShape.moveTo(origin.x, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y);
    doorShape.lineTo(origin.x + doorWidth, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y + doorHeight);
    doorShape.lineTo(origin.x, origin.y);

    // Handle height calculation
    if (handleHeight < 20) {
        handleHeight = 20;
    }
    if (handleHeight > doorHeight) {
        handleHeight = doorHeight;
    }

    // Hole diameter calculation
    if (holeDiameter + 20 > handleHeight) {
        holeDiameter = handleHeight - 20;
    }

    let x_handleMove = 0, y_handleMove = 0;

    // Handle
    let handle = new THREE.Shape();
    handle.moveTo(x_handleMove + origin.x, y_handleMove + origin.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo(x_handleMove + origin.x + holeDiameter + 20, y_handleMove + origin.y + doorHeight - (doorHeight - handleHeight) / 2);
    handle.lineTo(x_handleMove + origin.x + holeDiameter + 20, y_handleMove + origin.y + (doorHeight - handleHeight) / 2);
    handle.lineTo(x_handleMove + origin.x - handleWidth, y_handleMove + origin.y + (doorHeight - handleHeight) / 2);
    handle.lineTo(x_handleMove + origin.x - handleWidth, y_handleMove + origin.y + handleHeight + (doorHeight - handleHeight) / 2);
    handle.lineTo(x_handleMove + origin.x, y_handleMove + origin.y + handleHeight + (doorHeight - handleHeight) / 2);

    // Door holes
    const doorHoles = [
        { x: origin.x + 10 + holeDiameter / 2, y: origin.y + doorHeight / 2 },
        { x: origin.x + doorWidth / 2 + 5, y: origin.y + holeDiameter / 2 + 5 },
        { x: origin.x + doorWidth - holeDiameter / 2, y: origin.y + doorHeight / 2 },
        { x: origin.x + doorWidth / 2 + 5, y: origin.y - holeDiameter / 2 + doorHeight - 10 }
    ];

    doorHoles.forEach(hole => {
        const doorHole = new THREE.Path();
        doorHole.absarc(hole.x, hole.y, holeDiameter / 2, 0, Math.PI * 2, true);
        doorShape.holes.push(doorHole);
    });

    // Handle hole
    const HandleHole = new THREE.Path();
    HandleHole.absarc(x_handleMove + origin.x + 10 + holeDiameter / 2, y_handleMove + origin.y + handleHeight + (doorHeight - handleHeight) / 2 - handleHeight / 2, holeDiameter / 2, 0, Math.PI * 2, true);
    handle.holes.push(HandleHole);

    const shapeDeep = 40;
    // Extrude setting
    const extrudeSetting = {
        depth: shapeDeep,
    };

    // Extrude for door
    const door = new THREE.ExtrudeGeometry(doorShape, extrudeSetting);
    const doormat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    const doorMesh = new THREE.Mesh(door, doormat);
    scene.add(doorMesh);

    // Extrude handle
    const handles = new THREE.ExtrudeGeometry(handle, extrudeSetting);
    const handleMesh = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false, side: THREE.DoubleSide });
    const handlesrMesh = new THREE.Mesh(handles, handleMesh);
    handlesrMesh.position.set(0, 0, shapeDeep);
    scene.add(handlesrMesh);

    // const handleUp = handles.clone();
    // const handleUpMat = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false, side: THREE.DoubleSide });
    // const handleUpMesh = new THREE.Mesh(handleUp, handleUpMat);
    // handleUpMesh.position.set(0, 0, shapeDeep + 100);
    // scene.add(handleUpMesh);

    const handleUp = handles.clone();
    const clone1HandlesrMesh = new THREE.Mesh(handleUp, handleMesh);
    clone1HandlesrMesh.position.set(holeDiameter - 5, doorHeight, shapeDeep);
    clone1HandlesrMesh.rotateZ(-Math.PI / 2);
    scene.add(clone1HandlesrMesh);

    const handleRight = handles.clone();
    const clone2HandlesrMesh = new THREE.Mesh(handleRight, handleMesh);
    clone2HandlesrMesh.position.set(doorWidth, 0, shapeDeep * 2);
    clone2HandlesrMesh.rotateY(-Math.PI);
    scene.add(clone2HandlesrMesh);

    const handleDown = handles.clone();
    const clone3HandlesrMesh = new THREE.Mesh(handleDown, handleMesh);
    clone3HandlesrMesh.position.set(origin.x + doorWidth - handleHeight / 2, origin.y, shapeDeep);
    clone3HandlesrMesh.rotateZ(Math.PI / 2);
    scene.add(clone3HandlesrMesh);

    // Edge line for door geometry
    const doorEdgeo = new THREE.EdgesGeometry(door);
    const doorEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const doorEdges = new THREE.LineSegments(doorEdgeo, doorEdmat);
    doorMesh.add(doorEdges);

    // Edge line for handle geometry
    const handleEdgeo = new THREE.EdgesGeometry(handles);
    const handleEdmat = new THREE.LineBasicMaterial({ color: 'white' });
    const handleEdges = new THREE.LineSegments(handleEdgeo, handleEdmat);
    handlesrMesh.add(handleEdges);

    // Edge line for clone1 handle geometry
    const clone1HandleEdgeo = new THREE.EdgesGeometry(handleUp);
    const clone1HandleEdges = new THREE.LineSegments(clone1HandleEdgeo, handleEdmat);
    handleUpMesh.add(clone1HandleEdges);

    // Edge line for clone2 handle geometry
    const clone2HandleEdgeo = new THREE.EdgesGeometry(handleRight);
    const clone2HandleEdges = new THREE.LineSegments(clone2HandleEdgeo, handleEdmat);
    clone2HandlesrMesh.add(clone2HandleEdges);

    // Edge line for clone3 handle geometry
    const clone3HandleEdgeo = new THREE.EdgesGeometry(handleDown);
    const clone3HandleEdges = new THREE.LineSegments(clone3HandleEdgeo, handleEdmat);
    clone3HandlesrMesh.add(clone3HandleEdges);

    const ch = new THREE.SphereGeometry(2)
    const chmat = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
    const chmesh = new THREE.Mesh(ch, chmat);
    chmesh.position.set(origin.x + doorWidth / 2 + 5, origin.y - holeDiameter / 2 + doorHeight - 10);
    scene.add(chmesh)
}
//#endregion

//#region helper
document.addEventListener('keyup', (event) => {
    const key = event.key;
    console.log(key);

    switch (key) {
        case '1':
            fun1();
            break;
        case '2':
            fun2();
            break;
        case '3':
            fun3();
            break;
        case '4':
            fun4();
            break;
        case '5':
            fun5();
            break;
        case '6':
            fun6();
            break;
        case '7':
            fun8();
            break;
        case '9':
            fun9();
            break;
        default:
            console.log("No function selected");
    }
});
//#endregion

//#region render
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

// fun14();
