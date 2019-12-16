exports.formValidator = (req, res, next) => {
    req.check('name', 'File name is required.').notEmpty();
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({err: firstError});
    }
    next();
};