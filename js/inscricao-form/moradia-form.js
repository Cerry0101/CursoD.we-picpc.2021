/* $('#situacao').val(null);
$('#tipo').val(null);
$('#condicao').val(null);
$('#caracteristica_uso').val(null);
$('#terreno').val(null);
$('#area_risco').val(null);
$('#idlaudo').val(null);
 */

$('#div-laudodf').hide();

$('#area_risco').change(function() {
    if ($('#area_risco').val() == 'S') {
        $('#div-laudodf').show();

    } else {
        $('#div-laudodf').hide();
    }
});

$('#div-laudodfs').hide();

$('#idlaudo').change(function() {
    if ($('#idlaudo').val() == 'S') {
        $('#div-laudodfs').show();
        $('#tipo_sinistro').attr('required', true);
        $('#numero_sinistro').attr('required', true);
        $('#dt_emissao_sinistro').attr('required', true);
    } else {
        $('#div-laudodfs').hide();
        $('#tipo_sinistro').attr('required', false);
        $('#numero_sinistro').attr('required', false);
        $('#dt_emissao_sinistro').attr('required', false);
    }
});
$('#tempo_moradia').val(null);

$("#cep").mask("99.999-999");
// adição de máscara de cep
$('#cep').keyup(function() {
    if ($('input[name="cep"]').val().length >= 9) {
        var cep = $('input[name="cep"]').val().replace(/[^\d]+/g, '');
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            success: function(result) {
                $('input[name="logradouro"]').val(result.logradouro);
                $('input[name="bairro"]').val(result.bairro);
                selectMunicipio.selectpicker("val", result.localidade);
            }
        })
    }
});
var selectMunicipio = $('#municipio');
$.ajax({
    url: 'admin/json/municipios.json',
    success: function(result) {
        var municipio = "";
        result.forEach(localidade => {
            if ( municipio !== localidade.municipio.nome ) selectMunicipio.append('<option> ' + localidade.municipio.nome + ' </option> ');
            municipio = localidade.municipio.nome;
        });
        selectMunicipio.val(null)
        selectMunicipio.selectpicker();
    }
});


$('#save-titular-moradia-form').click( function() {
    if ( $('#idtitular').val() ) {
        var moradia_data = $("#moradia-form").serializeArray();
        moradia_data.push({ name: "titular_id", value: $("#idtitular").val() });
        
        $.ajax({
            type: 'POST',
            url: 'admin/api/moradia',
            data: moradia_data,
            beforeSend: () => { 
                $(this).hide();
            },
            statusCode:{
            200: function(response) {
                $('#save-titular-moradia-form').hide()
                $('#message').text('Salvo com sucesso!');
                $('#alert').attr('class', 'alert alert-success shadow');
                $('#alert').show();
            },
            401: function(response) {
                $('#save-titular-form').hide()
                $('#alert-titular').text('Você não possui permissão')
                $('#alert-titular').toggle()
            },
            400: function(response) {
                $('#message').text('Operação não permitida!');  
                $('#alert').attr('class', 'alert alert-danger shadow');
                $('#alert').show();
            },
            500: function(response){
                $('#message').text('Ops, houve um erro interno');
                $('#alert').attr('class', 'alert alert-danger shadow');
                $('#alert').show();
            }
        },
            success: (response) => {
                //console.log(result)
                $('input[name=idmoradia]').val(result.idconjuge);
                $(this).show();

            },
            error: (xhr, textStatus, thrown) => {
                $('#message').text(textStatus +': '+xhr.status+' '+thrown);
                $('#alert').attr('class', 'alert alert-danger shadow');
                $('#alert').show();
            }                
        })
    
    }
    return false;
})