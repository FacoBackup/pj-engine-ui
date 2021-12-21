# Projection engine

Motor gráfico escrito em javascript **"from scratch"**.

[Ambiente de teste.](https://engine-demo.vercel.app/)

**Esse projeto não faz uso algum de NENHUMA API para renderização gráfica (como WebGL), tudo é feito do zero usando o contexto 2D do canvas e muita matemática.**


### Features

- Suporte a **modelos no formato `.obj`** com as faces dos triângulos.
- **Shader básico** baseado no [*normal*](https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal) do triângulo.
- **Rotação** **X**, **Y** e **Z**.
- **FOV** e **Aspect ratio**.
- **Clipping**.
- **Projeção de perspectiva** baseado no FOV/AspectRatio e valores para Z próximo e Z distante.
- **Vertex highlight / wireframe**.
- Configuração de **cores para vertex e wireframe**.
- **Keybindings**.
- **Sensibilidade** dos controles.
- **Movimentação da câmera nos eixos X, Y e Z / Rotação da câmera**
- **Geometry culling** baseado no [*normal*](https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal) no triângulo.

### Em desenvolvimento


| Status | Implementação                             | Razão                        | Prioridade |
|--------|-------------------------------------------|------------------------------|------------|
| [x]    | Index buffer                              | Performance                  | Alta       |
| [ ]    | Vertex buffer                             | Performance                  | Alta       |
| [ ]    | Depth buffer                             | Performance                  | Alta       |
| [ ]    | Suporte a multi-thread                    | Performance                  | Alta       |
| [ ]    | Suporte a processamento de shaders na GPU | Performance / escalabilidade | Alta       |
| [ ]    | Texturas                                  | Visual                       | Média      |
| [ ]    | Inputs melhorados                         | Visual                       | Média      |
| [x]    | Yaw e pitch da câmera                     | Visual                       | Alta       |