console.log("test script")

const buttons = document.querySelectorAll("button")
const resultsUL = document.getElementById("results__ul")
const createElement = element => document.createElement(element);
const append = (parent, el) => parent.appendChild(el);


buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => handleOnClickEvent(event))
})

const handleOnClickEvent = (event) => {
    let valueButton = event.target.innerHTML
    resultsUL.innerHTML = ("")

    switch (valueButton) {
        case "Landenlijst":
            listRegion = getRegionList(randomPersonData);
            addLandenToDom(listRegion)
            break;

        case "Steenbokvrouwen":
            listSteenbokVrouwen = getArrayForAssingemt2(randomPersonData)
            addSteenBokVrouwenToDom(listSteenbokVrouwen)
            break;

        case "Ouwde Creditcards":
            listNearExpiredCC = getArrayForAssingemt3(randomPersonData)
            console.log(listNearExpiredCC)
            addSteenBokVrouwenToDom(listNearExpiredCC) // Dt moet nog aangepast worden naar wensen opdracht
            break;
    }
}
// opdracht 1
const getRegionList = (array) => ([...new Set(array.map(p => p.region))]).sort();

const addLandenToDom = (array) => {
    array.map((region) => {
        let newLi = createElement("li");
        newLi.innerHTML = `land:${region}`
        append(resultsUL, newLi)
    });
}

// opdrachrt 2 
const getArrayForAssingemt2 = (array) => (
    array
        .filter(p => p.gender === "female") //vrouwc
        .filter(p => p.age >= 30)  //30 en ouder
        .filter(p => GetSteenbokDates(p))  //steenbok
        .sort((a, b) => a.name > b.name ? 1 : -1)
)

function GetSteenbokDates(array) {
    let date1 = new Date(array.birthday.mdy);
    const date2 = new Date("1/19")//moet gelijk of lager zijn dan
    const date3 = new Date("12/22")//moet gelijk of hoger zijn dan
    if (date1.getDate() > date2.getDate() && date1.getMonth() === date3.getMonth() || date1.getDate() < date3.getDate() && date1.getMonth() === date2.getMonth()) {
        return array
    }
}

const addSteenBokVrouwenToDom = (array) => (
    array.map((p) => {
        const newP = document.createElement("p")
        const newLi = document.createElement('li')
        const newImg = document.createElement("img")
        append(newLi, newP).innerHTML = `${p.name}`
        append(newLi, newImg).src = `${p.photo}`
        append(resultsUL, newLi)
    })
)
/* opdracht 3 // 
nog te doen
data in lijst moet
- voornaam, achternaam
- telefoonnummer
- creditcardnummer
- verloopdatum
*/
// opdracht 3
const getArrayForAssingemt3 = (array) => (
    array
        .filter(p => getGrownUp(p))
        .filter(p => compareDateExpCC(p))
        .sort((a, b) => new Date(makeDateCC(a)) > (new Date(makeDateCC(b))) ? 1 : -1)
    // .map(p => p.credit_card.expiration)
)

getGrownUp = (person) => {
    let grownUpBirthDay = new Date()    // currentdate
    grownUpBirthDay.setFullYear(grownUpBirthDay.getFullYear() - 18) //  set 18 years back
    if (new Date(person.birthday.mdy) <= grownUpBirthDay) { return person } // compare
}

const compareDateExpCC = (person) => {
    let currentDate = new Date()
    let dateEndNextYear = makeDateNxtYear()
    let ExpDateWithMilAndDay = makeDateCC(person)
    if (new Date(ExpDateWithMilAndDay) <= dateEndNextYear
        && new Date(ExpDateWithMilAndDay) >= currentDate) { return ExpDateWithMilAndDay }  // get range expCC till next year
}

const makeDateCC = (person) => {
    let ExpDate = person.credit_card.expiration  //convert exp date to workable date
    let ExpDateWithMil = ExpDate.slice(0, -2) + "20" + ExpDate.slice(-2)
    let ExpDateWithMilAndDay = ExpDateWithMil.slice(0, -4) + "1/" + ExpDateWithMil.slice(-4)
    return ExpDateWithMilAndDay
}
const makeDateNxtYear = () => {
    let workingDate = new Date()        //datum eind volgend jaar
    let month = workingDate.getMonth();
    let day = workingDate.getDate();
    let dateEndNextYear = new Date(workingDate.getFullYear() + 1, month = 11, day = 31)
    return dateEndNextYear
}

// let msdeny = dateEndNextYear.getTime()
// console.log(msdeny)
// https://javascript.info/date#
// tijd omrekenen naar ms vanaf 1970 = .getTime()  of date.Parse()