import File from '../models/File';

class FileController {
  async index(req, res) {}
  async show(req, res) {}
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
  async update(req, res) {}
  async delete(req, res) {}
}

export default new FileController();
