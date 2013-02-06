/**

 * Name: Houston Bennett
 * Date: 1/9/13
 * Term: 0113
 * Project 2 Javascript

 */



window.addEventListener("DOMContentLoaded",function(){

/** All JS must be in here. */


//dropdown defaults

    var charSizeOpt = ["Select a size","Tiny","Small","Medium","Large","Giant"],genderVal,
        charRaceOpt = ["Select a race","Dwarf","Elf",'Half-Orc',"Human"]
        ;
    createDropdown();

//Click events

    var viewLink = getElement("ViewAll");
    viewLink.addEventListener("click", getData);
    var submitBtn = getElement("SubmitBtn");
    submitBtn.addEventListener("click",validate);
    var deleteLink = getElement("DeleteAll");
    deleteLink.addEventListener("click", deleteData);





    //getElementbyID function
    function getElement(elementID){

    var x = document.getElementById(elementID);
    return x;
}

    //Display dynamic images!
    function displayPic(){

        alert('You clicked!');
        return


    }

    //Bring forth the dropdown box and populate it dynamically!
    function createDropdown(){

        var formTag = document.getElementsByTagName("form"),
            dropdownSize = getElement("dropdownSize"),
            dropdownRace = getElement('dropdownRace'),
            newDropdownRace = document.createElement("select"),
            newDropdownSize = document.createElement("select");

        newDropdownRace.setAttribute("id", "charRace");

        for( var i = 0, x = charRaceOpt.length; i < x; i++ ){
            var Option = document.createElement("option");
            var OptTxt = charRaceOpt[i];
            Option.setAttribute("value",OptTxt);
            Option.innerHTML = OptTxt;
            newDropdownRace.appendChild(Option);
        };
            dropdownRace.appendChild(newDropdownRace)

            newDropdownSize.setAttribute("id", "charSize");

        for( var i = 0, x = charSizeOpt.length; i < x; i++ ){
             Option = document.createElement("option");
             OptTxt = charSizeOpt[i];
            Option.setAttribute("value",OptTxt);
            Option.innerHTML = OptTxt;
            newDropdownSize.appendChild(Option);
        };

        dropdownSize.appendChild(newDropdownSize);


    }

    var RaceSelect = getElement('dropdownRace');
    RaceSelect.addEventListener('click',displayPic);


//Find radio button value
    function getRadio(){
        var rdoButtons = document.forms[0].sex;
        for (var i=0; i < rdoButtons.length; i++){
            if(rdoButtons[i].checked){
                genderVal = rdoButtons[i].value;
            }


        }

    }

    function toggleController(n){
        switch(n){
            case "on":
                getElement('charForm').style.display = 'none';
                getElement('DeleteAll').style.display = 'inline';
                getElement('ViewAll').style.display = 'none';
                getElement('NewChar').style.display = 'inline';
                break;
            case 'off':
                getElement('charForm').style.display = 'block';
                getElement('DeleteAll').style.display = 'inline';
                getElement('ViewAll').style.display = 'inline';
                getElement('NewChar').style.display = 'none';
                getElement('elements').style.display = 'none';
                break;

            default:
                return false;

        }
    }

    function getData(){

        if(localStorage.length===0){
            alert("Since there was no data available, we are showing you some default data instead.")

            loadDefault();
        }
        else{
            toggleController('on');

            //Fetch local data and display.
            var createDiv = document.createElement("div");
            createDiv.setAttribute("id","elements");
            var makeList = document.createElement("ul");
            createDiv.appendChild(makeList);
            document.body.appendChild(createDiv);
            getElement('elements').style.display = 'block';

            //This part loops through, dynamically creating the lists from stored data.
            for(var num = 0, len = localStorage.length; num<len;num++){

                var ListItem = document.createElement("li");
                var linkList = document.createElement('li');
                makeList.appendChild(ListItem);

                var key = localStorage.key(num);
                var value =localStorage.getItem(key);
                //Objectify the string from local storage.
                var thing = JSON.parse(value);

                //creating another list
                var subList = document.createElement('ul');

                ListItem.appendChild(subList);

               getImage(subList,thing.Race[1]);

                for(var i in thing){
                    var makeSub = document.createElement('li');
                    subList.appendChild(makeSub);
                    var subLabel = thing[i][0]+" "+thing[i][1];
                    makeSub.innerHTML = subLabel;
                    subList.appendChild(linkList);


                }
                var lineBreak = document.createElement('br');
                subList.appendChild(lineBreak);
                createLinks(localStorage.key(num), linkList); //Calls function that creates edit&delete links for the items in local storage.


            }
        }




    }

//Retrieves correct image for race selection.
   function getImage(subLi,raceSelection){

        var imgLi = document.createElement('li');
        subLi.appendChild(imgLi);

        var imgTag = document.createElement('img');
        var Src = imgTag.setAttribute('src', 'images/'+ raceSelection + '.png')

        imgLi.appendChild(imgTag);
    }

//Loads default data in case there is none stored.
    function loadDefault(){

        //This will load the JSON object into Local Storage

        for(var x in json){
            var userID = Math.floor(Math.random()*100001);
            localStorage.setItem(userID,JSON.stringify(json[x]));

        }
        getData();
    }

//Creates edit&delete links for the items in local storage.
    function createLinks(key, linkList){

     //edit item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;

        var editLinkText = "Make changes?"

        editLink.addEventListener("click",makeChanges);
        editLink.innerHTML = editLinkText;
        linkList.appendChild(editLink);

     //delete item link
        var deleteLink = document.createElement('a');

        deleteLink.href = '#';
        deleteLink.key = key;

        var deleteLinkText = 'Trash this?';

        deleteLink.addEventListener('click', deleteChar);
        deleteLink.innerHTML = deleteLinkText;
        linkList.appendChild(deleteLink);

    }

    function makeChanges(){

        //Acquire data from item in local storage
        var data = localStorage.getItem(this.key);
        var fieldValues = JSON.parse(data);
        //Displays input form
        toggleController('off');

        //fill input boxes with data from local storage
        getElement('charCreateDate').value = fieldValues.Date[1];
        getElement('charName').value = fieldValues.Name[1];
        getElement('charRace').value = fieldValues.Race[1];
        getElement('charAge').value = fieldValues.Age[1];
        getElement('charSize').value = fieldValues.Size[1];

        var radio  = document.forms[0].sex;

        for(var i =0; i <radio.length;i++){
            if(radio[i].value == "Male" && fieldValues.Gender[1] == "Male"){

                radio[i].setAttribute('checked','checked');
            }else if (radio[i].value == 'Female' && fieldValues.Gender[1] == "Female"){
                radio[i].setAttribute('checked', 'checked');

            }


        }
        getElement('charStr').value = fieldValues.Str[1];
        getElement('charCon').value = fieldValues.Str[1];
        getElement('charDex').value = fieldValues.Dex[1];
        getElement('charInt').value = fieldValues.Int[1];
        getElement('charWis').value = fieldValues.Wis[1];
        getElement('charCha').value = fieldValues.Cha[1];
        getElement('charBio').value = fieldValues.Bio[1];

        //Remove original event listener
        submitBtn.removeEventListener('click', saveData);

        submitBtn.value = "Save Changes";

        var editButton = getElement('SubmitBtn');

        editButton.addEventListener('click',validate);
        editButton.key = this.key;




    }

    function saveData(key){
        if(!key){
            var userID = Math.floor(Math.random()*100001);

        }else{
            userID = key;
        }

        //Get radio button value
        getRadio();

        //Get all form field values & store them in an object.
        //Object properties contain array with form label and input values.

        var formFieldValues = {};

            formFieldValues.Date = ["Creation Date: ", getElement("charCreateDate").value];
            formFieldValues.Name = ["Name: ",getElement('charName').value];
            formFieldValues.Race = ["Race: ",getElement('charRace').value];
            formFieldValues.Size = ["Size: ",getElement("charSize").value];
            formFieldValues.Age = ["Age: ",getElement('charAge').value];
            formFieldValues.Gender = ["Gender: ", genderVal];
            formFieldValues.Str = ["Strength: ",getElement("charStr").value];
            formFieldValues.Con = ["Constitution: ",getElement("charCon").value];
            formFieldValues.Dex = ["Dexterity: ", getElement("charDex").value];
            formFieldValues.Int = ["Intelligence: ",getElement("charInt").value];
            formFieldValues.Wis = ["Wisdom: ",getElement("charWis").value];
            formFieldValues.Cha = ["Charisma: ",getElement('charCha').value];
            formFieldValues.Bio = ["Biography: ",getElement('charBio').value];

        //Save data to local storage: Use Stringify to convert object to string

        localStorage.setItem(userID,JSON.stringify(formFieldValues));

        alert("This is your character's unique ID. Save this for later! "+ userID)
        alert("Your character has been archived!");
        window.location.reload();
    }

    function deleteChar(){

        var youSure = confirm("You are about to delete this character! Are you sure?!")
        if(youSure){
            localStorage.removeItem(this.key);
            alert("The character #"+ this.key + ' has been deleted!')
            window.location.reload();
        }else{
            alert("Your character was NOT deleted!")
        }
    }

    function deleteData(){
        if(localStorage.length===0){
            alert("There is nothing to delete!")
        }
        else{
            localStorage.clear();
            alert("All characters have been deleted!");
            window.location.reload();
        }

    }

    function validate(){

        var name = getElement('charName');
        var race = getElement('charRace');
        var stats = [
         str = getElement('charStr'),
         con = getElement('charCon'),
         dex = getElement('charDex'),
         Int = getElement('charInt'),
         wis = getElement('charWis'),
         cha = getElement('charCha')
        ];

//clear the screen
        var errorMsgArray = [];
        name.style.border = "0px";
        race.style.border = "0px";
        for(x in stats){
                stats[x].style.border = '0px';
            }

// validate name
        if(name.value === ''){
            var badName = "Your character needs a name!";
            name.style.border = "1px dotted red";
            errorMsgArray.push(badName);
        }
// validate race
        if(race.value === ''){
            var badName = "Your character needs a race!";
            race.style.border = "1px dotted red";
            errorMsgArray.push(badName);
        }
// validate stats
// later: change validation to ensure only numbers for stats.
        for(x in stats){
            if (stats[x].value === ''){
                var badStat = 'Please ensure that all stats have a value!'
                stats[x].style.border = '1px dotted red';
                errorMsgArray.push(badStat);
            }

        }

//display errors

        if(errorMsgArray.length >= 1){
            for(var i=0, j = errorMsgArray.length; i < j; i++){

                alert(errorMsgArray[i]);

             }
        }else{
            saveData(this.key);


        }



    }














});




