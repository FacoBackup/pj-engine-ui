# canvas-3d-cube
Cubo 3d com Javascript Canvas API.

### Como usar ?
1. Clonar ou adicionar o repositório em seu projeto React package.json.
2. Importar componente **Canvas**
3. Pronto.

### Como funciona ?

Um cubo nada mais é que uma junção de pontos interligados no espaço, porém, estamos usando um plano 2d para renderização desse "cubo". Como isso funciona então ?

Bom para iniciar é interessante saber de alguns pontos:

- Projeção: Este projeto faz uso de uma matriz de projeção, onde um ponto 3D qualquer (x, y, z) é transformado em um ponto 2D (x, y)
- Rotação no espaço 3D: As matrizes de rotação são utilizadas para melhorar a ilusão de algo 3D na tela utilizando a multiplicação da matriz de rotação para o eixo escolhido e o ponto 3D.

- Renderização básica com Canvas API
  - arc: Cria arco na tela com origem no ponto definido.
  - lineTo: Cria linha para o ponto definido.
  - moveTo: Inicia o desenho no ponto determinado.
  - beginPath: Inicia um novo caminho.
  - fill: Preenche caminho.
  - stroke: Preenche linha com largura definida em lineWidth.
- Animações: Animações também são utilizadas nesse projeto para simular a rotação do cubo no espaço.
  - requestAnimationFrame: Faz pedido de um novo frame para animação, nesse caso a animação é infinita e não acontece alteração no angulo que está sendo aplicado na rotação do cubo
  
  
#### Código

- Classes:
  - Cube: 
    ```js
    // Iniciando o cubo na origem x, y, z com dimensões size
    const cube = new Cube(originX, originY, originZ, size)
      
    // Rotaciona cubo no exio (axis), com angulo (angle) e escala (scale).
    // O call dessa função irá resultar na rerenderização do plano.
   
    const axis = ['x','y','z'], angle = .03
    cube.rotate(axis[0], angle, 1, ctx)
   
    // Nesse ponto o cubo já foi rotacionado e renderizado.
    ```
- Métodos:
  - multiply: Recebe duas matrizes e retorna a multiplicação entre as duas caso possivel (caso contrario é retornado um vetor vazio.
  - rotationMatrix: Recebe eixo para rotação e o angulo, retorna matriz de rotação.
  - projectionMatrix: Retorna matriz de projeção para dimensão desejada.
- Componentes:
  - Canvas: Ajusta dimensões da janela do canvas para ficar devidamente ajustado na tela, renderiza cubo, controla animação para rotação na tela.
