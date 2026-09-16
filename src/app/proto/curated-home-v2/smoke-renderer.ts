// Proposed, prototype-only: one procedural smoke pass; no video or 3D dependency.
const vertex = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * .5 + .5;
  gl_Position = vec4(a_position, 0., 1.);
}`;

const fragment = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_origin;
uniform float u_time;
uniform float u_reveal;
uniform float u_idle;
uniform float u_seed;
// xy: pointer in hero UVs, z: Gaussian radius in hero-height units, w: strength.
uniform vec4 u_pointer;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p) {
  float n = 0., a = .5;
  mat2 turn = mat2(.8, -.6, .6, .8);
  for (int i = 0; i < 4; i++) {
    n += a * noise(p);
    p = turn * p * 2.03 + 4.7;
    a *= .49;
  }
  return n;
}

// Cubic B-spline through random control points: continuous velocity/acceleration,
// with no forced stop at a waypoint and no repeating pendulum endpoints.
float wander(float time, float seed) {
  float i = floor(time), f = fract(time), f2 = f*f, f3 = f2*f;
  vec4 weights = vec4((1.-f)*(1.-f)*(1.-f), 3.*f3-6.*f2+4.,
                      -3.*f3+3.*f2+3.*f+1., f3)/6.;
  vec4 points = vec4(hash(vec2(i-1.,seed+u_seed)), hash(vec2(i,seed+u_seed)),
                     hash(vec2(i+1.,seed+u_seed)), hash(vec2(i+2.,seed+u_seed)));
  return dot(points,weights)*2.-1.;
}

// Proposed palette in OKLCH; WebGL needs the resulting sRGB channel values.
vec3 palette(float L, float C, float degrees) {
  float angle = radians(degrees);
  float a = C*cos(angle), b = C*sin(angle);
  vec3 lms = vec3(L+.3963377774*a+.2158037573*b,
                 L-.1055613458*a-.0638541728*b,
                 L-.0894841775*a-1.291485548*b);
  lms = lms*lms*lms;
  vec3 rgb = vec3(dot(lms,vec3(4.0767416621,-3.3077115913,.2309699292)),
                  dot(lms,vec3(-1.2684380046,2.6097574011,-.3413193965)),
                  dot(lms,vec3(-.0041960863,-.7034186147,1.707614701)));
  rgb = max(rgb, vec3(0.));
  return mix(12.92*rgb, 1.055*pow(rgb,vec3(1./2.4))-.055, step(vec3(.0031308),rgb));
}

void main() {
  vec2 uv = vec2(v_uv.x, 1. - v_uv.y);
  float aspect = u_resolution.x / u_resolution.y;
  vec2 metric = vec2(aspect, 1.);
  vec2 pointerDelta = (uv-u_pointer.xy)*metric;
  float sigma = max(u_pointer.z,.001);
  float pointerSoftness = exp(-dot(pointerDelta,pointerDelta)/(2.*sigma*sigma))*u_pointer.w;
  // Affect the underlying light field, rather than painting a cursor-colored overlay.
  vec2 field = uv - pointerDelta/metric*pointerSoftness*.18;
  float t = u_time * .09;
  // Ease into the ambient motion only after the opening sequence has settled.
  float drift = 1.-exp(-u_idle*.9);
  float travel = u_idle / 2.8;
  // Each end wanders independently; the light field bends smoothly between them.
  vec2 left = vec2(0.,.34) + drift*vec2(.12*wander(travel,11.), .28*wander(travel,23.));
  vec2 right = vec2(1.,.61) + drift*vec2(.12*wander(travel*.91,47.), .28*wander(travel*.91,71.));
  float along = clamp((field.x-left.x)/(right.x-left.x),0.,1.);
  // Optical diffusion, not domain-warped ink: one broad, softly drifting light field.
  // No UI-position masks or card/heading coordinates are used by this field.
  float axis = mix(left.y,right.y,along) + .034*sin(field.x*3.6+t*.55)
             + .018*sin(field.x*6.1-t*.4)
             + drift*.08*wander(travel*.83,103.)*sin(along*3.14159265);
  float width = .17 + .025*sin(field.x*2.8-t*.31)
              + drift*.045*wander(travel*.79,131.);
  float edge = abs(field.y-axis)-width;
  edge += .012*(noise(field*2.4+vec2(t*.07,0.))-.5);
  // A Gaussian relaxation opens the dark band locally, including its uniform core.
  edge += .16*pointerSoftness;
  float diffusion = .055*pointerSoftness;

  vec3 ink = palette(.18,.02,255.);
  vec3 blue = palette(.53,.2,263.);
  vec3 sky = palette(.81,.108,234.);
  vec3 mist = palette(.955,.022,226.);
  // Wide overlapping transitions reproduce defocused blue halation, without rims.
  vec3 glow = mix(ink, blue, smoothstep(-.09-diffusion,.13+diffusion,edge));
  glow = mix(glow, sky, smoothstep(.06-diffusion,.26+diffusion,edge));
  glow = mix(glow, mist, smoothstep(.18-diffusion,.4+diffusion,edge));
  // A soft white light blooms inside the same moving Gaussian field.
  // Screen blending lifts even the dark core without flattening the whole palette.
  float lightCore = exp(-dot(pointerDelta,pointerDelta)/(2.*sigma*sigma*.36));
  float halo = lightCore*u_pointer.w*.52 + pointerSoftness*.07;
  vec3 whiteLight = palette(.985,.008,235.);
  glow = 1.-(1.-glow)*(1.-whiteLight*halo);
  // Stable, irregular film grain; no dot grid and no temporal glitter.
  float grain = hash(gl_FragCoord.xy);
  glow += (grain-.5)*.055;

  // Organic opening mask: center-out smoke front, not a circular CSS wipe.
  vec2 centerDelta = (uv-u_origin)*metric;
  float edgeNoise = fbm(uv*metric*3.1+vec2(t*.08,0.));
  float radius = mix(-.38, length(metric)*.84+.48, u_reveal);
  float openingEdge = length(centerDelta) + (edgeNoise-.5)*.44;
  float mask = (1.-smoothstep(radius-.14, radius+.14, openingEdge));
  if (u_reveal >= .999) mask = 1.;
  if (u_reveal <= .001) mask = 0.;
  vec3 paper = vec3(244.,243.,238.)/255.;
  gl_FragColor = vec4(mix(paper, clamp(glow,0.,1.), mask), 1.);
}`;

export function createSmokeRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!program || !buffer) return null;
  const dispose = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
  };
  for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { dispose(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("Prototype smoke shader:", gl.getShaderInfoLog(shader));
      dispose(); return null;
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const origin = gl.getUniformLocation(program, "u_origin");
  const time = gl.getUniformLocation(program, "u_time");
  const reveal = gl.getUniformLocation(program, "u_reveal");
  const idle = gl.getUniformLocation(program, "u_idle");
  const pointer = gl.getUniformLocation(program, "u_pointer");
  gl.uniform1f(gl.getUniformLocation(program, "u_seed"), Math.random()*1000);
  return {
    resize(width: number, height: number, mobile: boolean) {
      const scale = Math.min(devicePixelRatio || 1, 1.25, Math.sqrt((mobile ? 420_000 : 850_000)/(width*height)));
      canvas.width = Math.max(1, Math.round(width*scale));
      canvas.height = Math.max(1, Math.round(height*scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
    },
    draw(seconds: number, progress: number, center: [number, number], idleSeconds: number, pointerState: Float32Array) {
      gl.uniform1f(time, seconds);
      gl.uniform1f(reveal, progress);
      gl.uniform1f(idle, idleSeconds);
      gl.uniform4fv(pointer, pointerState);
      gl.uniform2f(origin, ...center);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    dispose,
  };
}
