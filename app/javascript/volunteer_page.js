import '../stylesheets/volunteer_page.css';
import './common.js';
//modal function
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//paypal input placeholder
$( "#myMessage" ).attr('placeholder',$('.donate-now input[type="radio"]:checked').val());
$( ".donate-now input[type=\"radio\"]" ).click(function() {
    $( "#myMessage" ).attr('placeholder',$(this).val());
    $( "#myMessage" ).attr('value',$(this).val());
});
