// script.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 5000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.4 });
const starPoints = new THREE.Points(geometry, starMaterial);
scene.add(starPoints);
camera.position.z = 800;

function animate() {
    requestAnimationFrame(animate);
    starPoints.rotation.y += 0.0003;
    renderer.render(scene, camera);
}
animate();

// CURSOR
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// GSAP REVEALS
gsap.registerPlugin(ScrollTrigger);

gsap.from("#about .glass", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    opacity: 0,
    x: (i) => i % 2 === 0 ? -50 : 50,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from("#work .glass", {
    scrollTrigger: { trigger: "#work", start: "top 80%" },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 1,
    ease: "back.out(1.5)"
});