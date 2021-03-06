var express = require('express');
var router = express.Router();
var games_dal = require('../dal/games_dal');


router.get('/all', function(req, res, next){
    games_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('games/games_view_all', {games: result, was_successful: req.query.was_successful});
        }
    })
});

router.get('/add', function(req, res) {
    games_dal.getAll(function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.render('games/games_add', {games_result: result[0]});
        }
    });
});

router.get('/insert', function(req, res) {
    games_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/games/all');
        }
    });
});

router.get('/edit', function(req, res){
    games_dal.getinfo(req.query.games_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('games/GamesUpdate', {games: result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    games_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/games/all');
        }
    });
});

router.get('/delete', function(req, res) {
    games_dal.delete(req.query.games_id, function(err, games_id) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/games/all?games_id=' + games_id + '&was_successful=1');
        }
    });
});

module.exports = router;