import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLight } from 'three'

//
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/tectures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// const canvas1 = document.querySelector('canvas.webgl2')
// Scene
const scene = new THREE.Scene()
const scene1 = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const geometry1 = new THREE.TorusGeometry(.7, .2, 16, 100);

const particlesGeometry = new THREE.BufferGeometry;
const particlescnt = 5000;


const posArray = new Float32Array(particlescnt * 3);

for (let i = 0; i < particlescnt * 3; i++) {
    // posArray[i] = Math.random() - 0.5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 10)
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)


const material1 = new THREE.PointsMaterial({
    size: 0.005,
    color: 'white'
})
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    transparent: true,
    color: 'white'
})

// Mesh
const sphere = new THREE.Mesh(geometry, material)
const sphere1 = new THREE.Points(geometry1, material1)
const particlesMash = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, sphere1, particlesMash)

// Lights

const pointLight = new THREE.PointLight(0xa9f0, 5)
pointLight.position.set(10, 2, -10)

scene.add(pointLight)

const light1 = gui.addFolder('light 1')
light1.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
light1.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
light1.add(pointLight.position, 'z').min(-10).max(10).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)

const pointLight2 = new THREE.PointLight(0xff0000,)
pointLight2.position.set(-10, 2, -10)
pointLight2.intensity = 5
scene.add(pointLight2)
const pointLight3 = new THREE.PointLight(0xffffff,)

pointLight3.position.set(0, 0, 0.5)
pointLight3.intensity = 1
scene.add(pointLight3)

// const pointlight2helper = new THREE.PointLightHelper(pointLight2, 2)
// scene.add(pointlight2helper)

// const pointlighthelper = new THREE.PointLightHelper(pointLight, 2)
// scene.add(pointlighthelper)

const light2 = gui.addFolder('light 2')
light2.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
light2.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)


const lightcolor = {
    color: 0xa9f0
}

light1.addColor(lightcolor, 'color')
    .onChange(() => {
        pointLight.color.set(lightcolor.color)
    })
light2.addColor(lightcolor, 'color')
    .onChange(() => {
        pointLight2.color.set(lightcolor.color)
    })



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // canvas: canvas1,

    // alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('mousemove', animateParticle)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(e) {
    mouseX = (e.clientX - windowX)
    mouseY = (e.clientY - windowY)
}

function animateParticle(e) {
    mouseY = e.clientY
    mouseX = e.clientX
}

const updateSphere = (e) => {
    sphere.position.y = window.scrollY * .001
    if (window.scrollY > 100)
        particlesMash.position.y = (window.scrollY - 800) * 0.001
}
window.addEventListener('scroll', updateSphere)


const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere1.rotation.y = .5 * elapsedTime
    pointLight3.rotation.y = .5 * elapsedTime
    // if (pointLight2.position.x < 10) {
    //     pointLight2.position.x = .5 * elapsedTime
    //     // pointLight2.position.z = .5 * elapsedTime
    // }
    // if ((pointLight2.position.x = 10)  (pointLight2.position.z < 0.1)) {
    //     pointLight2.position.z = .5 * elapsedTime
    //     pointLight2.position.x = -.5 * elapsedTime

    // }
    pointLight.rotation.x = .5 * elapsedTime


    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    // sphere.position.z += -.05 * (targetY - sphere.rotation.x)
    particlesMash.rotation.y = 0.1 * (elapsedTime)

    if (mouseY > 0) {
        particlesMash.rotation.x = -mouseY * (10) * 0.00001
        // particlesMash.rotation.y = -mouseX * (10) * 0.00008
    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera,)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()