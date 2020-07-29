export default (gl: WebGLRenderingContext) => {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    // Front face
    -1.0,
    -1.0,
    1.0,

    1.0,
    -1.0,
    1.0,

    1.0,
    1.0,
    1.0,

    -1.0,
    1.0,
    1.0,

    // Back face
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,

    // Top face
    -1.0,
    1.0,
    -1.0,

    -1.0,
    1.0,
    1.0,

    1.0,
    1.0,
    1.0,

    1.0,
    1.0,
    -1.0,

    // Bottom face
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,

    -1.0,
    -1.0,
    1.0,

    // Right face
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,

    // Left face
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    -1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    -1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const faceColors = [
    [1.0, 1.0, 1.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0],
    [0.0, 0.2, 0.0, 1.0],
    [1.0, 0.1, 0.0, 1.0],
  ];

  let colors: number[] = [];

  for (let j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [
    // front
    0,
    1,
    2,
    0,
    2,
    3,

    // back
    4,
    5,
    6,
    4,
    6,
    7,

    // top
    8,
    9,
    10,
    8,
    10,
    11,

    // bottom
    12,
    13,
    14,
    12,
    14,
    15,

    // right
    16,
    17,
    18,
    16,
    18,
    19,

    // left
    20,
    21,
    22,
    20,
    22,
    23,
  ];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
};
