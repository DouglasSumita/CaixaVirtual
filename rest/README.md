# CAIXA VIRTUAL #

Configurar Ambiente:

Programas Necessários: node, mysql ou mysql Workbench

1º Instalar Node - Link: https://nodejs.org/en/download/.
2º Instalar Dependencias do node para este projeto: "npm install".
3º Instalar MYSQL Workbench porta 3306 - Link: https://dev.mysql.com/downloads/workbench/.
  3.1 - Configurar banco com senha: "senha1".
4º Criar banco de dados nome: "caixavirtual", ("CREATE DATABASE caixavirtual;").
5º Criar tabelas: categorias, movimentacoes.
   
    categorias = {
      CREATE TABLE `categorias` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(45) DEFAULT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
    }
    
    movimentacoes = {
      CREATE TABLE `movimentacoes` (
        `id` int NOT NULL AUTO_INCREMENT,
        `descricao` varchar(45) DEFAULT NULL,
        `id_categoria` int NOT NULL,
        `valor` double NOT NULL,
        `tipo` varchar(45) DEFAULT NULL,
        `data` date DEFAULT NULL,
        `usuario` varchar(60) NOT NULL,
        PRIMARY KEY (`id`),
        KEY `id_categoria_idx` (`id_categoria`),
        CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
      ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
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
            
            NECESSARIO: enviar header "Authorization" como conteúdo o email do usuario.
            Ex: Key: Authorization
                Value: douglas.sumita@gmail.com
            
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

            
