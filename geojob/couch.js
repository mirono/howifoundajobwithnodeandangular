var couch = require('node-couchdb');
couch.insert("testdb", {
    "_id" : "document_id",
    "field" : ["sample", "data", true]
}, function (err, resData) {
    if (err)
        return console.error(err);

    console.dir(resData)
});