drop table if exists child_prize;
drop table if exists child_chore;
drop table if exists child_assignment;
drop table if exists child;
drop table if exists prize;
drop table if exists chore;
drop table if exists parent;

create table parent (
  id              serial primary key,
  keycloak_id     text not null,
  hashed_password text not null
);

insert into parent (keycloak_id, hashed_password) values ('1', 'test');

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
  date      timestamptz not null default NOW(),
  note      text
);

create table child_prize (
  id            serial primary key,
  child_id      int not null references child(id) ON DELETE CASCADE,
  prize_id      int references prize(id) not null,
  purchased_at  timestamptz not null default NOW()
);
