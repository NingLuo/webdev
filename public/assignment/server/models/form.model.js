var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        findFormByTitle: findFormByTitle
    };
    return api;

    function findFormByTitle(title) {
        for(var i in mock) {
            if(mock[i].title == title) {
                return mock[i];
            }
        }
        return null;
    }
}