export default class ImageService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  };

  findAll() {
    return this._resource.query()
      .then(res => res.json());
  };

  find(id) {
    return this._resource.get({ id })
      .then(res => res.json());
  };

  create(image) {
    return this._resource.save(image);
  };

  update(image) {
    return this._resource.update({ id: image._id }, image);
  }

  delete(id) {
    return this._resource.delete({ id });
  };
};
