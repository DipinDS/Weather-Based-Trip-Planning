var db = require('../config/connection')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const { response } = require('../app')
const collections = require('../config/collections')

module.exports = {
    // addProduct: (places, callback) => {
    //     db.get().collection(collection.LOCATIONS).insertOne(places).then((data) => {
    //         callback(data.insertedId)
    //     })
    // },
    addProduct: (locationData, callback) => {
        console.log('At addProduct');
        console.log(locationData);
        const formattedLocationData = {
            "Name": locationData.Name,
            "About": locationData.About,
            "Description": locationData.Description,
            "Cuisine": locationData.Cuisine,
            "Activities": {
                "Clear": [
                    { "name": locationData.ClearActivity1Name, "about": locationData.ClearActivity1About, "description": locationData.ClearActivity1Description, "loc": locationData.ClearActivity1Loc },
                    { "name": locationData.ClearActivity2Name, "about": locationData.ClearActivity2About, "description": locationData.ClearActivity2Description, "loc": locationData.ClearActivity2Loc },
                    { "name": locationData.ClearActivity3Name, "about": locationData.ClearActivity3About, "description": locationData.ClearActivity3Description, "loc": locationData.ClearActivity3Loc },
                ],
                "Rainy": [

                    { "name": locationData.RainyActivity1Name, "about": locationData.RainyActivity1About, "description": locationData.RainyActivity1Description, "loc": locationData.RainyActivity1Loc },
                    { "name": locationData.RainyActivity2Name, "about": locationData.RainyActivity2About, "description": locationData.RainyActivity2Description, "loc": locationData.RainyActivity2Loc },
                    { "name": locationData.RainyActivity3Name, "about": locationData.RainyActivity3About, "description": locationData.RainyActivity3Description, "loc": locationData.RainyActivity3Loc },

                ],
                "Windy": [
                    { "name": locationData.WindyActivity1Name, "about": locationData.WindyActivity1About, "description": locationData.WindyActivity1Description, "loc": locationData.WindyActivity1Loc },
                    { "name": locationData.WindyActivity2Name, "about": locationData.WindyActivity2About, "description": locationData.WindyActivity2Description, "loc": locationData.WindyActivity2Loc },
                    { "name": locationData.WindyActivity3Name, "about": locationData.WindyActivity3About, "description": locationData.WindyActivity3Description, "loc": locationData.WindyActivity3Loc },
                ]
            },
            "google_map_links": locationData.loc_google_map_links,
        };
        db.get().collection(collection.LOCATIONS).insertOne(formattedLocationData)
            .then((data) => {
                console.log(data);

                console.log("Inserted successfully");
                // Only pass the ID in the success case
                callback(data.insertedId);
            })
            .catch((error) => {
                console.error('Error inserting location data:', error);
                // Pass only the error in the error case
                callback(null, error);
            });
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            users = await db.get().collection(collection.USER).find().toArray();
            resolve(users);
        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let places = await db.get().collection(collection.LOCATIONS).find().toArray();
            resolve(places)
        })
    },
    deleteLocation: (locationId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.LOCATIONS).deleteOne({ _id: new ObjectId(locationId) }).then((response) => {
                resolve(response)
            })
        })
    },
    getProduct: (locationId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.LOCATIONS).findOne({ _id: new ObjectId(locationId) }).then((response) => {
                resolve(response)
            })
        })
    },
    updateLocation: (locationId, details) => {
        return new Promise((resolve, reject) => {
            // console.log(locationId);
            // console.log(details);

            const formattedLocationData = {
                "Name": details.Name,
                "About": details.About,
                "Description": details.Description,
                "Cuisine": details.Cuisine,
                "Activities": {
                    "Clear": [
                        { "name": details.ClearActivity1Name, "about": details.ClearActivity1About, "description": details.ClearActivity1Description, "loc": details.ClearActivity1Loc },
                        { "name": details.ClearActivity2Name, "about": details.ClearActivity2About, "description": details.ClearActivity2Description, "loc": details.ClearActivity2Loc },
                        { "name": details.ClearActivity3Name, "about": details.ClearActivity3About, "description": details.ClearActivity3Description, "loc": details.ClearActivity3Loc },
                    ],
                    "Rainy": [
    
                        { "name": details.RainyActivity1Name, "about": details.RainyActivity1About, "description": details.RainyActivity1Description, "loc": details.RainyActivity1Loc },
                        { "name": details.RainyActivity2Name, "about": details.RainyActivity2About, "description": details.RainyActivity2Description, "loc": details.RainyActivity2Loc },
                        { "name": details.RainyActivity3Name, "about": details.RainyActivity3About, "description": details.RainyActivity3Description, "loc": details.RainyActivity3Loc },
    
                    ],
                    "Windy": [
                        { "name": details.WindyActivity1Name, "about": details.WindyActivity1About, "description": details.WindyActivity1Description, "loc": details.WindyActivity1Loc },
                        { "name": details.WindyActivity2Name, "about": details.WindyActivity2About, "description": details.WindyActivity2Description, "loc": details.WindyActivity2Loc },
                        { "name": details.WindyActivity3Name, "about": details.WindyActivity3About, "description": details.WindyActivity3Description, "loc": details.WindyActivity3Loc },
                    ]
                },
                "google_map_links": details.google_map_links,
            };

            db.get().collection(collection.LOCATIONS)
                .updateOne({ _id: new ObjectId(locationId) }, { $set: formattedLocationData })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Error updating location data:', error);
                    reject(error);
                });
        });
    },
    getAllFeedbacks: () => {
        return new Promise(async (resolve, reject) => {
            let feedbacks = await db.get().collection(collection.FEEDBACK).find().toArray();
            resolve(feedbacks)
        })
    },
    getAllSuggestions: () => {
        return new Promise(async (resolve, reject) => {
            let suggestions = await db.get().collection(collection.SUGGESTION).find().toArray();
            resolve(suggestions)
        })
    },
    doLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            console.log(adminData.Email);
            let loginStatus = false
            let response = {}
            let admin = {
                Email: "admin@gmail.com",
                Password: "admin123"
            }
            // await db.get().collection(collections.ADMIN).findOne({ Email: adminData.Email })

            if (admin)
                if (admin.Password == adminData.Password) {
                    console.log("Success");
                    response.admin = admin
                    response.status = true
                    resolve(response)
                } else {
                    console.log("failed");
                    resolve({ status: false })
                } else {
                console.log("Admin Not Found");
                resolve({ status: false })
            }
        })
    },
}
