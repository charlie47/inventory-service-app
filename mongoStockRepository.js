var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/book_inventory_db';

var collection = MongoClient.connect(url).then((db) => {
    return db.collection('books');
});

var repo = function() {
    return {
        getCount: (isbn) => {
            var query = {isbn: isbn};
            return collection
                .then((collection) => {
                    return collection
                        .find(query)
                        .limit(1)
                        .next();
                })
                .then((docs) => {
                    if (docs) {
                        return docs.count;
                    }
                    return null;
                });
        },

        findAll: () => {
            return collection
                .then((collection) => {
                    return collection
                        .find({})
                        .toArray();
                });
        },

        update: (isbn, count) => {
            return collection
                .then((collection) => {
                    var filter = {isbn: isbn};
                    var update = {isbn: isbn, count: count};
                    var options = {upsert: true};

                    return collection.updateOne(filter, update, options);
                });
        }
    };
};

module.exports = repo;