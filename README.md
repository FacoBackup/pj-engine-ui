# CANVAS 3D ENGINE

Motor gráfico escrito em javascript **"from scratch"**.

[Ambiente de teste.](https://engine-demo.vercel.app/)

**Esse projeto não faz uso algum de nenhuma API para renderização gráfica como WebGL, tudo é feito do zero usando o contexto 2D do canvas e muita algebra.**


### Oque funciona

- Processamento básico de vertices por triângulo.
- Suporte a modelos no formato OBJ com as faces dos triângulos.
- Shader básico baseado no [*normal*](https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal) do triângulo.
- Rotação X, Y e Z.
- FOV e Aspect ratio.
- Mesh clipping.
- Projeção de perspectiva baseado no FOV/AspectRatio e valores para Z próximo e Z distante.
- Vertex highlight / wireframe.
- Configuração de cores para vertex e wireframe.
- Keybindings.
- Sensibilidade dos controles.
- Movimentação da câmera nos eixos X, Y e Z
- Geometry culling baseado no [*normal*](https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal) no triângulo.
### Oque ainda está em desenvolvimento

- Suporte a texturas.
- **Rotação da câmera no eixo Y (prioridade)**
- **Multi-threading (prioridade)**
  > Atualmente a engine trabalha em apenas um núcleo do processador (main thread compartilhado com todas as outras coisas da UI) e ainda não tem comunicação com a GPU
  > 
  > devido a isso é bastante provável que a performace com modelos mais complexos não seja muito boa. 
- **Suporte a processamento de shaders na GPU (prioridade)**
  > Como comentado anteriormente, esse projeto não faz utilização direta do WebGL ou qualquer outra API, devido a isso ainda não foi implementado a conexão com a GPU.
- Suporte a rotação com mouse.
- Dados de performace mais detalhados (em andamento).