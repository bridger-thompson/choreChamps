drop table if exists purchased_prizes;
drop table if exists child_prize;
DROP TRIGGER IF EXISTS update_child_points_trigger ON child_chore;
drop table if exists child_chore;
drop table if exists child_assignment;
drop table if exists child;
drop table if exists prize;
drop table if exists chore;
drop table if exists parent;

create table parent (
  id        serial primary key,
  username  text not null,
  pin       varchar(4) not null default '1234'
);

create table chore (
  id            serial primary key,
  name          text not null,
  description   text,
  points        int not null,
  days_of_week  integer[],
  parent_id     int not null references parent(id) ON DELETE CASCADE
);

insert into chore (name, points, days_of_week, parent_id) values ('Brush Teeth - Morning', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Brush Teeth - Night', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Make Bed', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Dishes', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clear Table', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Pick Up Toys', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Sweep Floor', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Dust', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Take Out Trash', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Laundry', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Yard Work', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Water Plants', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Feed Pets', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Read', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Family Room', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Bedroom', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Hallway', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Kitchen', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Dining Room', 10, ARRAY[0,1,2,3,4,5,6], 1);
insert into chore (name, points, days_of_week, parent_id) values ('Clean Living Room', 10, ARRAY[0,1,2,3,4,5,6], 1);

create table prize (
  id              serial primary key,
  name            text not null,
  description     text,
  cost            int not null,
  image_filename  text,
  url             text,
  active          boolean not null default true,
  parent_id       int not null references parent(id)
);

create table child (
  id          serial primary key,
  parent_id   int not null,
  name        text not null,
  card_color  text not null,
  points      int not null default 0
);

INSERT INTO child (parent_id, name, card_color, points) VALUES (1, 'John', 'primary', 0);
INSERT INTO child (parent_id, name, card_color, points) VALUES (1, 'Sally', 'primary', 0);

create table child_assignment (
  id    serial primary key,
  child_id  int not null references child(id) ON DELETE CASCADE,
  chore_id  int not null references chore(id) ON DELETE CASCADE
);

create table child_chore (
  id        serial primary key,
  child_id  int not null references child(id) ON DELETE CASCADE,
  chore_id  int not null references chore(id) ON DELETE CASCADE,
  status    text not null default 'Incomplete',
  date      date not null,
  note      text
);

create table child_prize (
  id            serial primary key,
  child_id      int not null references child(id) ON DELETE CASCADE,
  prize_id      int not null references prize(id) ON DELETE CASCADE
);

create table purchased_prizes (
  id              serial primary key,
  child_prize_id  int not null references child_prize(id) ON DELETE CASCADE,
  purchased_at    timestamptz not null default NOW()
);

CREATE OR REPLACE FUNCTION update_child_points()
RETURNS TRIGGER AS $$
DECLARE
    total_incomplete_chores INT;
BEGIN
    IF OLD.status = 'Incomplete' AND NEW.status = 'Complete' THEN
        UPDATE child
        SET points = points + (
            SELECT points FROM chore WHERE id = NEW.chore_id
        )
        WHERE id = NEW.child_id;

        SELECT COUNT(*)
        INTO total_incomplete_chores
        FROM child_chore
        WHERE child_id = NEW.child_id
            AND status = 'Incomplete'
            AND date = NEW.date;

        IF total_incomplete_chores = 1 THEN
            UPDATE child
            SET points = points + 100
            WHERE id = NEW.child_id;
        END IF;

    ELSIF OLD.status = 'Complete' AND NEW.status = 'Incomplete' THEN
        UPDATE child
        SET points = points - (
            SELECT points FROM chore WHERE id = NEW.chore_id
        )
        WHERE id = NEW.child_id;

        SELECT COUNT(*)
        INTO total_incomplete_chores
        FROM child_chore
        WHERE child_id = NEW.child_id
            AND status = 'Incomplete'
            AND date = NEW.date;

        IF total_incomplete_chores = 0 THEN
            UPDATE child
            SET points = points - 100
            WHERE id = NEW.child_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_child_points_trigger
BEFORE UPDATE ON child_chore
FOR EACH ROW
EXECUTE FUNCTION update_child_points();