precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// hash function
vec4 hash(vec4 x) {
    return fract(sin(x * 133.3) * 43758.5453);
}

// pixelate the image
vec2 pixelate(vec2 st, float size) {
    return floor(st * size) / size;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // pixelate the image
    // st = pixelate(st, 50.0);

    // draw checkerboard
    // vec2 i_st = floor(st * 8.0);
    // vec2 f_st = fract(st * 8.0);
    // vec3 color = mix(vec3(1.0), vec3(0.0), step(0.5, mod(i_st.x + i_st.y, 2.0)));

    // draw gradient
    vec3 color = vec3(0.0);
    color = mix(color, vec3(1.0), st.y);
    color = mix(color, vec3(1.0, sin(u_time), 0.0), st.x);

    // glitch effect
    vec2 p = st * 0.5;
    p = pixelate(p, 50.0);
    vec4 n = hash(vec4(p, u_time * 0.1, 0.0));
    color = mix(color, vec3(1.0), n.x);

    // clip with moving circle
    vec2 mouse = u_mouse / u_resolution;
    float d = distance(st, mouse);
    color = mix(color, vec3(0.0), smoothstep(0.25, 0.3, d));

    gl_FragColor = vec4(color, 1.0);
}
