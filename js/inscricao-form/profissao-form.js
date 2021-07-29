/*
$('#orgao').val(null);
$('#invalido').val(null);
$('#idorgaoprofissao').val(null);
$('#ativo').val(null);
$('#municipio_lotacao').val(null);*/
$('#foto_enfermidade').hide();
$('#foto_renda').hide()
//$('#preview_foto_renda').show();
//$('#preview_foto_enfermidade').show();
//$('#div-seforativo').hide();


var compress_foto_renda = new Compress(); //instanciando elemento do Compress;
var upload_foto_renda = document.getElementById('upload_foto_renda'); // aonde eu to pegando a imagem
var preview_foto_renda = document.getElementById('preview_foto_renda'); //aonde vai ser exibido a imagem

upload_foto_renda.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress_foto_renda.compress(files, {
        size: 1, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem

        // Retorna uma imagens compactadas dentro do array;
        preview_foto_renda.src = `${img.prefix}${img.data}`;
        $('input[name="renda"]').val(`${img.prefix}${img.data}`);
        $('#foto_renda').show();
        $('#form_foto_renda').hide();
    })

}, false);

$('#preview_foto_renda ').click(() => {
    $('#foto_renda').hide();
    $('#form_foto_renda').show();
});

var compress_foto_enfermidade = new Compress(); //instanciando elemento do Compress;
var upload_foto_enfermidade = document.getElementById('upload_foto_enfermidade'); // aonde eu to pegando a imagem
var preview_foto_enfermidade = document.getElementById('preview_foto_enfermidade'); //aonde vai ser exibido a imagem

upload_foto_enfermidade.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress_foto_enfermidade.compress(files, {
        size: 1, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem
        // Retorna uma imagens compactadas dentro do array;
        preview_foto_enfermidade.src = `${img.prefix}${img.data}`;
        $('input[name="enfermidade"]').val(`${img.prefix}${img.data}`);
        $('#foto_enfermidade').show();
        $('#form_foto_enfermidade').hide();
    })

}, false);

$('#preview_foto_enfermidade ').click(() => {
    $('#foto_enfermidade').hide();
    $('#form_foto_enfermidade').show();
});


var selectMunicipio = $('#municipio_lotacao');
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

$('#ativo').change(function() {
    if ($('#ativo').val() == 'S') {
        $('#div-seforativo').show();
        $('#unidade_lotacao').attr('required', true);
        $('#municipio_lotacao').attr('required', true);
        $('#cargo').attr('required', true);
        $('#dt_ingresso').attr('required', true);
        load_municipios('municipio_lotacao');
    } else {
        $('#div-seforativo').hide();
        $('#unidade_lotacao').attr('required', false);
        $('#municipio_lotacao').attr('required', false);
        $('#cargo').attr('required', false);
        $('#dt_ingresso').attr('required', false);
    }
});


$('#invalido').change(function() {
    if ($('#invalido').val() == 'S') {
        $('#div-enfermidade').show();
        $('#upload_foto_enfermidade').attr('required', true);
    } else {
        $('#div-enfermidade').hide();
        $('#upload_foto_enfermidade').attr('required', false);
    }
});

//valores irem em float para o banco de dados.
$('input[name="renda_bruta"]').change(function() {
    valor_renda_bruta += parseFloat($(this).val());
    console.log(valor_renda_bruta);
});
$('input[name="valor_saldo"]').change(function() {
    valor_saldo += parseFloat($(this).val());
    console.log(valor_saldo);
});

$('#save-titular-profissao-form').click( function() {
    if ( $('#idtitular').val() ) {
        var profissao_data = $("#titular-profissao-form").serializeArray();
        profissao_data.push({ name: "titular_id", value: $("#idtitular").val() });
        
        $.ajax({
            type: 'POST',
            url: 'admin/api/profissao',
            data: profissao_data,
            beforeSend: () => { 
                $(this).hide();
            },
            statusCode:{
            200: function(response) {
                $('#save-titular-form').hide()
                $('#message').text('Salvo com sucesso!');
                $('#alert').attr('class', 'alert alert-success shadow');
                $('#conjuge-form-body').html('partial/inscricao-form/conjuge-form.html')
                $('#conjuge').attr('class', 'show');
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
                console.log(response)
                $('input[name=idprofissao]').val(result.idprofissao);
                $('input[name=idrenda]').val(result.idrenda);
                $('input[name=idenfermidade]').val(result.idenfermidade);
                $('#conjuge-form-body').load('partial/inscricao-form/conjuge-form.html');
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
