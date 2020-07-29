import drawScene from "./drawScene";
import initBuffers from "./initBuffers";
import { ProgramInfo } from "./types";
import initShaderProgram from "./initShaderProgram";

const bootstrap = () => {
  const canvas: HTMLCanvasElement | null = document.querySelector(
    "#canvas-field"
  );

  if (!canvas) {
    return;
  }

  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("Unable to init webGl");

    return;
  }

  gl.clearColor(0, 0, 0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
`;

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  if (!shaderProgram) {
    return;
  }

  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  const buffers = initBuffers(gl);

  const render = (now: number) => {
    now *= 0.001;

    drawScene(gl, programInfo, buffers, now);
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

bootstrap();
