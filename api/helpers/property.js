exports.propertyValidator = (req, res, next) => {
    req.check('address', 'Address is required.').notEmpty();
    req.check('city', 'City is required.').notEmpty();
    req.check('state', 'State is required.').notEmpty();
    req.check('zip', 'Zip code is required.').notEmpty();
    req.check('rent', 'Rent is required.').notEmpty();
    req.check('size', 'Size is required.').notEmpty();
    req.check('beds', 'Beds is required.').notEmpty();
    req.check('baths', 'Baths is required.').notEmpty();
    req.check('info', 'Additional info is required.').notEmpty();
    req.check('available', 'Availability is required.').notEmpty();
    const errors = req.validationErrors();
    if(errors) {
        const errorList = errors.map(error => error.msg)[0];
        return res.status(400).json({err: errorList});
    }
    next();
};

exports.updatePropertyValidator = (req, res, next) => {
    req.check('address', 'Address is required.').notEmpty();
    req.check('city', 'City is required.').notEmpty();
    req.check('state', 'State is required.').notEmpty();
    req.check('zip', 'Zip code is required.').notEmpty();
    req.check('lat', 'Latitude is required.').notEmpty();
    req.check('long', 'Longitude is required.').notEmpty();
    req.check('rent', 'Rent is required.').notEmpty();
    req.check('size', 'Size is required.').notEmpty();
    req.check('beds', 'Beds is required.').notEmpty();
    req.check('baths', 'Baths is required.').notEmpty();
    req.check('info', 'Additional info is required.').notEmpty();
    req.check('available', 'Availability is required.').notEmpty();
    const errors = req.validationErrors();
    if(errors) {
        const errorList = errors.map(error => error.msg)[0];
        return res.status(400).json({err: errorList});
    }
    next();
};