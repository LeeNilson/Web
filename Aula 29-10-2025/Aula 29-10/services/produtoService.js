exports.validarDadosProduto = ({ id, nome, preco, estoque, slug }) => {
   if (!nome || typeof nome !== 'string' || nome.trim() === "") {
        throw new Error("O campo 'nome' é obrigatório e deve ser um texto.");
   }
   if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
        throw new Error("O campo 'preco' é obrigatório e deve ser um número positivo.");
   }
   if (!slug || typeof slug !== 'string' || slug.trim() === "") {
        throw new Error("O campo 'slug' é obrigatório e deve ser um texto.");
   }
  return {
    id,
    nome,
    preco,
    estoque: estoque || 0,
    slug,
    dataCriacao: new Date().toISOString()
  };
};

