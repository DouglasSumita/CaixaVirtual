# CAIXA VIRTUAL #

Configurar Ambiente:

Programas Necessários: node, mysql

1º Instalar Node. 
2º Instalar Dependencias do node para este projeto: "npm install".
3º Instalar MYSQL porta 3306.
4º Criar banco de dados nome: "caixavirtual".
5º Criar tabelas: categorias, movimentacoes, usuarios.
   
    categorias = {
        id int primary key not null auto_increment,
        name varchar(45) default null
    }
    
    movimentacoes = {
        id int primary key not null auto_increment,
        descricao varchar(45) default null,
        tipo varchar(45) default null,
        valor double not null,
        id_categoria not null foreign key -> caregorias(id),
        usuario varchar(60) default null 
    }

6º Inserção/Listagem de dados

    host: localhost
    porta: 3000

    CATEGORIAS:
        
        endpoint: /categorias
                
        MÉTODOS:
            
            GET - STATUS 200 - Retorna um objeto contendo um array de objetos com os dados das categorias no banco:
            OBJETO DE RETORNO:   
                {
                    "id": 1,
                    "name": "Produtos"
                }

            POST - STATUS 201 - Insere  um novo registro na tabela de categorias.
            OBJETO ESPERADO:
                {
                    "name": "Produtos X"
                }

    
    MOVIMENTACOES:
        
        endpoint: /movimentacoes
        
        MÉTODOS:
            
            GET - STATUS 200 - Retorna um objeto contendo o saldo total ja somado ENTRADAS e diminuido as SAIDAS 
            e um array de objetos referente as movimentacoes do usuário.
            OBJETO DE RETORNO:
            {
                "saldoTotal": 5,
                "movimentacoes": [
                    {
                        "data": "05/04/2020",
                        "id": "1",
                        "categoria": {
                            "id": "1",
                            "name": "FORNECEDORES"
                    },
                "tipo": "ENTRADA",
                "valor": 5,
                "descricao": "Recebimento Verbas"
            }
            
            POST - STATUS 201 - Insere novo registro na tabela de movimentacoes.
            OBJETO ESPERADO:
            {
                "descricao": "Pagamento Fornecedores",
                "id_categoria": 1,
                "valor": 10.00,
                "tipo": "SAIDA",
                "data": "2020-04-06",
                "usuario": "douglas.sumita@gmail.com"
            }

            
