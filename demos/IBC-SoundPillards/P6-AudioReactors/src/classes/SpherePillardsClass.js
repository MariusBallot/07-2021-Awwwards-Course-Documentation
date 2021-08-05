import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import SoundReactor from './SoundReactor'

class SpherePillardsClass {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()
    }

    init(scene) {
        this.scene = scene
        this.upVec = new THREE.Vector3(0, 1, 0)
        this.pillards = new THREE.Group()
        this.pillard

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
                    this.pillard = child
                    child.material = this.bMatCap
                }
                if (child.name == "Cylinder")
                    child.material = this.gMatCap

            })
            this.computePositions()

        })
    }

    computePositions() {
        const sphereGeom = new THREE.IcosahedronGeometry(2, 3)
        const sphereMat = this.gMatCap
        const sphere = new THREE.Mesh(sphereGeom, sphereMat)
        // const sphere = new THREE.Mesh(sphereGeom, new THREE.MeshNormalMaterial({
        //     wireframe: true
        // }))
        this.scene.add(sphere)

        let verArray = []
        for (let i = 0; i < sphereGeom.attributes.position.array.length; i += 3) {
            const x = sphereGeom.attributes.position.array[i]
            const y = sphereGeom.attributes.position.array[i + 1]
            const z = sphereGeom.attributes.position.array[i + 2]
            verArray.push({
                x: x,
                y: y,
                z: z,
            })
        }


        let pillPos = []
        for (let i = 0; i < verArray.length; i++) {
            let existsFlag = false
            for (let j = 0; j < pillPos.length; j++) {
                if (pillPos[j].x == verArray[i].x && pillPos[j].y == verArray[i].y && pillPos[j].z == verArray[i].z) {
                    existsFlag = true
                }
            }

            if (!existsFlag) {
                pillPos.push({
                    x: verArray[i].x,
                    y: verArray[i].y,
                    z: verArray[i].z,
                })
                const c = this.pillard.clone()
                const posVec = new THREE.Vector3(verArray[i].x, verArray[i].y, verArray[i].z)
                c.position.copy(posVec)
                c.scale.multiplyScalar(.2)
                c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize())
                this.pillards.add(c)
            }
        }
        this.scene.add(this.pillards)

        console.log(pillPos)
    }

    update() {
        if (SoundReactor.playFlag) {
            let i = 0
            while (i < this.pillards.children.length) {
                this.pillards.children[i].children[0].position.y = SoundReactor.fdata[i] / 255 * 4
                i++
            }
        } else {
            let i = 0
            while (i < this.pillards.children.length) {
                this.pillards.children[i].children[0].position.y = (Math.sin(Date.now() * 0.01 + this.pillards.children[i].position.x) + 1) * 1.5
                i++
            }
        }


    }

    bind() {

    }
}

const _instance = new SpherePillardsClass()
export default _instance