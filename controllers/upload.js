const uploadImage = async (req, res) => {
  const { userId } = req.params;

  res.status(200).json({ documents: userWithDocuments });
};
