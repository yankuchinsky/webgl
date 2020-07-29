import loadShader from "./loadShader";

export default (
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) {
    console.log("Can't load shader");
    return null;
  }

  const shaderProgram = gl.createProgram();

  if (!shaderProgram) {
    return null;
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);

  const status = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);

  if (!status) {
    console.log(
      "Unable to init the shader program: ",
      gl.getProgramInfoLog(shaderProgram)
    );

    return null;
  }

  return shaderProgram;
};
