validate
========

A general JavaScript validation tool with pre-configuration, Backbone support and can be used cross client/server

## <a name='TOC'>Table of Contents</a>
  1. [How to use it](#howto)
  1. [Cross client and server](#cross) 
  1. [Contribute](#contribute)


<a name='howto'>How to use it</a>
===================================
There are four methods for you to play around with.

### 1. Config
  ```javascript
    validate.config({
      errorMessages: {
        length: 'Need the correct length here Mr! % is wrong!' // Using % sets a placeholder
      }
    });
  ```
### 2. Validate
  ```javascript
    var validation = validate({
      name: 'Christian Alfoni',
      zipCode: '3112',
      email: 'christianalfoni@gmail.com'
    }, {
      name: ['required'],
      zipCode: ['length:4', 'number'],
      email: ['email']
    });
    console.log(validation.isValid) // -> Returns true
    console.log(validation.errors) // -> Returns empty object
    
    var validation = validate({
      name: ''
    }, {
      name: ['required']
    });
    console.log(validation.isValid) // -> Returns false
    console.log(validation.errors) // -> Returns { name: ['You have to type something!'] }
  ```
### 3. Pre-configure validation
  ```javascript
    validate.extend('person', {
       name: ['required'],
       zipCode: ['length:4', 'number'],
       email: ['email']     
    });
    
    validate('person', myPersonVariable);
  ```

### 4. Backbone model
This requires that you did step 3., created a pre-configured validator.
  ```javascript
    var myModel = Backbone.Model.extend({
      defaults: {
        name: ''
      },
      validate: validate.backboneModel('person')
    });
    
    var aModel = new myModel();
    myModel.isValid(); // -> Returns false
    console.log(myModel.validationErrors) // -> Returns error object: { name: ['You have to type something!'] }
  ```
You can read more on actual use of this in an article I wrote: ???

<a name='cross'>Cross client and server</a>
================================================
If you are running a Node JS server and want to share the validators you can do that by creating a validation module
with your pre-configured validators. The module depends on this plugin. Here is en example:
  ```javascript
  define(['validate'], function (validate) {
    'use strict';
    validate.extend('message', {
        comment: ['required'],
        pointOfContact: ['required'],
        startTime: ['required', 'before:endTime'],
        endTime: ['required', 'after:startTime'],
        priority: ['required']
    });
    return validate;
  });
  ```
This validation module can now be used both on the client and the server.

<a name='contribute'>Contribute</a>
===================================
To contribute to the project you can add new validators. I did not add the possiblity to add validators in the API 
because I want them all to be available to everyone. So if you want to use this small plugin, please add your 
new validators to this GIT project.

### Adding a new validator
This is the "required" validator.
  ```javascript
    ...
    required: function (value, data) {
      return value === undefined || value === null || (typeof value === 'string' && value.length === 0) ? errorMessages.required : true;
    },
    ...
  ```
All validators get at least two arguments. The first is the value to evaluate and the second is the whole dataset
to evaluate. So f.ex.:
  ```javascript
    validate({
      name: 'Christian Alfoni',
      email: 'christianalfoni@gmail.com'
    }, {
      name: ['required'],
      email: ['email']
    });
  ```
The "required" validator method would now get "Christian Alfoni" as the value and a data-object with both "name" and "email"
property and their values. This makes it easy to cross validate one value with an other value in the dataset.

#### Advanced validators
When adding a colon (:) to the validator that will become an argument for you to handle. So lets look at the length
validator:
  ```javascript
    ...
    length: function (value, data, length) {
      var length = Number(length);
      return value.length === length ? true : errorMessages['length'].replace('%', length.toString());
    },
    ...
  ```
Here we get a length argument, which is changed to a number and then used to validate. The validation was run
like this:
  ```javascript
    validate({
      zipCode: '3112'
    }, {
      zipCode: ['length:4']
    });
  ```
By adding more colons you will get more arguments passed to your validation method.

### Adding error message to your validator
You add a default errorMessage in the errorMessages object. By using a % in the string you add a placeholder, which can
be used in your validator like this:
  ```javascript
    ...
    length: function (value, data, length) {
      var length = Number(length);
      return value.length === length ? true : errorMessages['length'].replace('%', length.toString());
    },
    ...
    errorMessages = {
      length: 'Length should be %',
    ...
  ```
You just replace the % in the string with whatever value you want.
