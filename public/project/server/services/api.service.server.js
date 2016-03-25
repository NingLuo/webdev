module.exports = function(app, factual) {

    app.get('/api/searchDoctor/specialty/:speicalty/location/:location', searchDoctorBySpecialtyAndLocation)

    //factual.get(
    //    '/t/healthcare-providers-us',
    //    {filters:{"$and":[{"locality":"boston"},{"languages":"English"},{"category_labels":
    //    {"$includes_any":["HEALTHCARE","PHYSICIANS"]}}]}},
    //    function (error, res) {
    //    console.log(res.data);
    //})

    function searchDoctorBySpecialtyAndLocation(req, res) {
        var specialty = req.params.specialty;
        var location = req.params.location;
        console.log(specialty + " " + location + " from server");
    }
}
