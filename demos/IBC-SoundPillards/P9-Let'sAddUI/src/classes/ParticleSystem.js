import * as THREE from 'three';

class ParticleSystem {
    constructor() {
        this.bind();
        this.particleCount = 5000;
        this.boxSize = 30;

    }

    init(scene) {
        this.scene = scene
        this.particlesGeom = new THREE.BufferGeometry()
        this.particlesPos = []

        for (let p = 0; p < this.particleCount; p++) {

            let x = Math.random() * this.boxSize - this.boxSize / 2;
            let y = Math.random() * this.boxSize - this.boxSize / 2;
            let z = Math.random() * this.boxSize - this.boxSize / 2;

            // Create the vertex
            this.particlesPos.push(x, y, z);
        }

        this.particlesGeom.setAttribute('position', new THREE.Float32BufferAttribute(this.particlesPos, 3));

        this.particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xffffff,
                size: .02,
            });

        this.particleSystem = new THREE.Points(this.particlesGeom, this.particleMaterial);
        this.scene.add(this.particleSystem)
    }

    update() {
        let i = 0
        while (i < this.particleCount) {
            // this.particlesGeom.attributes.position.array[i * 3 + 0] += 0.01
            this.particlesGeom.attributes.position.array[i * 3 + 1] += 0.01
            // this.particlesGeom.attributes.position.array[i * 3 + 2] += 0.01
            if (this.particlesGeom.attributes.position.array[i * 3 + 1] > this.boxSize / 2) {
                this.particlesGeom.attributes.position.array[i * 3 + 1] = - this.boxSize / 2
            }
            i++
        }

        this.particlesGeom.attributes.position.needsUpdate = true;
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }

}

const _instance = new ParticleSystem()
export default _instance