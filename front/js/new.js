$(function () {
	var $books = $("#book-list");
	var $title = $("#title");
	var $author = $("#author");
	var $isbn = $("#isbn");
	var $type = $("#type");
	var bookTemplate =
		"<li class=fancy-box>" +
			"<p>Tytuł: {{title}}</p>" +
			"<p> Autor: {{author}}</p>" +
			"<button id='details' data-id='{{{id}}}'>Pokaż szczegóły</button>" +
			"<div class=hidden>" +
			"<p class> ISBN: {{isbn}}</p>" +
			"<p class'> Type: {{type}}</p>" +
			"<button data-id='{{{id}}}' class='delete-btn'>Usuń</button>"
			"</div>"
		"</li>";

	function addBook(book) {
		//		$books.append('<li> Tytuł: ' + book.title + ' Autor: ' + book.author+ '</li>');
		$books.append(Mustache.render(bookTemplate, book));
	}
	$.ajax({
		type: 'GET',
		url: "http://localhost:8282/books/",
	//	url: "http://localhost:8080/books/",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (returnedBooks) {
			$.each(returnedBooks, function (i, book) {
				addBook(book);
			})
		},
		error: function () {
			alert("Błąd przy wywołaniu książek.");
		}
	})

	$('#add-order').on('click', function () {
		var book = {
			title: $title.val(),
			author: $author.val(),
			isbn: $isbn.val(),
			type: $type.val(),
		};
		$.ajax({
			type: 'POST',
			url: "http://localhost:8282/books",
			data: JSON.stringify(book),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function () {
				addBook(book);
			}
		})
	}) 
	$books.delegate('.delete-btn', 'click', function () {
		var $li = $(this).closest('li');
		var self = this;
		$.ajax({
			type: 'DELETE', 
			url: "http://localhost:8282/books/" + $(this).attr('data-id'),  // Pomocy! Usuwa dopiero po odświeżeniu, ponieważ nie od 																	razu nadaje atrybut data-id
			success: function(){
			$li.fadeOut(800, function(){
				$(this).remove();
			})
		}
		})
	})
		$books.delegate('#details', 'click', function () {		
				var p = this.nextSibling.classList.remove("hidden");

			});s
});
