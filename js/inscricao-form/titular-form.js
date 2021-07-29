$('#cpf').mask('999.999.999-99');
$('#cep').mask('99999-999');
$('#contato').mask('(99) 99999-9999');
//$('#municipio').val(null);
//$('#sexo').val(null);
//('#estado_civil').val(null);
//$('#tipo_pcd').val(null);
//$('#escolaridade').val(null);
//$('#pcd').val(null);
$('#div-pcd').hide();
$('#foto_rg').hide();
$('#foto_laudo').hide();
//$('#preview_foto_laudo').show();


function load_municipios(id, value) {
    var selectMunicipio = $(`#${id}`);
    $.ajax({
        url: 'admin/json/municipios.json',
        success: function(result) {
            var municipio = "";
            result.forEach(localidade => {
                if ( municipio !== localidade.municipio.nome ) selectMunicipio.append('<option value='+localidade.municipio.nome+' > ' + localidade.municipio.nome + ' </option> ');
                municipio = localidade.municipio.nome;
            });
            selectMunicipio.val(value)
        }
    });
}



$('#cpf').change( function () {
    $.ajax({
        type: 'POST',
        url: 'admin/api/titular/verificar',
        data: {"cpf": $(this).val()}, 
        error: function(error) {
            console.log(error);
        },
        statusCode: {
            200: function(response) {
                // retornar todos os dados do titular quando ele tiver cadastro;
                result = response[0];
                console.table(result)
                $('input[name=idtitular]').val(result.idtitular);
                $('input[name=nome]').val(result.nome);
                $('input[name=dt_nascimento]').val(result.dt_nascimento);
                $('select[name=sexo]').val(result.sexo);
                $('input[name=naturalidade]').val(result.naturalidade);
                $('select[name=escolaridade]').val(result.escolaridade);
                $('select[name=estado_civil]').val(result.estado_civil);
                $('input[name=email]').val(result.email);
                $('input[name=contato]').val(result.contato);
                $('input[name=rg]').val(result.rg);
                $('input[name=orgao_expedidor]').val(result.orgao_expedidor);
                $('input[name=dt_expedicao]').val(result.dt_expedicao);
                if ( result.idrg ) {
                    $('input[name=idrg]').val(result.idrg);
                    $('input[name=base64_rg]').val(result.base64_rg);
                    $('#preview_foto_rg').attr("src", result.base64_rg);
                    $('#foto_rg').show();
                    $('#form_foto_rg').hide();
                }
                $('#div-pcd').show();
                $('select[name=pcd]').val(result.pcd);
                $('select[name=tipo_pcd]').val(result.tipo_pcd);
                $('input[name=cid]').val(result.cid);
                if ( result.idpcd ) {
                    $('input[name=idpcd]').val(result.ipcd);
                    $('input[name=laudo]').val(result.laudo);
                    $('#preview_foto_laudo').attr("src", result.laudo);
                    $('#foto_laudo').show();
                    $('#form_foto_laudo').hide();
                }

                
                $('#titular-profissao-form-body').load('partial/inscricao-form/profissao-form.html', function(){
                    $('#titular-profissao').attr('class', 'show');
                    $('input[name=idprofissao]').val(result.idprofissao);
                    $('input[name=titular_id]').val(result.titular_id);
                    $('select[name=orgao]').val(result.orgao);
                    load_municipios('municipio_lotacao', result.municipio_lotacao);
                    if(result.ativo == 'N'){
                        $('#div-seforativo').hide()
                    }
                    $('select[name=ativo]').val(result.ativo);
                    $('input[name=unidade_lotacao]').val(result.unidade_lotacao);
                    $('input[name=cargo]').val(result.cargo);
                    $('input[name=dt_ingresso]').val(result.dt_ingresso);
                    $('select[name=invalido]').val(result.invalido);
                    $('input[name=renda_bruta]').val(result.renda_bruta);
                    $('input[name=valor_saldo]').val(result.valor_saldo);
                    $('#div-enfermidade').show();
                    if (result.invalido = 'S'){
                        if ( result.idenfermidade ) {
                        $('input[name=idenfermidade]').val(result.idenfermidade);
                        $('input[name=enfermidade]').val(result.enfermidade);
                        $('#preview_foto_enfermidade').attr("src", result.enfermidade);
                        $('#foto_enfermidade').show();
                        $('#form_foto_enfermidade').hide();
                            }
                        }
                    if ( result.idrenda ) {
                        $('input[name=profissao_id]').val(result.profissao_id);
                        $('input[name=idrenda]').val(result.idrenda);
                        $('input[name=renda]').val(result.renda);
                        $('#preview_foto_renda').attr("src", result.renda);
                        $('#foto_renda').show();
                        $('#form_foto_renda').hide();
                    }
                    
                    
                })
                $('#conjuge-form-body').load('partial/inscricao-form/conjuge-form.html', function(){
                    $('#conjuge').attr('class', 'show');
                    //salvar conjuge
                    $('input[name=idconjuge]').val(result.idconjuge);
                    $('input[name=titular_id]').val(result.titular_id);
                    $('input[name=nome_conjuge]').val(result.nome_conjuge);
                    $('input[name=dt_nascimento_conjuge]').val(result.dt_nascimento_conjuge);
                    $('select[name=sexo_conjuge]').val(result.sexo_conjuge);
                    $('input[name=naturalidade_conjuge]').val(result.naturalidade_conjuge);
                    $('select[name=escolaridade_conjuge]').val(result.escolaridade_conjuge);
                    $('input[name=cpf_conjuge]').val(result.cpf_conjuge);
                    $('input[name=rg_conjuge]').val(result.rg_conjuge);
                    $('input[name=orgao_exp_conjuge]').val(result.orgao_exp_conjuge);
                    $('input[name=dt_exp_conjuge]').val(result.dt_exp_conjuge);
                    $('select[name=pcd_conjuge]').val(result.pcd_conjuge);
                    $('select[name=tipo_pcd_conjuge]').val(result.tipo_pcd_conjuge);
                    $('input[name=cid_conjuge]').val(result.cid_conjuge);
                    $('input[name=laudo_conjuge]').val(result.laudo_conjuge);
                })
                $('#conjuge-profissao-form-body').load('partial/inscricao-form/profissao-conjuge-form.html', function(){
                    $('#conjuge-profissao').attr('class', 'show');
                    //salvar conjuge profissao
                    $('input[name=idprofissaoc]').val(result.idprofissaoc);
                    $('input[name=conjuge_id]').val(result.conjuge_id);
                    $('select[name=orgao_conjuge]').val(result.orgao_conjuge);
                    $('select[name=ativo_conjuge]').val(result.ativo_conjuge);
                    $('input[name=unidade_lotacao_conjuge]').val(result.unidade_lotacao_conjuge);
                    load_municipios('municipio_lotacao_conjuge', result.municipio_lotacao_conjuge);
                    if(result.ativo_conjuge == 'N'){
                        $('#div-seforativo_conjuge').hide()
                    }
                    //$('select[name=municipio_lotacao_conjuge]').val(result.municipio_lotacao_conjuge);
                    $('input[name=cargo_conjuge]').val(result.cargo_conjuge);
                    $('input[name=dt_ingresso_conjuge]').val(result.dt_ingresso_conjuge);
                    $('select[name=invalido_conjuge]').val(result.invalido_conjuge);
                    $('input[name=enfermidade_conjuge]').val(result.enfermidade_conjuge);
                    $('input[name=renda_conjuge]').val(result.renda_conjuge);
                    $('input[name=renda_bruta_conjuge]').val(result.renda_bruta_conjuge);
                    $('input[name=valor_saldoc]').val(result.valor_saldoc);
                })
                $('#moradia-form-body').load('partial/inscricao-form/moradia-form.html', function(){
                    $('#moradia').attr('class', 'show');
                    //salvar moradia
                    //console.log(JSON.stringify(result))
                    $('input[name=idmoradia]').val(result.idmoradia);
                    $('input[name=titular_id]').val(result.titular_id);
                    $('select[name=municipio]').val(result.municipio);
                    $('input[name=cep]').val(result.cep);
                    $('input[name=bairro]').val(result.bairro);
                    $('input[name=logradouro]').val(result.logradouro);
                    $('input[name=numero_casa]').val(result.numero_casa);
                    $('select[name=situacao]').val(result.situacao);
                    $('select[name=caracteristica_uso]').val(result.caracteristica_uso);
                    $('select[name=tempo_moradia]').val(result.tempo_moradia);
                    $('select[name=tipo]').val(result.tipo);
                    $('input[name=dt_emissao_sinistro]').val(result.dt_emissao_sinistro);
                    $('input[name=sala]').val(result.sala);
                    $('input[name=cozinha]').val(result.cozinha);
                    $('input[name=quarto]').val(result.quarto);
                    $('input[name=banheiro_int]').val(result.banheiro_int);
                    $('input[name=banheiro_ext]').val(result.banheiro_ext);
                    $('input[name=outros]').val(result.outros);
                })    

                //console.log(JSON.stringify(result))

                $('#message').text('Você já possui cadastro');
                $('#alert').attr('class', 'alert alert-success shadow');
                $('#alert').show();
    
            },
            401: function(response) {
                $('#message').text('Acesso negado!');
                $('#alert').attr('class', 'alert alert-danger shadow');
                $('#alert').show();
            },
            400: function(response) {
                $('#message').text('Operação não permitida!');
                $('#alert').attr('class', 'alert alert-danger shadow');
                $('#alert').show();
            },
            204: function(response) {
                $('#message').text('você ainda não possui cadastro!');
                $('#alert').attr('class', 'alert alert-warning shadow');
                $('#alert').show();
            }
        },
        complete: function(response){
            //console.log(response.responseJSON[0])
            console.log($('#unidade_lotacao').lenght)
        },
        success: function(response){
            console.log(response)
            console.log($('#unidade_lotacao').lenght)
        }
    });
    return false
})

$('#pcd').change(function() {
    if ($('#pcd').val() == 'S') {
        $('#div-pcd').show();
        $('#tipo_pcd').attr('required', true);
        $('#cid').attr('required', true);
        $('#upload_foto_laudo').attr('required', true);
    } else {
        $('#div-pcd').hide();
        $('#tipo_pcd').attr('required', false);
        $('#cid').attr('required', false);
        $('#upload_foto_laudo').attr('required', false);
    }
});

var compress_foto_rg = new Compress(); //instanciando elemento do Compress;
var upload_foto_rg = document.getElementById('upload_foto_rg'); // aonde eu to pegando a imagem
var preview_foto_rg = document.getElementById('preview_foto_rg'); //aonde vai ser exibido a imagem

upload_foto_rg.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress_foto_rg.compress(files, {
        size: 1, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem

        // Retorna uma imagens compactadas dentro do array;
        preview_foto_rg.src = `${img.prefix}${img.data}`;
        $('input[name="base64_rg"]').val(`${img.prefix}${img.data}`);
        $('#foto_rg').show();
        $('#form_foto_rg').hide();
    })

}, false);

$('#preview_foto_rg ').click(() => {
    $('#foto_rg').hide();
    $('#form_foto_rg').show();
});

var compress_laudo = new Compress(); //instanciando elemento do Compress;
var upload_foto_laudo = document.getElementById('upload_foto_laudo'); // aonde eu to pegando a imagem
var preview_foto_laudo = document.getElementById('preview_foto_laudo'); //aonde vai ser exibido a imagem

upload_foto_laudo.addEventListener('change', (evt) => {
    var files = [...evt.target.files]
    compress_laudo.compress(files, {
        size: 1, // O tamanho máximo em MB, o padrão é 2 MB;
        quality: 0.75, // A qualidade da imagem, no máximo 1;
        maxWidth: 1920, // A lacompura máxima da imagem de saída, o padrão é 1920px;
        maxHeight: 1920, // A altura máxima da imagem de saída, o padrão é 1920px;
        resize: true // Padrão é verdadeiro, defina falso caso não quiser redimensionar a lacompura e altura da imagem;
    }).then((images) => {

        var img = images[0]; // criando array que vai receber as informações da imagem

        // Retorna uma imagens compactadas dentro do array;
        preview_foto_laudo.src = `${img.prefix}${img.data}`;
        $('input[name="laudo"]').val(`${img.prefix}${img.data}`);
        $('#foto_laudo').show();
        $('#form_foto_laudo').hide();
    })

}, false);

$('#preview_foto_laudo').click(() => {
    $('#foto_laudo').hide();
    $('#form_foto_laudo').show();
});

$('#estado_civil').change(function() {
    if ($(this).val() == 'Casado' || $(this).val() == 'União estável') {
        $('#conjuge-form').load('/partial/inscricao-form/conjuge-form.html');
        $('#conjuge-form').show();
        $('#profissao-conjuge-form').load('/partial/inscricao-form/profissao-conjuge-form.html');
        $('#profissao-conjuge-form').show();
    } else {
        $('#conjuge-form').html('');
        $('#conjuge-form').hide();
        $('#profissao-conjuge-form').html('');
        $('#profissao-conjuge-form').hide();
    }
});

$('#save-titular-form').click(function() {
    var titular_data = $("#titular-form").serializeArray();
    
    $.ajax({
        type: 'POST',
        url: 'admin/api/titular',
        data: titular_data,
        beforeSend: () => { 
            $(this).hide();
        },
        statusCode:{
            200: function(response) {
                $('#save-titular-form').hide()
                $('#message').text('Salvo com sucesso!');
                $('#alert').attr('class', 'alert alert-success shadow');
                $('#titular-profissao-form-body').html('partial/inscricao-form/conjuge-form.html')
                $('#titular-profissao').attr('class', 'show');
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
        success: (result) => {
            $('input[name=idtitular]').val(result.idtitular);
            $('input[name=idrg]').val(result.idrg);
            $('input[name=idpcd]').val(result.idpcd);            
            $('#titular-profissao-form-body').load('partial/inscricao-form/profissao-form.html'); //Em caso de Sucesso o usuário terá acesso a aba de profissionais.
            $(this).show();
        },
        error: (xhr, textStatus, thrown) => {
            $('#message').text(textStatus +': '+xhr.status+' '+thrown);
            $('#alert').attr('class', 'alert alert-danger shadow');
            $('#alert').show();
        }
    })

    return false

    
})