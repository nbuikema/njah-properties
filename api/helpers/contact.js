exports.contactValidator = (req, res, next) => {
    req.check('first_name', 'First name is required.').notEmpty();
    req.check('last_name', 'Last name is required.').notEmpty();
    req.check('email', 'Email is required.').notEmpty();
    req.check('email', 'Invalid email format.').matches(/.+\@.+\..+/);
    req.check('phone', 'Email is required.').notEmpty();
    req.check('reason', 'Reason for contact is required.').notEmpty();
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({err: firstError});
    }
    next();
};