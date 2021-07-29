$('#titular-form-body').load('partial/inscricao-form/titular-form.html')
//$('#titular-profissao-form-body').load('partial/inscricao-form/profissao-form.html')
//$('#conjuge-form-body').load('partial/inscricao-form/conjuge-form.html')
//$('#conjuge-profissao-form-body').load('partial/inscricao-form/profissao-conjuge-form.html')
//$('#moradia-form-body').load('partial/inscricao-form/moradia-form.html')

$('#alert').hide();

$('#close-alert').on('click', function(){
    $('#alert').hide();
})

$.ajax({
    type: 'GET',
    url: 'admin/api/modalidade/obterModalidades',
    error: function(error) {
        console.log(error);
    },
    statusCode: {
        200: function(response) {
            response.forEach(element => {
                $('#modalidade-options').append('<option value=' + element.idmodalidade + '>' + element.modalidade + '</option>')
            });
        },
        401: function(response) {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(`Acesso negado!`);
        },
        400: function(response) {
            $('.modal-footer').attr('class', `modal-footer bg-danger text-light`);
            $('alert').text(`Operação não permitida!`);
        },
        204: function(response) {
            $('#alert').append("<div class='alert alert-danger' role='alert'>Você ainda não possui cadastro</div>")
        }
    }
});
