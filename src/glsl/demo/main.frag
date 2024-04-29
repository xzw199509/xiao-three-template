varying vec2 vUv;
uniform float uTime;
varying vec3 vNormal;

void main(){
    gl_FragColor=vec4(vec3(vNormal),1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}