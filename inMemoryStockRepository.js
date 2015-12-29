var _ = require('lodash');

module.exports = function() {

    var collection = [];

    return {
        getCount: (isbn) => {
            var item = _.find(collection, (book) => {
                return book.isbn == isbn;
            });

            return Promise.resolve(item);
        },

        findAll: () => {
            return Promise.resolve(collection);
        },

        update: (isbn, count) => {
            var update = { isbn, count };
            var index = _.findIndex(collection, (row) => {
                return row.isbn == isbn;
            });

            if (index > -1) {
                collection[index] = update;
            } else {
                collection.push(update);
            }

            return Promise.resolve();
        }
    };
};