
-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE, -- Para URLs amigáveis
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir Categorias Iniciais
INSERT INTO categories (name, slug) VALUES 
('Máquinas', 'maquinas'),
('Peças', 'pecas'),
('Tecnologia', 'tecnologia');

-- Alterar Tabela de Produtos para usar FK (Opcional, mas recomendado no futuro)
-- ALTER TABLE products ADD COLUMN category_id INT;
-- ALTER TABLE products ADD FOREIGN KEY (category_id) REFERENCES categories(id);
