-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS petfind_db;
USE petfind_db;

-- Tabela de pets
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species ENUM('cachorro', 'gato', 'outro') NOT NULL,
  breed VARCHAR(100),
  color VARCHAR(50),
  size ENUM('pequeno', 'medio', 'grande'),
  status ENUM('perdido', 'encontrado') NOT NULL,
  description TEXT,
  location VARCHAR(255),
  contact_name VARCHAR(100),
  contact_phone VARCHAR(20) NOT NULL,
  contact_email VARCHAR(100),
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_species (species),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir dados de exemplo
INSERT INTO pets (name, species, breed, color, size, status, description, location, contact_name, contact_phone, contact_email, photo_url) VALUES
('Rex', 'cachorro', 'Labrador', 'Dourado', 'grande', 'perdido', 'Cachorro dócil, responde pelo nome Rex. Desapareceu no dia 20/11 próximo ao parque.', 'Centro, Joaçaba - SC', 'João Silva', '(49) 99999-1234', 'joao@email.com', 'https://example.com/rex.jpg'),
('Mimi', 'gato', 'Siamês', 'Branco e marrom', 'pequeno', 'encontrado', 'Gatinha encontrada perto da praça central. Muito carinhosa.', 'Centro, Joaçaba - SC', 'Maria Santos', '(49) 99999-5678', 'maria@email.com', 'https://example.com/mimi.jpg'),
('Thor', 'cachorro', 'Pastor Alemão', 'Preto e marrom', 'grande', 'perdido', 'Pastor alemão adulto, fugiu durante passeio. Usa coleira azul.', 'Bairro Santa Maria, Joaçaba - SC', 'Carlos Oliveira', '(49) 98888-4321', 'carlos@email.com', null);