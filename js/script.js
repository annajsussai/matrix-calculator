// DETERMINANTES DE TRÊS ORDENS

function calcularDeterminante3() {
  // Obter os valores das células da matriz
  var det3_a11 = 1; // Valor fixo, pois é uma matriz de 3x3
  var det3_a12 = parseFloat(document.getElementById("det3_a12").value);
  var det3_a13 = parseFloat(document.getElementById("det3_a13").value);
  var det3_a21 = parseFloat(document.getElementById("det3_a21").value);
  var det3_a22 = parseFloat(document.getElementById("det3_a22").value);
  var det3_a23 = parseFloat(document.getElementById("det3_a23").value);
  var det3_a31 = parseFloat(document.getElementById("det3_a31").value);
  var det3_a32 = parseFloat(document.getElementById("det3_a32").value);
  var det3_a33 = parseFloat(document.getElementById("det3_a33").value);

  // Calcula o determinante
  var determinante = det3_a11 * det3_a22 * det3_a33 + det3_a12 * det3_a23 * det3_a31 + det3_a13 * det3_a21 * det3_a32
                  - det3_a31 * det3_a22 * det3_a13 - det3_a32 * det3_a23 * det3_a11 - det3_a33 * det3_a21 * det3_a12;

  // Exibir o resultado
  document.getElementById("det3_resultado").innerHTML = "Determinante: " + determinante;
}

// DETERMINANTES QUATRO ORDENS LAPLACE CIS

function resolverSistema() {
    // Define a matriz dos coeficientes (a) e o vetor de termos independentes (b)
    var a = [
        [parseFloat(document.getElementById("mat4_a11").value), parseFloat(document.getElementById("mat4_a12").value), parseFloat(document.getElementById("mat4_a13").value), parseFloat(document.getElementById("mat4_a14").value)],
        [parseFloat(document.getElementById("mat4_a21").value), parseFloat(document.getElementById("mat4_a22").value), parseFloat(document.getElementById("mat4_a23").value), parseFloat(document.getElementById("mat4_a24").value)],
        [parseFloat(document.getElementById("mat4_a31").value), parseFloat(document.getElementById("mat4_a32").value), parseFloat(document.getElementById("mat4_a33").value), parseFloat(document.getElementById("mat4_a34").value)],
        [parseFloat(document.getElementById("mat4_a41").value), parseFloat(document.getElementById("mat4_a42").value), parseFloat(document.getElementById("mat4_a43").value), parseFloat(document.getElementById("mat4_a44").value)]
    ];
  
    var b = [
        parseFloat(document.getElementById("mat4_b1").value),
        parseFloat(document.getElementById("mat4_b2").value),
        parseFloat(document.getElementById("mat4_b3").value),
        parseFloat(document.getElementById("mat4_b4").value)
    ];
  
    // Calcula o determinante da matriz dos coeficientes (detA)
    var detA = calcularDeterminante4x4(a);
    if (detA === 0) {
        document.getElementById("resultado-sistema").innerHTML = "Sistema não possui solução única.";
        return;
    }
  
    // Calcula as soluções do sistema usando a regra de Cramer
    var x = [];
    for (var i = 0; i < 4; i++) {
        var temp = JSON.parse(JSON.stringify(a)); // Copiar a matriz original
        for (var j = 0; j < 4; j++) {
            temp[j][i] = b[j]; // Substituir a coluna i pelo vetor de termos independentes
        }
        x.push(calcularDeterminante4x4(temp) / detA); // Calcular a solução para a variável i
    }
  
    // Exibe a solução no elemento HTML "resultado-sistema"
    document.getElementById("resultado-sistema").innerHTML = "Solução do sistema:<br>x = " + x.join(", ");
  }
  
  // Função para calcular o determinante de uma matriz 4x4 usando a regra de Laplace
  function calcularDeterminante4x4(matrix) {
    if (matrix.length !== 4 || matrix[0].length !== 4) {
        return null; // A matriz não é 4x4
    }
  
    var det = 0;
    for (var i = 0; i < 4; i++) {
        det += matrix[0][i] * cofator(matrix, 0, i);
    }
  
    return det;
  }
  
  // Função para calcular o cofator de um elemento da matriz
  function cofator(matrix, row, col) {
    var submatrix = [];
    for (var i = 0; i < 4; i++) {
        if (i !== row) {
            var temp = [];
            for (var j = 0; j < 4; j++) {
                if (j !== col) {
                    temp.push(matrix[i][j]);
                }
            }
            submatrix.push(temp);
        }
    }
    var sign = (row + col) % 2 === 0 ? 1 : -1; // Determina o sinal do cofator
    return sign * calcularDeterminante3x3(submatrix); // Calcula o determinante da submatriz 3x3
  }
  
  // Função para calcular o determinante de uma matriz 3x3 (usada nos cofatores)
  function calcularDeterminante3x3(matrix) {
    return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
  }
  

// MATRIZ INVERSA

function calcularInversa() {
    // Obtem a entrada da matriz da textarea com ID "matrixInput"
    const matrixInput = document.getElementById("matrixInput").value;
  
    // Divida a entrada em linhas e remova espaços em branco 
    const matrixRows = matrixInput.trim().split("\n");
  
    // Inicializa uma matriz vazia para armazenar os valores da matriz
    let matrixArray = [];
  
    // Percorra cada linha da entrada
    for (const row of matrixRows) {
        // Divide a linha em valores separados por vírgulas e converte ele em decimais
        const rowValues = row.split(",").map(value => parseFloat(value.trim()));
  
        // Verifica se todos os valores são números válidos
        if (!rowValues.every(value => !isNaN(value))) {
            // Se houver algum valor inválido, exibe uma mensagem de erro
            const resultDiv = document.getElementById("result-inversa");
            resultDiv.innerHTML = "Erro: Entrada inválida na matriz.";
            return;
        }
  
        // Adiciona a linha à matriz de valores da matriz
        matrixArray.push(rowValues);
    }
  
    try {
        // Cria uma matriz math.js a partir dos valores da matriz
        const matrix = math.matrix(matrixArray);
  
        // Calcula a matriz inversa usando math.js
        const inverseMatrix = math.inv(matrix);
  
        // Exibe a matriz inversa formatada com precisão de 6 casas decimais
        const resultDiv = document.getElementById("result-inversa");
        resultDiv.innerHTML = math.format(inverseMatrix, { precision: 6 });
    } catch (error) {
        // Se houver um erro ao calcular a matriz inversa, exibe uma mensagem de erro
        const resultDiv = document.getElementById("result-inversa");
        resultDiv.innerHTML = "Erro: A matriz inserida não é invertível.";
    }
  }
  