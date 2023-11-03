drop table if exists child_prize;
drop table if exists child_chore;
drop table if exists child_assignment;
drop table if exists parent;
drop table if exists child;
drop table if exists prize;
drop table if exists chore;

create table chore (
  id            serial primary key,
  name          text not null,
  description   text,
  points        int not null,
  days_of_week  integer[]
);

insert into chore (name, points, days_of_week) values ('Brush Teeth - Morning', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Brush Teeth - Night', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Make Bed', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Dishes', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clear Table', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Pick Up Toys', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Sweep Floor', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Dust', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Take Out Trash', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Laundry', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Yard Work', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Water Plants', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Feed Pets', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Read', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Family Room', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Bedroom', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Hallway', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Kitchen', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Dining Room', 10, ARRAY[0,1,2,3,4,5,6]);
insert into chore (name, points, days_of_week) values ('Clean Living Room', 10, ARRAY[0,1,2,3,4,5,6]);

create table prize (
  id              serial primary key,
  name            text not null,
  description     text,
  cost            int not null,
  image_filename  text,
  url             text
);

create table child (
  id          serial primary key,
  parent_id   text not null,
  name        text not null,
  card_color  text not null,
  points      int not null default 0
);

create table parent (
  keycloak_id     text primary key,
  hashed_password text not null
);

create table child_assignment (
  id    serial primary key,
  child_id  int references child(id) not null,
  chore_id  int references chore(id) not null
);

create table child_chore (
  id        serial primary key,
  child_id  int references child(id) not null,
  chore_id  int references chore(id) not null,
  status    text not null default 'Incomplete',
  date      timestamptz not null default NOW(),
  note      text
);

create table child_prize (
  id            serial primary key,
  child_id      int references child(id) not null,
  prize_id      int references prize(id) not null,
  purchased_at  timestamptz not null default NOW()
);
