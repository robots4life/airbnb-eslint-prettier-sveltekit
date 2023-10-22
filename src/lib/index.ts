// place files you want to import through the `$lib` alias in this folder.

// this should be marked by eslint
function something() {
	return 42;
}
something();

// this should be marked by eslint airbnb style guide
// eslint thinks this is fine
// but we want arrow functions and implicit returns
// https://youtu.be/y068wjb4XtI?feature=shared&t=5360
// [1, 2, 3].reduce((sum, value) => {
// 	return value + sum}
// );

// the result should be this and the above should be auto fixed to this
// for that we are going to add the airbnb rules
//
// https://youtu.be/y068wjb4XtI?feature=shared&t=7073
// https://eslint.org/docs/latest/rules/arrow-body-style#never
// if you like to have implicit return
// 'arrow-body-style': ['error', 'as-needed'],
[1, 2, 3].reduce((sum, value) => value + sum);

export const time = new Date().getTime();
