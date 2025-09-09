const ANIMAIS = {
  "Rex": { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
  "Mimi": { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
  "Fofo": { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
  "Zero": { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
  "Bola": { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
  "Bebe": { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
  "Loco": { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

const BRINQUEDOS_VALIDOS = new Set(["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]);

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, animais) {
    const pessoa1 = new Pessoa(1, brinquedosPessoa1);
    const pessoa2 = new Pessoa(2, brinquedosPessoa2);
    const ordemAnimais = FormatarTexto.listaMaiusculaSemEspaco(animais);

    return this.processarInformacoes(pessoa1, pessoa2, ordemAnimais);
  }

  validarInformacoes(pessoa1, pessoa2, ordemAnimais) {
    const brinquedoValido = (lista) => {
      const quantidadeBrinquedos = new Set(lista).size;
      return lista.every(brinquedo => BRINQUEDOS_VALIDOS.has(brinquedo)) && quantidadeBrinquedos === lista.length;
    }

    const animalValido = (animais) => {
      const quantidadeAnimais = new Set(animais).size;
      return animais.every(animal => ANIMAIS[animal]) && quantidadeAnimais === animais.length;
    }

    if (ordemAnimais === null) return 0;
    if (!brinquedoValido(pessoa1.retornarBrinquedos()) || !brinquedoValido(pessoa2.retornarBrinquedos())) return "Brinquedo inválido";
    if (!animalValido(ordemAnimais)) return "Animal inválido";

    return false;
  }

  processarInformacoes(pessoa1, pessoa2, ordemAnimais) {
    ordemAnimais = ordemAnimais.map(animal => FormatarTexto.comecoMaiusculo(animal));

    const erro = this.validarInformacoes(pessoa1, pessoa2, ordemAnimais);
    const resultado = new Resultado();

    if (erro) {
      resultado.definirResultado(false, erro);
      return resultado;
    }

    for (const nome of ordemAnimais) {
      const dados = ANIMAIS[nome];
      const animal = new Animal(nome, dados.tipo, dados.brinquedos);
      const pessoa1PodeAdotar = animal.podeSerAdotadoPor(pessoa1, pessoa1.retornarAnimaisAdotados());
      const pessoa2PodeAdotar = animal.podeSerAdotadoPor(pessoa2, pessoa2.retornarAnimaisAdotados());
      let destino = "abrigo";

      if (pessoa1PodeAdotar && !pessoa2PodeAdotar && pessoa1.podeAdotar()) {
        destino = `pessoa ${pessoa1.retornarId()}`;
        pessoa1.adotar(animal);
      } else if (pessoa2PodeAdotar && !pessoa1PodeAdotar && pessoa2.podeAdotar()) {
        destino = `pessoa ${pessoa2.retornarId()}`;
        pessoa2.adotar(animal);
      } else if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
        destino = "abrigo";
      }

      resultado.definirLista(`${animal.retornarNome()} - ${destino}`);
      resultado.definirError(false);
    }

    resultado.ordernarLista();

    return resultado;
  }
}

class Pessoa {
  constructor(id, brinquedos) {
    this._id = id;
    this._brinquedos = brinquedos;
    this._animaisAdotados = [];
  }

  podeAdotar() {
    return this._animaisAdotados.length < 3;
  }

  adotar(animal) {
    this._animaisAdotados.push(animal.nome);
  }

  retornarId() {
    return this._id;
  }

  retornarBrinquedos() {
    return FormatarTexto.listaMaiusculaSemEspaco(this._brinquedos);

  }

  retornarAnimaisAdotados() {
    return this._animaisAdotados;
  }
}

class Animal {
  constructor(nome, tipo, brinquedos) {
    this._nome = nome;
    this._tipo = tipo;
    this._brinquedos = brinquedos;
  }

  podeSerAdotadoPor(pessoa, outrosAnimais) {
    if (this._nome === "Loco") {
      const temTodos = this._brinquedos.every(brinquedo => pessoa.retornarBrinquedos().includes(brinquedo));
      return temTodos && outrosAnimais.length > 0;
    }

    return this.ehSequencial(this._brinquedos, pessoa.retornarBrinquedos());
  }

  ehSequencial(necessarios, disponiveis) {
    let i = 0;
    for (const brinquedo of disponiveis) {
      if (brinquedo === necessarios[i]) i++;
      if (i === necessarios.length) return true;
    }

    return false;
  }

  retornarNome() {
    return this._nome;
  }
}

class Resultado {
  constructor() {
    this.lista = [];
    this.erro = false;
  }

  definirLista(lista) {
    this.lista.push(lista);
  }

  definirError(erro) {
    this.erro = erro;
  }

  definirResultado(lista, erro) {
    this.lista = lista;
    this.erro = erro;
  }

  ordernarLista() {
    this.lista.sort();
  }
}

class FormatarTexto {
  static listaMaiusculaSemEspaco(texto) {
    return texto
      .trim()
      .toUpperCase()
      .split(",")
      .map(brinquedo => brinquedo.split(" ").join(""));
  }

  static comecoMaiusculo(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

}

export { AbrigoAnimais as AbrigoAnimais };
