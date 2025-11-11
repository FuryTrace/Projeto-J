
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";

--
-- Banco de dados: `lista_tarefa`
--

CREATE DATABASE IF NOT EXISTS `lista_tarefa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lista_tarefa`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE IF NOT EXISTS `tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` char(120) NOT NULL,
  `descricao` text NOT NULL,
  `data_criacao` date NOT NULL,
  `data_conclusao` date DEFAULT NULL,
  `status` enum('pendente','em andamento','concluida') NOT NULL DEFAULT 'pendente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` ( `nome`, `descricao`, `data_criacao`, `data_conclusao`, `status`) VALUES
('Maria Alves', 'Descrição da tarefa 1', '2020-01-01', '2020-01-02', 'concluida'),
('Joao Paulo', 'Descrição da tarefa 2', '2025-04-11', NULL, 'em andamento'),
('Joana Silveira', 'Descrição da tarefa 3', '2025-07-11', NULL, 'em andamento'),
('Ana Clara', 'Descrição da tarefa 4', '2025-04-11', NULL, 'pendente');
COMMIT;
