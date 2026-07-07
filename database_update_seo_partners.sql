CREATE TABLE IF NOT EXISTS `partners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `image_url` VARCHAR(500) NOT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255),
  `description` TEXT,
  `keywords` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserir os parceiros padrão (se não existirem)
INSERT IGNORE INTO `partners` (`name`, `image_url`, `order_index`) VALUES
('XAG', '/parceiros/logo_xag.webp', 1),
('Jan', '/parceiros/logo_jan.png', 2),
('Jassy', '/parceiros/logo_jassy.png', 3),
('Orion', '/parceiros/logo_orion.png', 4),
('Vence Tudo', '/parceiros/logo_vencetudo.webp', 5),
('Agromann', '/parceiros/logo_agromann.png', 6);

-- Inserir as configurações SEO padrão (se não existirem)
INSERT IGNORE INTO `seo_settings` (`page`, `title`, `description`, `keywords`) VALUES
('home', 'LN Máquinas e Peças Agrícolas - Início', 'Soluções completas em máquinas, peças e assistência técnica para o agronegócio.', 'máquinas agrícolas, peças agrícolas, assistência técnica, trator, pulverizador, Jataí'),
('products', 'Nossos Produtos - LN Máquinas', 'Confira nossa linha completa de máquinas, peças e tecnologia para o campo.', 'produtos agrícolas, comprar trator, peças para plantadeira, drones agrícolas'),
('about', 'Sobre Nós - LN Máquinas', 'Conheça a LN Máquinas e Peças Agrícolas, referência em Jataí e região.', 'sobre ln máquinas, história ln máquinas, jataí agronegócio'),
('contact', 'Contato - LN Máquinas', 'Fale conosco. Nossa equipe está pronta para atender sua lavoura onde você estiver.', 'contato ln máquinas, telefone ln máquinas, endereço ln máquinas');
