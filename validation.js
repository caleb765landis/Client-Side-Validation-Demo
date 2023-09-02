/**************************************
 TITLE: validation.js
 AUTHOR: Caleb Landis (CL)
 CREATE DATE: 4/27/2022
 PURPOSE: Final Release for CSCI N341 Final Project. Provides jQuery validation for contact form on index.html.
 LAST MODIFIED ON: 4/29/2022
 LAST MODIFIED BY: Caleb Landis (CL)
 Modification History:
 27 Apr 2022: Original Build (CL)
 29 Apr 2022: Final Release (CL)
 ***************************************/

$(document).ready(function(){
 // used in Home section to scroll to About section
 $("#headerButton").button().click(function() {
   document.getElementById("about").scrollIntoView();
 });

 $( "#accordion" ).accordion({heightStyle: "content"}); // used in Skills section

 $( "#tabs" ).tabs(); // used in Projects section

 // form elements
 var availableTags = [
   "C",
   "CSS",
   "C#",
   "C++",
   "GO",
   "Haskell",
   "HTML",
   "Java",
   "JavaScript",
   "Lisp",
   "Perl",
   "PHP",
   "Python",
   "Ruby",
   "Scala",
   "Scheme",
   "SQL",
   "Swift"
 ]; // available tags for primary programming language
 $("#primaryLanguage").autocomplete({source: availableTags}); // primary programming language uses availableTags

 $("#skillsChecks").buttonset(); // makes skills checkboxes a buttonset
 $(".checkbox").checkboxradio(); // skills checkboxes

 $("#newsletterRadios").buttonset(); // newsletter radios

 $( "#datepicker" ).datepicker({
 	inline: true,
  minDate: 0
 }); // interview date picker

 $( "#slider" ).slider({
 	range: true,
 	values: [ 17, 37 ],
  slide: function(event, ui) {
    $("#amount").html("$" + ui.values[0] + " - $" + ui.values[1]);
  }
 }); // proposed pay range slider
 $("#amount").html("$" + $("#slider").slider("values", 0) + " - $" + $("#slider").slider("values", 1)); // reflects pay range slider values


 $("input[type='reset']").button().click(function() {
   $("#output").html("");
 }); // reset button; removes output section

 $("input[type='submit']").button(); // submit button
 // end form elements

 $("#backToTop").button({
 	icon: "ui-icon ui-icon-caret-1-n",
 	showLabel: false
 }).click(function() {
   window.scrollTo(0, 0);
 }); // takes users back to top of page; to home section

 // Validation plugin - Define form functionality
 $.validator.setDefaults({
   // removes the need for submit button to return false on click
   submitHandler: function() {
     // assign variables for all different types of elements on form
     var strFirstName = new String($("#firstName").val());                        // First Name
     var strLastName = new String($("#lastName").val());                          // Last Name
     var strPhone = new String($("#phone").val());                                // Phone Number
     var strEmail = new String($("#email").val());                                // Email Address
     var strPassword = new String($("#password").val());                          // Password
     var strLanguage = new String($("#primaryLanguage").val());                   // Primary Programming Language
     var strSkills = "";                                                          // Skills Check Boxes
     var strMessage = new String($("#message").val());                            // Message
     var strNewsletter = new String($("input[name='newsletter']:checked").val()); // Newsletter Radios
     var strDatePicker = new String($("#datepicker").val());                      // Interview Date
     var strSliderAmount = new String("$" + $("#slider").slider("values", 0) + " - $" + $("#slider").slider("values", 1));  // Pay Range; Uses slider's "values" instead of .val()

     $("input[name='skill']:checked").each(function() { // List checked skills
       strSkills += $(this).val() + " ";
     });

     // append user input to output section
     $("#output").append("<br><h1>Output:</h1><br>")
                 .append("<h3>First Name: " + strFirstName + "</h3><br>")       // First Name
                 .append("<h3>Last Name: " + strLastName + "</h3><br>")         // Last Name
                 .append("<h3>Phone: " + strPhone + "</h3><br>")                // Phone Number
                 .append("<h3>Email: " + strEmail + "</h3><br>")                // Email
                 .append("<h3>Password: " + strPassword + "</h3><br>")          // Password
                 .append("<h3>Primary Language: " + strLanguage + "</h3><br>")  // Primary Programming Language
                 .append("<h3>Skills: " + strSkills + "</h3><br>")              // Skills Check Boxes
                 .append("<h3>Message: " + strMessage + "</h3><br>")            // Message
                 .append("<h3>Newsletter: " + strNewsletter + "</h3><br>")      // Newsletter Radios
                 .append("<h3>Interview Date: " + strDatePicker + "</h3><br>")  // Interview Date
                 .append("<h3>Pay Range: " + strSliderAmount + "</h3><br>");    // Pay Range
  }, // end submitHandler

  // insert errors after element
  errorPlacement: function(error, element) {
    // if element's id is "firstName" insert error after last name's input
    if (element.attr("id") == "firstName") {
      error.insertAfter($("#lastName"));
    // otherwise insert after element
    } else {
      error.insertAfter(element);
    } // end if
  } // end errorPlacement
 }); // end validator.defaults

 // Use custom rules and error messages when validating
 $("#form").validate({
   // Rule to NOT ignore hidden fields
   ignore: [],

   // Validation rules
   rules: {

     // <input id="firstName" name="first">
     first: {
       required: true,
       maxlength: 35
     },

     // <input id="lastName" name="last">
     last: {
       required: true,
       maxlength: 35
     },

     // <input id="phone" name="phone">
     phone: {
       required: true,
       maxlength: 16,
       phoneUS: true // was "digits: true"; changed to "phoneUS: true" to include parentheses and hyphens
                     // technically still checks for numeric values
     },

     // <input id="email" name="mail">
     mail: {
       required: true,
       email: true
     },

     // <input id="password" name="pass">
     pass: {
       required: true,
       minlength: 5,
       maxlength: 35
     },

     // <input id="primaryLanguage" name="primaryLanguage">
     primaryLanguage: {
       required: true
     },

     // <input id="message" name="message">
     message: {
       required: true
     }
   }, // end rules

   // These messages are displayed when user input doesn't match the rules
   messages: {

     // id="firstName"
     first: {
       required: (function() {
         // if first and last name inputs are empty, ask for full name
         if (($("#firstName").val() == "") && ($("#lastName").val() == "")) {
           return "What's your name? ";
         // otherwise last name has been entered and first has not, ask for first name only
         } else {
           return "I'd like to be on a first name basis with you. ";
         } // end if
       }), // end required function
       maxlength: $.validator.format("Must not have more than {0} characters. ")
     }, // end first

     // id="lastName"
     last: {
       required: (function() {
         // if first and last name inputs are empty, do nothing because it's been handled by firstName
         if (($("#firstName").val() == "") && ($("#lastName").val() == "")) {
           return "";
         // otherwise first name has been entered and last has not, ask for last name only
         } else {
           return "Your last name is important for my records. ";
         } // end if
       }), // end required function
       maxlength: $.validator.format("Must not have more than {0} characters. "),
     }, // end last

     // id="phone"
     phone: {
       required: "Please enter a phone number.",
       phoneUS: "Please enter digits only.",
       maxlength: "Length must be less than {0}."
     },

     // id="email"
     mail: {
       required: "May I have your email so I can reply to you?"
     },

     // id="password"
     pass: {
       required: "Please enter a password longer than 5 characters.",
       minlength: $.validator.format("Password must be at least {0} characters."),
       maxlength: $.validator.format("Password must not be more than {0} characters.")
     },

     // id="primaryLanguage"
     primaryLanguage: {
       required: "What language do you code in?"
     },

     // id="message"
     message: {
       required: "Leave me a message!"
     }
   } // end validation messages
 });

 // End Validation plugin

}); // end of $(document).ready()


 /* jQuery UI
    kept just in case I'll need anything later

 $( "#accordion" ).accordion();

 var availableTags = [
 	"ActionScript",
 	"AppleScript",
 	"Asp",
 	"BASIC",
 	"C",
 	"C++",
 	"Clojure",
 	"COBOL",
 	"ColdFusion",
 	"Erlang",
 	"Fortran",
 	"Groovy",
 	"Haskell",
 	"Java",
 	"JavaScript",
 	"Lisp",
 	"Perl",
 	"PHP",
 	"Python",
 	"Ruby",
 	"Scala",
 	"Scheme"
];
 $( "#autocomplete" ).autocomplete({
 	source: availableTags
});

 $( "#button" ).button();
 $( "#button-icon" ).button({
 	icon: "ui-icon-gear",
 	showLabel: false
 });

 $( "#radioset" ).buttonset();

 $( "#controlgroup" ).controlgroup();

 //$( "#tabs" ).tabs();

 $( "#dialog" ).dialog({
 	autoOpen: false,
 	width: 400,
 	buttons: [
 		{
 			text: "Ok",
 			click: function() {
 				$( this ).dialog( "close" );
 			}
 		},
 		{
 			text: "Cancel",
 			click: function() {
 				$( this ).dialog( "close" );
 			}
 		}
 	]
 });

 // Link to open the dialog
 $( "#dialog-link" ).click(function( event ) {
 	$( "#dialog" ).dialog( "open" );
 	event.preventDefault();
 });

 /*
 $( "#datepicker" ).datepicker({
 	inline: true
 });

 $( "#slider" ).slider({
 	range: true,
 	values: [ 17, 67 ]
 });


 $( "#progressbar" ).progressbar({
 	value: 20
 });

 $( "#spinner" ).spinner();

 $( "#menu" ).menu();

 $( "#tooltip" ).tooltip();

 $( "#selectmenu" ).selectmenu();

 // Hover states on the static widgets
 $( "#dialog-link, #icons li" ).hover(
 	function() {
 		$( this ).addClass( "ui-state-hover" );
 	},
 	function() {
 		$( this ).removeClass( "ui-state-hover" );
 	}
 );
 // End of jQuery UI */
