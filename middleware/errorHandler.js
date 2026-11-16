
function notFound(req, res, next) {
    res.status(404).render('404');
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(500).send('Something went wrong on the server.');
}

module.exports = {
    notFound,
    errorHandler
};
