CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES ('admin', 'admin@admin.com', '$2b$10$PqLV.OPh6p.GAqoUP7g0X.DhRWPPtirlhaU7uWjkvED9rMovFtsd2'); 