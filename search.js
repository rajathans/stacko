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
