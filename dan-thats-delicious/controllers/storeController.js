const mongoose = require('mongoose');
// 已經在 start.js import
const Store = mongoose.model('Store');


exports.myMiddleware = (req, res, next) => {
    req.name = 'Steven';
    if (req.name === 'Steven') {
        // throw Error("That's a very cool name");
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

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store'});
};

exports.createStore = async (req, res) => {    
    // const store = new Store(req.body);
    // await store.save();

    const store = await(new Store(req.body)).save();

    // 定義在 app.js 的 middleware
    req.flash('success', `Successfully Created ${store.name}. Care
            to leave a review?`);

    // redirect 會叫 browser 重發一次請求!!
    // 所以 req.flash 只適用於 redirect
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // 1. Query the database for a list of all stores
    const stores =  await Store.find();
    res.render('stores', { title: 'Stores', stores, stores});
};

exports.editStore = async (req, res) => {
    // 1. Find the store given the ID    
    const store = await Store.findOne({ _id: req.params.id});

    // 2. Confirm they are the owner of the store
    // TODO

    // 3. Render out the edit form so the user can update their store
    res.render('editStore', { title: `Edit ${store.name}`, store})
};

exports.updateStore = async (req, res) => {
    // 1. find and update the store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new store instead of the old one.
        runValidators: true   // validator 預設只跑在第一次儲存物件時
    }).exec();

    // 2. Redirect them the store and tell them it worked.
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}"> View Store → </a>`);

    res.redirect(`/stores/${store._id}/edit`);    
}
