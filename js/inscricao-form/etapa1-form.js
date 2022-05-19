$('#cpf').mask('999.999.999-99');
$('#cep').mask('99999-999');
$('#contato').mask('(99) 99999-9999');
$('#div-pcd').hide();
$('#foto_rg').hide();
$('#foto_laudo').hide();


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

