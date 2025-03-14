//#region imports
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 800);

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
    var height = 300, width = 100, radius = 5;
    const extrudeLength = 1;

    shape.moveTo(origin.x, origin.y);
    shape.lineTo(origin.x, origin.y + height);
    shape.quadraticCurveTo(origin.x, origin.y + height + height / 12, origin.x - width * 3.5 / 15, origin.y + height + height / 23);
    shape.lineTo(origin.x - width, origin.y + height - height / 10);
    shape.lineTo(origin.x - width, origin.y + height - height / 10 - height / 5);
    shape.lineTo(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.35 * height / 4));
    shape.quadraticCurveTo(origin.x - width * 2 / 5 - 2, origin.y + height + height / 10 - (1.35 * height / 4), origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.4 * height / 4));
    shape.lineTo(origin.x - width * 2 / 5, origin.y);
    shape.quadraticCurveTo(origin.x - width / 5, origin.y - width / 5, origin.x, origin.y);

    if (radius > height / 8 || radius < 0 || radius > width / 2.5) {
        radius = Math.min(height / 8, width / 2.5 - 3, height / 10);
    }
    width = Math.max(width, 20);
    const hole = new THREE.Path();
    hole.absarc(origin.x - width * 2 / 5 - 6, origin.y + height + height / 10 - (1.3 * height / 4) + height / 10, radius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const extrudeSetting = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(extrudeLength, 0, 0)
        ])
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: false })
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotateY(-Math.PI / 2)
    scene.add(mesh);

    const edgeo = new THREE.EdgesGeometry(geo);
    const edmat = new THREE.LineBasicMaterial({ color: 'white' });
    const edges = new THREE.LineSegments(edgeo, edmat);
    mesh.add(edges);
}
//#endregion

//#region  function - 7
function fun7() {
    const shape = new THREE.Shape();
    const vertices = [];
    function addPoints(v) {
        vertices.push(new THREE.Vector3(v[0], v[1], 0));
    }
    const origin = new THREE.Vector2(0, 0);
    const height = 100, width = 50;
    var radius = 10;
    const extrudeLength = 1;
    shape.moveTo(origin.x, origin.y);

    shape.bezierCurveTo(origin.x, origin.y, origin.x, origin.y + height / 2, origin.x, origin.y + height);
    // shape.bezierCurveTo(origin.x, origin.y, origin.x, origin.y + height, origin.x - width / 5, origin.y + height + 3);
    // shape.bezierCurveTo(origin.x - width / 5, origin.y + height + 3, origin.x - width * 2 / 5, origin.y + height + 3, origin.x - width, origin.y + height - height / 10);
    // shape.bezierCurveTo(origin.x - width, origin.y + height - height / 10, origin.x - width, origin.y + height - height / 10 - height / 4, origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4);
    // shape.bezierCurveTo(origin.x - width * 2 / 5, origin.y + height + height / 10 - height / 4, origin.x - width * 2 / 5, origin.y, origin.x, origin.y);

    // shape.lineTo(origin.x, origin.y);
    // shape.lineTo(origin.x, origin.y + height);
    // shape.lineTo(origin.x - width / 5, origin.y + height + 3);
    // shape.lineTo(origin.x - width * 2 / 5, origin.y + height + 3);
    // shape.lineTo(origin.x - width, origin.y + height - height / 10);
    // shape.lineTo(origin.x - width, origin.y + height - height / 10 - height / 4);
    // shape.lineTo(origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.3 * height / 4));
    // shape.lineTo(origin.x - width * 2 / 5, origin.y);
    // shape.lineTo(origin.x, origin.y);

    if (radius > height / 8 || radius < 0 || radius > width / 2.5) {
        // radius = ;
        radius = Math.min(height / 8, width / 2.5);
    }
    const hole = new THREE.Path();
    hole.absarc(origin.x - width * 2 / 5, origin.y + height + height / 10 - (1.2 * height / 4) + height / 10, radius, 0, Math.PI * 2, true);
    // hole.absarc(origin.x - width * 2 / 5 , origin.y + (3 * height / 4)  + 15, radius, 0, Math.PI * 2 , true );
    // shape.holes.push(hole);

    // addPoints([origin.x, origin.y]);
    // addPoints([origin.x, origin.y + height]);
    // addPoints([origin.x - width / 5, origin.y + height + 3]);
    // addPoints([origin.x - width * 2 / 5, origin.y + height + 3]);
    // addPoints([origin.x - width, origin.y + height - height / 10]);
    // addPoints([origin.x - width, origin.y + height - height / 10 - height / 4]);
    // addPoints([origin.x - width * 2 / 5, origin.y + height + (height / 10) - ( 1.3 * height / 4) ]);
    // addPoints([origin.x - width * 2 / 5, origin.y]);
    // addPoints([origin.x, origin.y]);
    const extrudeSetting = {
        extrudePath: new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(extrudeLength, 0, 0)
        ])
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    const mat = new THREE.MeshBasicMaterial({ color: 'blue' })
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotateY(-Math.PI / 2);
    scene.add(mesh);




    // const len = vertices.length;
    // console.log(getX(vertices[len - 1])  ,  vertices[0]);
    // addPoints([(vertices[0][0] - vertices[len - 1][0]) / 2, origin.y - height / 20]);

    vertices.forEach((v) => {
        const vertexGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
        const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
        vertexMesh.position.set(v.x, v.y, v.z);
        scene.add(vertexMesh);
    });
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
    var camera, scene, renderer;
    var curve;
    var path;
    var oHeight = 0;
    var delta = 0;
    var geometry;

    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 600;
        scene = new THREE.Scene();

        geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({ color: 0xffffff });

        curve = new THREE.Line(geometry, material);

        scene.add(curve);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.onresize = resize;
    }

    function animate() {
        requestAnimationFrame(animate);

        delta += .1;
        oHeight = 4

        path = new THREE.Path();
        path.lineTo(0, 0);
        path.quadraticCurveTo(0, 20, 20, 20);
        path.lineTo(40, 20);
        path.quadraticCurveTo(60, 20, 60, 0);
        path.lineTo(60, -40 - oHeight);
        // path.quadraticCurveTo(60, -60 - oHeight, 40, -60 - oHeight);
        // path.lineTo(20, -60 - oHeight);
        // path.quadraticCurveTo(0, -60 - oHeight, 0, -40 - oHeight);
        // path.lineTo(0, 0);

        const vertexGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const vertexMat = new THREE.MeshBasicMaterial({ color: 'red' });
        const vertexMesh = new THREE.Mesh(vertexGeo, vertexMat);
        vertexMesh.position.set(0, 20);
        scene.add(vertexMesh);

        geometry.dispose();
        geometry.setFromPoints(path.getPoints());

        renderer.render(scene, camera);
    }
    function resize() {
        var aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }
}
//#endregion

//#region helper
fun6();
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
