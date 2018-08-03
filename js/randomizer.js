"use strict";
var randomizer = /** @class */ (function () {
    function randomizer() {
        this._listOfPeople = [];
        this._bagOfPeople = [];
    }
    Object.defineProperty(randomizer.prototype, "listOfPeople", {
        get: function () {
            return this._listOfPeople;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description add the person to the rnadomizer (as long as they do not allready exist)
     * @param name name of the person to add
     * @returns true if added, false if not
     */
    randomizer.prototype.addPerson = function (name) {
        // make sure the name does not allready exist.
        // if it does return false to indicate the name
        // was not added.
        if (this.doesNameExist(name))
            return false;
        // create a new instance of personData
        // and set the name sent in.
        var aPerson = new personData();
        aPerson.name = name;
        // add the new person to the array
        this._listOfPeople.push(aPerson);
        // return true to indicate the name was added
        return true;
    };
    /**
     * @description removes ther person from the randomizer
     * @param name the name of the person to look for and remove. returns true if removed, otherwise false
     * @returns returns true if removed, otherwise false
     */
    randomizer.prototype.removePerson = function (name) {
        // convert name to lower case so we can do a lower case comparision
        var nameAsLowerCase = name.toLowerCase();
        // loop through each person in the array to see if we can find a match
        // with the name of the person we are looking for.
        for (var i = 0; i < this._listOfPeople.length; i++) {
            var nameToCompare = this._listOfPeople[i].name.toLowerCase();
            if (nameAsLowerCase == nameToCompare) {
                // we have found a match so remove the found person
                // from the array
                this._listOfPeople.splice(i, 1);
                // return true to indicate the person has been removed
                return true;
            }
        }
        // return false to indicate the person was not found and so was not removed.
        return false;
    };
    /**
     * @description gets the next random person to show
     */
    randomizer.prototype.getNextRandomPerson = function () {
        var aPerson;
        var randomNumber;
        // make sure there is a name to pick, if not, copy all the names
        // from this._listOfPeople
        if (this._bagOfPeople.length == 0)
            this._bagOfPeople = this._listOfPeople.slice();
        // if there is only one left in the bag then randomNumber must be zero
        if (this._bagOfPeople.length == 1)
            randomNumber = 0;
        else {
            // get a number between zero and total number of peopel in _bagOfPeople
            randomNumber = this.getRandomNumber(0, this._bagOfPeople.length - 1);
        }
        // use the randoNumber to get the person
        aPerson = this._bagOfPeople[randomNumber];
        // incorment the numberOfTimesPicked by one because this person was picked
        aPerson.numberOfTimesPicked++;
        // remove the person from the bagOfPeople so they can't be picked again
        // until the bag becomes empty
        this._bagOfPeople.splice(randomNumber, 1);
        // return the picked person
        return aPerson;
    };
    /**
     * @description Keeps persons names but resets picking of names back to begining
     */
    randomizer.prototype.reset = function () {
        for (var _i = 0, _a = this._listOfPeople; _i < _a.length; _i++) {
            var aPerson = _a[_i];
            aPerson.reset();
        }
    };
    /**
     * @description Checks if the name allready exists in the randomizer
     * @param name name of the person to check if they exist
     * @returns returns true if found, otherwise false
     */
    randomizer.prototype.doesNameExist = function (name) {
        // convert name to lower case so we can do a lower case comparision
        var nameAsLowerCase = name.toLowerCase();
        // loop through each person in the array to see if we can
        // find a match with the name of the person we are looking for
        for (var _i = 0, _a = this._listOfPeople; _i < _a.length; _i++) {
            var aPerson = _a[_i];
            if (nameAsLowerCase == aPerson.name.toLowerCase())
                return true;
        }
        return false;
    };
    randomizer.prototype.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return randomizer;
}());
var personData = /** @class */ (function () {
    function personData() {
        this._name = "";
        this._numberOfTimesPicked = 0;
    }
    Object.defineProperty(personData.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(personData.prototype, "numberOfTimesPicked", {
        get: function () {
            return this._numberOfTimesPicked;
        },
        set: function (numTimesPicked) {
            this._numberOfTimesPicked = numTimesPicked;
        },
        enumerable: true,
        configurable: true
    });
    personData.prototype.reset = function () {
        this.numberOfTimesPicked = 0;
    };
    return personData;
}());
