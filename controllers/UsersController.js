exports.indexPage = (req, res) => {
    res.status(200).send();
}

exports.allUsers = (req, res) => {
    const users = [
        { name: "Jonh Doe", mail: "jonh@mail.com" }
    ];

    res.status(200).json(users);
};

exports.createUsers = (req, res) => {
    res.status(201).json(req.body);
};
