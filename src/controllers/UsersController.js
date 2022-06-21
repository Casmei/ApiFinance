
exports.indexPage = async (req, res) => {
    res.status(200).res({ 'message': 'Welcome to the index page' });
};

exports.allUsers = async (req, res) => {
    res.status(200).json(result);
};

exports.createUsers = (req, res) => {
    res.status(201).json(req.body);
};
