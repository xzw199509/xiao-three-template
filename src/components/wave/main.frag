varying vec2 vUv;
uniform float uTime;
#define PI 3.14159265359;
vec2 random2(vec2 p){
  return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
float random(vec2 p){
  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453123);
}
float noise(vec2 st){
  vec2 i=floor(st);
  vec2 f=fract(st);
  float a=random(i);
  float b=random(i+vec2(1.,0.));
  float c=random(i+vec2(0.,1.));
  float d=random(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+
  (c-a)*u.y*(1.-u.x)+
  (d-b)*u.x*u.y;
}
#define OCTAVES 6
float fbm(vec2 st){
  st.y -= uTime/4.; 
  float value=0.;
  float amplitude=.5;
  float frequency=0.;
  for(int i=0;i<OCTAVES;i++){
    value+=amplitude*noise(st);
    st*=2.;
    amplitude*=.5;
  }
  return value;
}
float wave(vec2 st){
  float fbmdata=fbm(st*6.);
  st.y-=.5;
  st.x+=.2;
  st.x+=+fbmdata/10.;
  st*=vec2(6.,2.);
  float strength=1.;
  
  float d=distance(st,vec2(0.));
  strength=fract(d-uTime);
  // strength=fract(d);
  strength=pow(strength,3.);
  strength=min(1.,strength);
  strength*=1.2;
  return strength;
}
float gridNoise(vec2 st){
  st*=vec2(2.,5.); // 修改
  st*=5.; // 新增
  vec2 i_st=floor(st);
  vec2 f_st=fract(st);
  float m_dist=1.;
  
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 neighbor=vec2(float(x),float(y));
      vec2 point=random2(i_st+neighbor);
      point=.5+.5*sin(6.2831*point);
      vec2 diff=neighbor+point-f_st;
      float dist=length(diff);
      m_dist=min(m_dist,dist);
    }
  }
  m_dist=smoothstep(.1,.7,m_dist*.8);
  return m_dist;
}
void main(){
  float seaWave=wave(vUv);
  float waveTail=gridNoise(vUv);

  waveTail*=seaWave;
  waveTail+=seaWave;
  waveTail=pow(waveTail,2.);
  // vec3 seaCol=vec3(waveTail);
  vec3 seaCol=vec3(.1608,.251,.7608)+waveTail;
  // vec3 seaCol = vec3(.1608,.251,.7608);
  gl_FragColor=vec4(seaCol,1.);
}