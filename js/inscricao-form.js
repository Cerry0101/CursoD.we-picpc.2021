$('#etapa1-form-body').load('partial/inscricao-form/etapa1-form.html')
$('#etapa2-form-body').load('partial/inscricao-form/etapa2-form.html')
$('#etapa3-form-body').load('partial/inscricao-form/etapa3-form.html')

$('#alert').hide();

$('#close-alert').on('click', function(){
    $('#alert').hide();
})

$.ajax({
    type: 'GET',
    url: '#',
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
