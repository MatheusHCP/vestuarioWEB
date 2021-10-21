
var urlAPI = "http://anapaulazanelato-001-site1.ftempurl.com"

$.ajax({
    type: "GET",
    url: urlAPI + "/api/Categoria",
    contentType: "application/json; charset=utf-8",
    data: "",
    dataType: "json",
    success: function (jsonResult) {
        if (jsonResult.status) {
            $(jsonResult.obj).each(function (index, item) {

              
                var option = $("<option>", { value: item.id, text: item.descricao })
                $("#ddlcategoria").append(option)
            })
        }

    },
    failure: function (response) {
        alert("Erro ao carregar os dados: " + response);
    }
});


$("#btnsalvar").click(function () {

    salvarProduto();

});


function salvarProduto() {
    //validar
    var descricao, valor, data, idcategoria, codigo, valida;
    valida = true;
    descricao = $("#txtdescricao").val();
    valor = $("#txtvalor").val();
    data = $("#txtdata").val();
    codigo = $("#txtcodigo").val();
    idcategoria = $("#ddlcategoria").val();
   
    if ($("#txtdescricao").val() == '') {
       
        valida = false;
        $("#txtdescricao").css("border", "1px solid red");
        $("#txtdescricao").focus();
        
    }
    //todos
   

    //salvar 
    if (valida) {
        var tipoRequisicao;
        if (codigo == '') {
            //inclusao
            tipoRequisicao = "POST";
        }
        else {
            //alteracao
            tipoRequisicao = "PUT";
        }


        var obj = {
            "id": codigo==""?0:parseInt(codigo),
            "descricao": descricao,
            "valor": valor,
            "dataValidade": data,
            "categoriaid": idcategoria,
            "categoria": null
        }

        $.ajax({
            type: tipoRequisicao,
            url: urlAPI + "/api/Produto",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function (jsonResult) {
                if (jsonResult.status) {
                    Swal.fire(
                        'cadastro',
                        'Dados salvos com sucesso',
                        'success'
                    )

                    $("#txtdescricao").val("");
                    $("#txtvalor").val("");
                    $("#txtdata").val("");
                    $("#txtcodigo").val("");
                    $("#ddlcategoria").val("");

                }
                else
                    Swal.fire(
                        'cadastro',
                        'Ops... ocorreu um erro ' + jsonResult.mensagem ,
                        'error'
                    )

            },
            failure: function (response) {
                alert("Erro ao carregar os dados: " + response);
            }
        });
     }


}

$('#txtdescricaobusca').keyup(function () {
    buscar();
});


function buscar() {
    //limpar os dados anteriores
    $("#itens").empty();

    $.ajax({
        type: "GET",
        url: urlAPI + "/api/Produto/getProdutos?descricao=" + $('#txtdescricaobusca').val(),
        contentType: "application/json; charset=utf-8",
        data: "",
        dataType: "json",
        success: function (jsonResult) {
            if (jsonResult.status) {
                $(jsonResult.obj).each(function (index, item) {
                    var linha = $("#linhamodelo").clone();
                    $(linha).find('.codigo').text(item.id);
                    $(linha).find('.descricao').text(item.descricao);

                    var botaoAlterar = $(linha).find('.btnalterar');

                    botaoAlterar.attr('data-id', item.id);

                    botaoAlterar.click(function () {
                        carregarDados(botaoAlterar);
                    });

                    var botaoExcluir = $(linha).find('.btnexcluir');


                    botaoExcluir.attr('data-id', item.id);

                    botaoExcluir.click(function () {
                        excluir(botaoExcluir);
                    });
                    $("#itens").append(linha);
                   
                })
            }

        },
        failure: function (response) {
            alert("Erro ao carregar os dados: " + response);
        }
    });

}


function carregarDados(botao) {
    var id = $(botao).attr('data-id');

    $.ajax({
        type: "GET",
        url: urlAPI + "/api/Produto?id=" + id,
        contentType: "application/json; charset=utf-8",
        data: "",
        dataType: "json",
        success: function (jsonResult) {
            if (jsonResult.status) {
                $("#txtdescricao").val(jsonResult.obj.descricao);
                $("#txtvalor").val(jsonResult.obj.valor);
                $("#txtdata").val(jsonResult.obj.dataValidade.substr(0, 10));
                $("#txtcodigo").val(jsonResult.obj.id);
                $("#ddlcategoria").val(jsonResult.obj.categoriaid);
            }
            buscar();
        },
        failure: function (response) {
            alert("Erro ao carregar os dados: " + response);
        }
    });
}


function excluir(botao) {
    var id = $(botao).attr('data-id');

    Swal.fire({
        title: 'Confirma a exclusão dos dados?',
        text: "Após confirmar não será possível reverter!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir agora!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
          //excluir
            requisicaoexcluir(id);
        }
    })



}



function requisicaoexcluir(id) {
    $.ajax({
        type: "DELETE",
        url: urlAPI + "/api/Produto?id=" + id,
        contentType: "application/json; charset=utf-8",
        data: "",
        dataType: "json",
        success: function (jsonResult) {
            if (jsonResult.status) {
                Swal.fire(
                    'Exclusão',
                    'Dados excluídos com sucesso',
                    'success'
                )
                buscar();
            }
            else {
                Swal.fire(
                    'Exclusão',
                    'Erro o excluir!' + jsonResult.mensagem,
                    'error'
                )
            }

        },
        failure: function (response) {
            alert("Erro ao carregar os dados: " + response);
        }
    });
}