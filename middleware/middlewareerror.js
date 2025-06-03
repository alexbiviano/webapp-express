const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "La risorsa richiesta non è stata trovata"

    });
};
const errorHandler = (err, req, res, next) => {
    console.error('Errore:', err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Si è verificato un errore interno al server",
    });
};

module.exports = {
    notFound,
    errorHandler
};
