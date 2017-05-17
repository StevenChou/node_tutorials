exports.myMiddleware = (req, res, next) => {
    req.name = 'Steven';
    if (req.name === 'Steven') {
        throw Error("That's a very cool name");
    }

    res.cookie('name', 'Steven.Chou is cool', {maxAge: 90000});
    // done the work in this middleware
    // call next method in router
    next();
};


exports.homepage = (req, res) => {
    const steven = {name: 'Steven', age: 77, cool: true};
    console.log(req.name);
    // res.send('Hey! It works!');
    // res.json(steven);

    // res.send(req.query.name);
    // res.json(req.query);
    //   res.render('hello', {
    //     name: 'Steven',
    //     dog: req.query.dog,
    //     title: 'I love house!!'
    //   });
    res.render('index');
};