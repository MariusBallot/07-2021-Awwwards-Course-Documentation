//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector('.webGLContainer')
    .appendChild(renderer.domElement)

//SCENE SETUP
const scene = new THREE.Scene()

//CAMERA 
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 30)
camera.lookAt(0, 0, 0)

let joeyMesh
const joeyArmy = new THREE.Group()

const modelLoader = new THREE.GLTFLoader()
modelLoader.load('assets/squareRing.glb', (glb) => {
    console.log(glb)
    glb.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
            joeyMesh = child
            joeyMesh.material = new THREE.MeshNormalMaterial()
        }
    })

    for (let i = 0; i < 20; i++) {
        const c = joeyMesh.clone()
        c.rotation.y = Math.PI / 2
        c.scale.set(i, i, i)
        joeyArmy.add(c)
    }

    scene.add(joeyArmy)

})

//RENDER LOOP
function update() {


    let i = 0;
    while (i < joeyArmy.children.length) {
        joeyArmy.children[i].rotation.x += 0.01 + i * 0.001
        joeyArmy.children[i].rotation.y += 0.01 + i * 0.0001
        i++;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(update)
}

update()