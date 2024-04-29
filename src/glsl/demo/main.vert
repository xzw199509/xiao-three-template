
uniform float uTime;
varying vec3 vNormal;
void main() {
	vec4 mPosition = modelMatrix * vec4(position, 1.0);
	mPosition.y += sin(uTime/2.)/2.;
	gl_Position =projectionMatrix *  viewMatrix *  mPosition;
	vNormal = normal;
}