$(document).ready(function() {

    $('#btnPesquisar').click(function() {
  
        var cep = $('#cep').val().replace(/\D/g, '');

        $('#resultado').html('').hide();

        if (cep.length !== 8) {
            $('#resultado').html('<p class="erro">Por favor, digite um CEP válido com 8 dígitos.</p>').show();
            return;
        }

        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            dataType: 'json',
            success: function(dados) {
                if (dados.erro) {
                    $('#resultado').html('<p class="erro">CEP não encontrado!</p>').show();
                } else {
                    var conteudo = `
                        <h4>Endereço Encontrado:</h4>
                        <p><strong>Rua:</strong> ${dados.logradouro}</p>
                        <p><strong>Bairro:</strong> ${dados.bairro}</p>
                        <p><strong>Cidade:</strong> ${dados.localidade}</p>
                        <p><strong>Estado:</strong> ${dados.uf}</p>
                    `;

                    $('#resultado').html(conteudo).fadeIn();
                }
            },
            error: function() {
                $('#resultado').html('<p class="erro">Erro ao consultar a API. Tente novamente.</p>').show();
            }
        });
    });
});
