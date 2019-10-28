const NodeGeocoder = require('node-geocoder');
const Property = require('../models/property');

const options = {
    provider: 'mapquest',
    apiKey: 'xUGdBNGQGwAyenRz4MGDA3FloqUrrJAc'
};
const geocoder = NodeGeocoder(options);

exports.createProperty = (req, res) => {
    const property = new Property(req.body);
    const {address, city, state, zip} = property;
    geocoder.geocode(`${address}, ${city}, ${state}, ${zip}`).then(response => {
        property.lat = response[0].latitude;
        property.long = response[0].longitude;
        Property.find({lat: property.lat, long:property.long}).exec((err, foundProperty) => {
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
    let sortBy = 'rent';
    let order = 'desc';
    for(let param in req.query) {
        switch(param) {
            case 'priceMin':
                if(!query['rent']) {
                    query['rent'] = {$gte: Number(req.query[param])};
                    break; 
                } else {
                    query['rent'].$gte = Number(req.query[param]);
                    break; 
                }
            case 'priceMax':
                if(!query['rent']) {
                    query['rent'] = {$lte: Number(req.query[param])};
                    break; 
                } else {
                    query['rent'].$lte = Number(req.query[param]);
                    break; 
                }
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

    console.log(query);

    Property.find(query).sort([[sortBy, order]]).exec((err, properties) => {
        if(err) {
            return res.status(400).json({error: 'Could not find properties.'});
        }
        return res.json(properties);
    });
};