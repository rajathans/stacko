var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Preferences = require('preferences');
var Spinner = CLI.Spinner;
var stackexchange = require('stackexchange');
var _ = require('lodash');
var touch = require('touch');
var fs = require('fs');

// stackoverflow OAuth stuff
var options = {
    version: 2.2
};

var context = new stackexchange(options);

function getSearchQuery(callback) {
    var questions = [{
        name: 'query',
        type: 'input',
        message: 'enter the keywords:',
        validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'duh! please enter some words to search';
            }
        }
    }];

    inquirer.prompt(questions).then(callback);
}

clear();
console.log(
    chalk.yellow(
        figlet.textSync('stacko', {
            horizontalLayout: 'full'
        })
    )
);

console.log('\ncurrent search is restricted to '+ chalk.yellow(50) +' results');

var query = '';
getSearchQuery(function() {
    query = arguments['0'].query;
    var status = new Spinner('searching your query, please wait...');
    status.start();
    var filter = {
        key: 'l3ZxaASyd8ET)q0TEjUO)w((',
        pagesize: 50,
        // tagged: 'laravel',
        sort: 'relevance',
        // order: 'asc'
        // body: query,
        q: query
    };

    context.search.advanced(filter, function(err, results) {
        if (err) throw err;
        var final = {};
        if (results.items.length == 0) {
            console.log(chalk.red('\nnothing found'));
            process.exit();
        }
        console.log('\n');
        var result = results.items.map(function(obj) {
            console.log(chalk.bold(obj.title));

            // TODO : link url with text, open browser on click
            // console.log(chalk.blue(obj.link)); // the url
        });

        console.log('\nfound ' + chalk.yellow(results.items.length) + ' results');

        status.stop();
    });
});
