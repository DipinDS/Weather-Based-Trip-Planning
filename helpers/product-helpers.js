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
                "Clear": [locationData.ClearActivity1, locationData.ClearActivity2, locationData.ClearActivity3],
                "Rainy": [locationData.RainyActivity1, locationData.RainyActivity2, locationData.RainyActivity3],
                "Windy": [locationData.WindyActivity1, locationData.WindyActivity2, locationData.WindyActivity3]
            },
            "google_map_links" : locationData.google_map_links,
        };
        db.get().collection(collection.LOCATIONS).insertOne(formattedLocationData)
            .then((data) => {
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
    getAllUsers : () => {
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
                    "Clear": [details.ClearActivity1, details.ClearActivity2, details.ClearActivity3],
                    "Rainy": [details.RainyActivity1, details.RainyActivity2, details.RainyActivity3],
                    "Windy": [details.WindyActivity1, details.WindyActivity2, details.WindyActivity3]
                    // Add more activities as needed
                },
                "google_map_links" : details.google_map_links,
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
                Email : "admin@gmail.com",
                Password : "admin123"
            } 
            // await db.get().collection(collections.ADMIN).findOne({ Email: adminData.Email })
    
            if (admin)
                if(admin.Password == adminData.Password) {
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
