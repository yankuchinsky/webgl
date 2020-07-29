export default (
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!status) {
    console.log("Can't compile shader ", gl.getShaderInfoLog(shader));

    gl.deleteShader(shader);

    return null;
  }

  return shader;
};
