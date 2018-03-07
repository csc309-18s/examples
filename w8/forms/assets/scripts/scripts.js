$( document ).ready(function() {
    
    
    $("#clientButton").click(function(e)
    {
        // Prevents form from submitting right away:
        e.preventDefault(); 
        
        // Allows or keeps halting form submission process; returns true or false.
		if(validateClientSide()) {
            $.post('/give_info', $('form').serialize());
			if($('span.success').length) {
			   $('span.success').remove();	
			} 
			$('form').after("<span class='success'>Form Submitted</span>");
		}
    });
    
    
    function validateClientSide()
    {
        var isValid = true;
        
        // Remove previous error messages, if they exist.
        if ( $('label#usernameField span.error').length )
            $('label#usernameField span.error').remove();
        
        if ( $('label#passwordField span.error').length )
            $('label#passwordField span.error').remove();
        
        // Deal with each field separately.
        if ( $('input#username').val() == "")
        {
            $('input#username').after("<span class='error'>Provide a username.</span>");
            isValid = false;
        }
        
        if ( $('input#password').val() == "")
        {
            $('input#password').after("<span class='error'>Provide a password.</span>");
            isValid = false;
        }	
        if ( $('input#password').val().length != 4)
        {
            $('input#password').after("<span class='error'>Password must be 4 alphanumeric characters</span>");
            isValid = false;
        }
        
        return isValid;
    }

    
});
