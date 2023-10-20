// place files you want to import through the `$lib` alias in this folder.

// this should be marked by eslint
function something() {
	return 42;
}

// this should be marked by eslint airbnb style guide
// eslint thinks this is fine
// but we want arrow functions and implicit returns
[1, 2, 3].reduce(function (sum, value) {
	return value + sum;
});

// the result should be this and the above should be auto fixed to this
// for that we are going to add the airbnb rules
[1, 2, 3].reduce((sum, value) => value + sum);
