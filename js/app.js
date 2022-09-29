/*

1-we need to make a loop for making  list items depending on how many sections we have
how to determine how many sections we have?? > we get all the sections we have with querySelectorAll then we get the length of the NodeList
we need to create inside every node the loop created a <anchor> element with the attribute of href = "section" + i (done)

2-Add functionality to distinguish the section in view , using element.classList.add/remove we turn on and off the class we want
with the addEventListener on every section and with getBoundingClientRect().top <= 0 "it means that the element is in the top of viewport"
now we want to add this to every section element (done)

*/
//selecting the sections
const sectionsNodeList = document.querySelectorAll("main section");
//my main functions
//prevent function
const preventDefault = function(event) {
    event.preventDefault();
};
/*function to check is the section is in
the viewport and putting class active on it*/
const isActiveFunction = function() {
    sectionsNodeList.forEach(function(element) {
        elementInViewport =
        element.getBoundingClientRect().top;
            elementHeight = element.getBoundingClientRect().bottom - elementInViewport;
        if (elementInViewport <= 0) {
            element.classList.add("your-active-class");
        } else if (elementInViewport > 0) {
            element.classList.remove("your-active-class");
        }
        /*this if statement to delete the class from the sections
        that is not in viewport at all*/
        if (elementInViewport <= 0 && elementInViewport < -elementHeight) {
            element.classList.remove("your-active-class");
        }
    });
};
// function to add scrolling functionality to anchor elements
const loopScrollFunction = function(element, index) {
    element.addEventListener("click", ScrollingFunction);

    function ScrollingFunction() {
        sectionsNodeList[index].scrollIntoView({
            behavior: "smooth"
        });
    };
};
// building the nav menu
for (let i = 1; i <= sectionsNodeList.length; i++) {
    //selecting the parent element of the navbar list
    const navbarList = document.querySelector("#navbar__list");
    // creating new list element  inside the ul element
    const listItem = document.createElement("li");
    // creating new anchor element inside the list element
    const anchorItem = document.createElement("a");
    // stopping the default action for the anchor element
    anchorItem.addEventListener("click", preventDefault);
    /*adding href & data-link attribute and link
    the sections with the navbar list items*/
    anchorItem.setAttribute("href", "#section" + i)
    anchorItem.setAttribute("data-link", "section" + i)
    //modifying the list element content
    anchorItem.textContent = "Section" + i;
    //putting the created element inside their narrtive elements
    navbarList.appendChild(listItem);
    listItem.appendChild(anchorItem);

}
/*adding functionality to every section in viewport with class=your-active-class
we want something to activate this loop everytime we change the viewport */
document.addEventListener("scroll", isActiveFunction);
// adding scrolling functionality to the anchor elements
//selecting the anchor elements
const links = document.querySelectorAll("[data-link]");
links.forEach(loopScrollFunction)
//hiding the fixed navbar
/* const navbar = document.querySelector("#navbar__list");
setTimeout(function(){
    document.addEventListener("scroll",function(){
        navbar.style.display = "none";
    })
}, timeout = 100); */
//buttons to collapse the sections
for(let i=1; i<=sectionsNodeList.length;i++){
    const button = document.createElement("button"); 
    button.setAttribute("id","Button"+i);
    button.setAttribute("class","SectionButton");
    button.textContent = "Collapse section " +i;
    const section = document.querySelector("#section"+i);
    section.insertAdjacentElement("beforebegin",button);
    button.addEventListener("click",function(){
    section.classList.toggle("hidden");
})
}
    