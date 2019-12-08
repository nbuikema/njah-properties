exports.signupValidator = (req, res, next) => {
    req.check('first_name', 'First name is required.').notEmpty();
    req.check('last_name', 'Last name is required.').notEmpty();
    req.check('email', 'Email is required.').notEmpty();
    req.check('email', 'Invalid email format.').matches(/.+\@.+\..+/);
    req.check('phone', 'Phone number is required.').notEmpty();
    req.check('password', 'Password is required.').notEmpty();
    req.check('password', 'Password must contain at least 6 characters.').isLength({min: 6});
    req.check('password', 'Password must contain a number.').matches(/\d/);
    req.check('password', 'Password must contain a special character.').matches(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/);
    const errors = req.validationErrors();
    if(errors) {
        const errorList = errors.map(error => error.msg)[0];
        return res.status(400).json({err: errorList});
    }
    next();
};