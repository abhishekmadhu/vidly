module.exports = function(err, req, res, next){
    // Log this issue for future 
    res.status(500).send('Something failed!');
}