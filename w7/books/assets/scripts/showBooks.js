function buildList() {
    $.get('books', function (data) {
        let parent = $('#blist');
        let bkObj = JSON.parse(data);
        let bkArray = bkObj.longlist;
        for(let i = 0; i < bkArray.length; i++) {
            let tmp = $('<li>').text(bkArray[i].title + ' by ' + 
                                     bkArray[i].author);
                parent.append(tmp);
        }
    });
}


$(document).ready(function() {

	/* Add an event listener to the "add" form to execute when the 
	 * form is submitted.
	 */
    $("#add").submit(function (e) {
        e.preventDefault();
        console.log($('form').serialize())
		// Send form data to server (could have used $.ajax here)
        $.post('/addbook', $('form').serialize());
        location.reload(true);
    });

    $("#remove").submit(function (e) {
        e.preventDefault();
        let num = $('#number').val();
        $.ajax({
            // The book id is part of the resource url
            url: '/remove/' + num,
            type: 'DELETE',
            success: function result() {
                location.reload(true);
            }
        });

    });
    
	buildList();
    
    
});
