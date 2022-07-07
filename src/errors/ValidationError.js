module.exports = function ValidationError(messagem) {
    this.name = 'ValidationError';
    this.messagem = messagem;
};
