const adminService = require('../service/admin.service');

const create = async (req, res) => {
  try {
    const newUser = await adminService.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: 'Usuário já cadastrado' });
  }
};

const admList = async (_req, res) => {
  const list = await adminService.admList();
  return res.status(200).json(list);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await adminService.deleteUser(id);
  return res.status(200).end();
};

const adminController = {
  create,
  admList,
  deleteUser,
};

module.exports = adminController;
