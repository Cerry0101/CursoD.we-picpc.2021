$('#side-helper').load('partial/duvidas-tab/duvidas.html')
$('#1-continue').hide()
$('#2-continue').hide()
$('#3-continue').hide()

$('#1-open').click(function() {
    $('#1-continue').fadeToggle(500)
    $('#1-open').hide()
})

$('#1-close').click(function() {
    $('#1-continue').fadeToggle(500)
    $('#1-open').show()
})

$('#2-open').click(function() {
    $('#2-continue').fadeToggle(500)
    $('#2-open').hide()
})

$('#2-close').click(function() {
    $('#2-continue').fadeToggle(500)
    $('#2-open').show()
})

$('#3-open').click(function() {
    $('#3-continue').fadeToggle(500)
    $('#3-open').hide()
})

$('#3-close').click(function() {
    $('#3-continue').fadeToggle(500)
    $('#3-open').show()
})

var loadform = function() {
    $('.modal-content').load('partial/inscricao-form.html', function(responseTxt, statusTxt, xhr) {
        if (statusTxt == 'success') $('.modal').modal('show');
    });
}

var loadduvidas = function() {
    $('.modal-content').load('partial/duvidas-tab/duvidas.html', function(responseTxt, statusTxt, xhr) {
        if (statusTxt == 'success') $('.modal').modal('show');
    });
}

$('#inscricao').on('click', function(event) {
    loadform()
})

$('#duvidas').on('click', function() {
    loadduvidas()
})

function openNav() {
    document.getElementById("side-helper").style.width = "350px";
    document.getElementById("content").style.left = "350px";
}

function closeNav() {
    document.getElementById("side-helper").style.width = "0";
    document.getElementById("content").style.left = "0";
}

$('.carousel').carousel({
    interval: 2500
})