CREATE SCHEMA boizinho;

USE boizinho;

CREATE TABLE animais(
	id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_lacre VARCHAR(255) NOT NULL,
    nome_animal VARCHAR(255) NOT NULL,
    codigo_registro VARCHAR(255) NOT NULL,
	codigo_registro_pai VARCHAR(255),
	codigo_registro_mae VARCHAR(255),
    peso_inicial DECIMAL(10,2),
    data_nascimento DATE
);

INSERT INTO animais
(codigo_lacre, nome_animal, codigo_registro, codigo_registro_pai, codigo_registro_mae, peso_inicial, data_nascimento)
VALUES
('123456', 'Bicho 1', 'REG123', 'PAI123', 'MAE123', '10.5', '2020-01-01'),
('LACRE124', 'Bicho 2', 'REG124', 'PAI124', 'MAE124', '12.0', '2021-03-15');
