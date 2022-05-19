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
