DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS deliveries CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS food_items CASCADE;
DROP TABLE IF EXISTS rider_profiles CASCADE;
DROP TABLE IF EXISTS homemaker_profiles CASCADE;
DROP TABLE IF EXISTS customer_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer', 'homemaker', 'rider')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    disease_name VARCHAR(120),
    preferred_diet VARCHAR(50),
    address TEXT,
    age INT,
    gender VARCHAR(20)
);

CREATE TABLE homemaker_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    kitchen_address TEXT,
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    nid_number VARCHAR(60),
    experience_years INT DEFAULT 0
);

CREATE TABLE rider_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_type VARCHAR(50),
    license_number VARCHAR(80),
    availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'offline'))
);

CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    provider_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_type VARCHAR(20) DEFAULT 'homemaker' CHECK (provider_type IN ('homemaker', 'restaurant')),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    calories INT,
    diet_type VARCHAR(50) NOT NULL,
    disease_tag VARCHAR(100),
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount NUMERIC(10,2) NOT NULL,
    delivery_address TEXT NOT NULL,
    note TEXT,
    status VARCHAR(30) DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'accepted',
            'rejected',
            'cooking',
            'ready_for_pickup',
            'picked_up',
            'on_the_way',
            'delivered',
            'cancelled'
        )
    ),
    rider_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    food_item_id INT NOT NULL REFERENCES food_items(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL
);

CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    order_id INT UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    rider_id INT REFERENCES users(id) ON DELETE SET NULL,
    pickup_status VARCHAR(30) DEFAULT 'pending' CHECK (pickup_status IN ('pending', 'picked_up')),
    delivery_status VARCHAR(30) DEFAULT 'assigned' CHECK (
        delivery_status IN ('assigned', 'on_the_way', 'delivered')
    ),
    assigned_at TIMESTAMP,
    picked_up_at TIMESTAMP,
    delivered_at TIMESTAMP
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    food_item_id INT NOT NULL REFERENCES food_items(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_food_items_provider_id ON food_items(provider_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_rider_id ON orders(rider_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_deliveries_rider_id ON deliveries(rider_id);