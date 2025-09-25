-- Menu items table
CREATE TABLE menu_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Sample data
INSERT INTO menu_items (name, description, price, image_url) VALUES
('Sate Ayam', 'Grilled chicken skewers with peanut sauce', 45000, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop'),
('Soto Ayam', 'Traditional chicken soup with herbs', 30000, 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=400&fit=crop'),
('Es Campur', 'Mixed ice dessert with fruits and jelly', 25000, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop');
