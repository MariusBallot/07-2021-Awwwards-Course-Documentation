varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vMatCapUV;

void main() {
    gl_FragColor = vec4(vMatCapUV, 1., 1.);
}