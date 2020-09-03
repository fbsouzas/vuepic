export default class ImageService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  };

  findAll() {
    return this._resource.query()
      .then(res => res.json(), err => {
        console.log(err);

        throw Error('Não foi possível obter as imagens. Tente mais tarde!');
      });
  };

  find(id) {
    return this._resource.get({ id })
      .then(res => res.json(), err => {
        console.log(err);

        throw Error('Não foi possível obter a imagem. Tente mais tarde!');
      });
  };

  create(image) {
    return this._resource.save(image)
      .then(null, err => {
        console.log(err);

        throw Error('Não foi possível cadastrar uma nova imagem. Tente mais tarde!');
      });
  };

  update(image) {
    return this._resource.update({ id: image._id }, image)
      .then(null, err => {
        console.log(err);

        throw Error('Não foi possível atualizar a imagem. Tente mais tarde!');
      });
  }

  delete(id) {
    return this._resource.delete({ id })
      .then(null, err => {
        console.log(err);

        throw Error('Não foi possível remover a imagem. Tente mais tarde!');
      });
  };
};
