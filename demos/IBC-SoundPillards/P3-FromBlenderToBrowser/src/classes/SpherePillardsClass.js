import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

class SpherePillardsClass {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()
    }

    init(scene) {
        this.scene = scene

        const gTex = this.texLoader.load('./assets/textures/greyMetal.png')
        const bTex = this.texLoader.load('./assets/textures/blackMetal.png')

        this.gMatCap = new THREE.MeshMatcapMaterial({
            matcap: gTex
        })
        this.bMatCap = new THREE.MeshMatcapMaterial({
            matcap: bTex
        })

        this.modelLoader.load('./assets/models/pillard.glb', (glb) => {
            glb.scene.traverse(child => {
                if (child.name == "base") {
                    child.material = this.bMatCap
                }
                if (child.name == "Cylinder")
                    child.material = this.gMatCap

            })
            this.scene.add(glb.scene)
        })
    }


    update() {
    }

    bind() {

    }
}

const _instance = new SpherePillardsClass()
export default _instance