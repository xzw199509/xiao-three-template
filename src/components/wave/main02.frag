varying vec2 vUv;
uniform float uTime;
#define PI 3.14159265359;

vec2 rotate(vec2 uv,float rotation,vec2 mid){
  return vec2(
    cos(rotation)*(uv.x-mid.x)+sin(rotation)*(uv.y-mid.y)+mid.x,
    cos(rotation)*(uv.y-mid.y)-sin(rotation)*(uv.x-mid.x)+mid.y
  );
}
float voronoi(vec2 st){
  // st.x -= uTime/2.;
  vec2 i_st=floor(st);
  vec2 f_st=fract(st);
  vec2 point=vec2(.5);
  // vec2 point=vec2(.0);
  // point = 0.5 + 0.1*sin( uTime + 6.2831*point );
  vec2 diff=point-f_st;
  // Distance to the point
  float dist=length(diff)+.1;
  return dist;
}
void main(){
  vec2 st=vUv;
  vec3 color=vec3(.0);
  vec2 uv=st;
  uv*=4.;
  uv+=uTime/15.;
  float dist=1.;
  // vec2 uv1=uv*vec2(1.1,1.3)+vec2(.0,uTime/3.);
  // float dist1=voronoi(uv1);
  // vec2 uv2=uv*vec2(1.1,1.3);
  // uv2=rotate(uv2,3.1415 * -.13,vec2(.5));
  // float dist2=voronoi(uv2);
  // vec2 uv3= rotate(uv*vec2(1.5,.9)+uTime/3.,3.14159*-.13,vec2(.5));
  // float dist3=voronoi(uv3);
  float dist1=voronoi(uv*vec2(1.1,1.3)+vec2(.0,uTime/3.));
  float dist2=voronoi(rotate(uv*vec2(1.1,1.3)+vec2(.0,uTime/4.),3.14159*.25,vec2(.5)));
  float dist3=voronoi(rotate(uv*vec2(1.5,.9)+uTime/3.,3.14159*-.13,vec2(.5)));
  dist=min(dist1,dist2);
  dist=min(dist,dist3);
  dist=min(dist,dist1);
  dist=pow(dist,2.);
  // dist *= 1.3;
  // dist = min(dist,0)
  // dist = dist1;
  // dist = dist2;
  // dist = dist3;
  color+=dist;
  color+=vec3(.1529,.251,.8235);
  // color = pow(color,2.);
  // color +=dist;
  // color+=dist;
  gl_FragColor=vec4(color,.5);
}