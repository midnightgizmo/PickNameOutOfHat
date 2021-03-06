"use strict";
/// <reference path="randomizer.ts"/>
var Randomizer;
$(function () {
    // hide step 2 from the user until they click the start button.
    $('#randomizer-container').hide();
    var UI_cmdStart = $('#setup-container > header > button');
    Randomizer = new randomizer();
    var UI_list_of_name_container = jQuery('#list-of-name-container');
    // load any previose saved data into the randomizer.
    // This will look in the browsers local storage for any
    // saved named the user may have previousely added.
    loadLocalStorageData(Randomizer);
    // when the user clicks the UI Start Button
    UI_cmdStart.click(function () {
        $('#setup-container').hide();
        $('#randomizer-container').show();
        // get a name to display to the user.
        var aPerson = Randomizer.getNextRandomPerson();
        AddNextNameToUI(aPerson.name);
    });
    // when the user clicks the Add button to add a name to the list
    $('#add-new-name-container > button').click(function () {
        var container = $(this).parent();
        var txtInput = $('> input', container);
        var name = txtInput.val();
        AddPerson(name);
        // clear the textbox
        txtInput.val('');
    });
    // when the user clicks the delete button on one of the names
    //
    // because we are adding the delete buttons dynamicaly,
    // we have to use the 'on' method instead of the 'click' method
    $('body').on('click', '.name-container > button', function () {
        var container = $(this).parent();
        var name = $('> label', container).text();
        // check to see if the name we want to remove exists in the randomizer class
        if (Randomizer.removePerson(name)) {
            UI_RemoveName(container); // remove the row from the web browser
            // resave the data to local storage because a name was removed.
            saveToLocalStorageData(Randomizer);
        }
        // check to see if we should have the Start button displayed
        if (UI_list_of_name_container.children().length == 0)
            UI_cmdStart.css('display', 'none'); // hide the start button
    });
    function UI_RemoveName(JqueryElement) {
        JqueryElement.remove();
    }
    // add the name to the randomizer and UI
    function AddPerson(name) {
        if (name.length > 0) {
            // add name to randamizer
            if (Randomizer.addPerson(name)) {
                // create the html to add the name to
                UI_AddPerson(name);
                // resave the data to local storage because a name was added.
                saveToLocalStorageData(Randomizer);
            }
        }
    }
    function UI_AddPerson(name) {
        var html = "\n        <div class=\"name-container\">\n            <label>" + name + "</label>\n            <button>delete</button>\n        </div>    \n        ";
        UI_list_of_name_container.append(html);
        UI_cmdStart.css('display', 'block');
    }
    function loadLocalStorageData(theRandomizer) {
        var jsonString;
        try {
            // localStorage will not work on MS Edge and calling getItem will produce an error.
            jsonString = localStorage.getItem('personData');
        }
        catch (e) {
            jsonString = "";
        }
        var jsonData;
        if (jsonString != null && jsonString.length > 0) {
            jsonData = JSON.parse(jsonString);
            for (var i = 0; i < jsonData.length; i++) {
                AddPerson(jsonData[i]);
            }
        }
    }
    function saveToLocalStorageData(theRandomizer) {
        // data to be stored in the local storage (will need to be converted to a JSON String)
        var dataToSave = []; //{[index:string] : T}= {};
        // go through each person to create an array of people to save
        for (var i = 0; i < theRandomizer.listOfPeople.length; i++) {
            var PersonData = theRandomizer.listOfPeople[i];
            dataToSave[i] = PersonData.name;
        }
        // save the data to the local storage under the name 'personData'
        try {
            localStorage.setItem('personData', JSON.stringify(dataToSave));
        }
        catch (e) {
        }
    }
    ///////////////////////////////////////////
    //////////////////////////////////////////
    // Step 2 stuff 
    var lblName = $('#lblName');
    var cmdNext = $('#cmdNext');
    var cmdFinish = $('#cmdFinish');
    // when the user clicks the next button to ask for another persons name to be displayed
    cmdNext.click(function () {
        var aPerson = Randomizer.getNextRandomPerson();
        AddNextNameToUI(aPerson.name);
    });
    // when the user clicks the finish button
    cmdFinish.click(function () {
        $('#randomizer-container').hide();
        $('#setup-container').show();
        Randomizer.reset();
    });
    function AddNextNameToUI(name) {
        lblName.text(name);
    }
});
