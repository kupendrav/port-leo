import { useRef, useEffect } from 'react'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    
    float t = uTime * 0.3;
    
    // Layered noise for flowing energy effect
    float n1 = snoise(p * 1.5 + t * 0.4);
    float n2 = snoise(p * 3.0 - t * 0.6 + 10.0);
    float n3 = snoise(p * 5.0 + t * 0.8 + 20.0);
    
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Radial energy pulse from center
    float dist = length(p);
    float pulse = sin(dist * 4.0 - uTime * 1.5) * 0.5 + 0.5;
    pulse *= exp(-dist * 0.8);
    
    // Color palette - deep space with energy
    vec3 col1 = vec3(0.02, 0.02, 0.08); // Deep space
    vec3 col2 = vec3(0.05, 0.15, 0.35); // Deep blue
    vec3 col3 = vec3(0.1, 0.4, 0.8);    // Bright blue
    vec3 col4 = vec3(0.5, 0.2, 0.9);    // Purple
    vec3 col5 = vec3(0.0, 0.9, 0.7);    // Cyan/teal
    
    float n = noise * 0.5 + 0.5;
    vec3 color = mix(col1, col2, smoothstep(0.0, 0.3, n));
    color = mix(color, col3, smoothstep(0.3, 0.5, n));
    color = mix(color, col4, smoothstep(0.5, 0.7, n));
    color = mix(color, col5, pulse * 0.6);
    
    // Add subtle grid lines (tech feel)
    vec2 grid = abs(fract(uv * 30.0 - 0.5) - 0.5);
    float gridLine = min(grid.x, grid.y);
    float gridMask = 1.0 - smoothstep(0.0, 0.03, gridLine);
    color += vec3(0.05, 0.15, 0.3) * gridMask * 0.3 * (1.0 - dist * 0.5);
    
    // Scanline effect
    float scanline = sin(gl_FragCoord.y * 1.5 + uTime * 2.0) * 0.03;
    color += scanline;
    
    // Vignette
    float vignette = 1.0 - dist * 0.6;
    color *= vignette;
    
    // Particle-like sparkles
    float sparkle = snoise(uv * 50.0 + uTime * 2.0);
    sparkle = pow(max(sparkle, 0.0), 8.0) * 0.5;
    color += vec3(0.3, 0.6, 1.0) * sparkle;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function GLSLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    // Full-screen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const posLoc = gl.getAttribLocation(program, 'position')
    const timeLoc = gl.getUniformLocation(program, 'uTime')
    const resLoc = gl.getUniformLocation(program, 'uResolution')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const startTime = performance.now()

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000

      gl.useProgram(program)
      gl.enableVertexAttribArray(posLoc)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(timeLoc, elapsed)
      gl.uniform2f(resLoc, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
