module.exports = function(repository) {
    return {
        findAll: (req, res, next) => {
            repository
                .findAll()
                .then((docs) => {
                    return res.json(docs);
                })
                .catch(next);
        },

        getCount: (req, res, next) => {
            var isbn = req.params.isbn;

            repository
                .getCount(isbn)
                .then((count) => {
                    res.send({count});
                })
                .catch(next);
        },

        update: (req, res, next) => {
            var isbn = req.body.isbn;
            var count = req.body.count;

            repository
                .update(isbn, count)
                .then(() => {
                    res.status(200).json({
                        isbn,
                        count
                    });
                })
                .catch(next);
        },

        clientError: (req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        },

        serverError: (err, req, res, next) => {
            console.error(err.stack);
            res.status(res.status || 500).json({
                message: err.message,
                error: (process.env.NODE_ENV === 'production') ? {} : err
            });
            next();
        }
    };
};