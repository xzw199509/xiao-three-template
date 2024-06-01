uniform float uTime;
varying vec2 vUv;
void main(){
	vec4 mPosition=modelMatrix*vec4(position,1.);
	mPosition.y+=sin(mPosition.x*3.-uTime)/10.;
	mPosition.y+=cos(mPosition.z*3.-uTime)/20.;
	// mPosition.y+=sin(mPosition.x*3.)/4.;
	// mPosition.y+=cos(mPosition.z*3.)/4.;
	gl_Position=projectionMatrix*viewMatrix*mPosition;
	vUv = uv;
}