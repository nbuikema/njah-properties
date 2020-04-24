const cloudinary = require("cloudinary");
const NodeGeocoder = require('node-geocoder');
const Property = require('../models/property');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const options = {
    provider: 'mapquest',
    apiKey: 'xUGdBNGQGwAyenRz4MGDA3FloqUrrJAc'
};
const geocoder = NodeGeocoder(options);

exports.propertyById = (req, res, next, id) => {
    Property.findById(id).exec((err, property) => {
        if(err || !property) {
            return res.status(400).json({error: 'Property was not found.'});
        }
        req.selectedProperty = property;
        next();
    });
};

exports.createProperty = (req, res) => {
    const images = [];
    req.files.forEach(image => {
        let img = {};
        img.url = image.secure_url;
        img.id = image.public_id;
        images.push(img);
    });
    const property = new Property(req.body);
    property.images = images;
    const {address, address2, city, state, zip} = property;
    geocoder.geocode(`${address}, ${city}, ${state}, ${zip}`).then(response => {
        property.lat = response[0].latitude;
        property.long = response[0].longitude;
        Property.find({address: address, address2: address2}).exec((err, foundProperty) => {
            if(err) {
                return res.status(400).json({error: 'Property could not be created.'});
            } else {
                if(foundProperty.length === 0) {
                    property.save((err, data) => {
                        if(err) {
                            return res.status(400).json({error: 'Property could not be created.'});
                        }
                        return res.json({data});
                    });
                } else {
                    return res.status(400).json({error: 'This property already exists.'});
                }
            }
        });
    }).catch(err => {
        return res.status(400).json({error: 'Property could not be created.'});
    });
};

exports.readAllProperties = (req, res) => {
    Property.find().exec((err, properties) => {
        if(err) {
            return res.status(400).json({error: 'Could not find properties.'});
        }
        return res.json(properties);
    });
};

exports.readPropertiesWithQuery = (req, res) => {
    let query = {};
    let sortBy = '_id';
    let order = 'asc';
    for(let param in req.query) {
        switch(param) {
            case 'rentMin':
                if(!query['rent']) {
                    query['rent'] = {$gte: Number(req.query[param])};
                    break; 
                } else {
                    query['rent'].$gte = Number(req.query[param]);
                    break; 
                }
            case 'rentMax':
                if(!query['rent']) {
                    query['rent'] = {$lte: Number(req.query[param])};
                    break; 
                } else {
                    query['rent'].$lte = Number(req.query[param]);
                    break; 
                }
            case 'beds':
                query['beds'] = Number(req.query[param]);
                break;
            case 'baths':
                query['baths'] = Number(req.query[param]);
                break;
            case 'sortBy':
                sortBy = req.query[param];
                break;
            case 'order':
                order = req.query[param];
                break;
            default:
                return;
        }
    }

    Property.find(query).sort([[sortBy, order]]).exec((err, properties) => {
        if(err) {
            return res.status(400).json({error: 'Could not find properties.'});
        }
        return res.json(properties);
    });
};

exports.readProperty = (req, res) => {
    Property.find({_id: req.selectedProperty._id}).exec((err, property) => {
        if(err) {
            return res.status(400).json({error: 'Could not find property.'});
        }
        return res.json(property);
    });
};

exports.deleteProperty = (req, res) => {
    req.selectedProperty.images.map(image => {
        cloudinary.v2.uploader.destroy(`${image.id}`, function(error, result) {
            if(error) {
                return res.status(400).json({error: 'Property could not be deleted.'});
            }
        });
    });
    Property.findOneAndDelete(
        {_id: req.selectedProperty._id},
        (err, property) => {
            if(err) {
                return res.status(400).json({error: 'Property could not be deleted.'});
            } else {
                return res.json({message: 'Property successfully deleted.'});
            }
        }
    );
};

exports.updateProperty = (req, res) => {
    Property.findOneAndUpdate(
        {_id: req.selectedProperty._id},
        {$set: req.body},
        {new: true},
        (err, property) => {
            if(err) {
                return res.status(400).json({error: 'Property could not be updated.'});
            }
            return res.json(property);
        }
    );
};