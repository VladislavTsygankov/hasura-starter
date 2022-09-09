-- Creation of users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  firstname varchar(200) NOT NULL,
  lastname varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- Creation of groups table
CREATE TABLE IF NOT EXISTS groups (
  id SERIAL,
  name varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- Creation of user-group table
CREATE TABLE IF NOT EXISTS user_group (
  id SERIAL,
  group_Id INT,
  user_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_group
      FOREIGN KEY(group_id) 
	  REFERENCES groups(id),
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

-- Creation of user view
CREATE VIEW user_groups_view AS
  SELECT user_id, groups.*
    FROM user_group LEFT JOIN groups
      ON user_group.group_id = groups.id;

-- Creattion of group view
CREATE VIEW group_users_view AS
  SELECT group_id, users.*
    FROM user_group LEFT JOIN users
      ON user_group.user_id = users.id;