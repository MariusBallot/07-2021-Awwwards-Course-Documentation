//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.debug.checkShaderErrors = true
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(30,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)
camera.lookAt(0, 0, 0)

const uniforms = {
    colorA: {
        value: new THREE.Color(0xAAAAFF)
    },
    colorB: {
        value: new THREE.Color(0xFFAAAA)
    }
}

const cubeGeom = new THREE.BoxGeometry()
const cubeMat = new THREE.ShaderMaterial({
    vertexShader: simpleVert,
    fragmentShader: simpleFrag,
    uniforms: uniforms
})
const cubeMesh = new THREE.Mesh(cubeGeom, cubeMat)
scene.add(cubeMesh)

//RENDER LOOP
function update() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()