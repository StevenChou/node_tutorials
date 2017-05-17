exports.homepage = (req, res) => {
    const steven = {name: 'Steven', age: 77, cool: true};
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