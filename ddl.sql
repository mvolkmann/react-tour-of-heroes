drop database if exists tour_of_heroes;
create database tour_of_heroes;

use tour_of_heroes;

create table hero (
  id int auto_increment primary key,
  name varchar(100) not null,
  unique uniqueName (name)
);

insert into hero (id, name) values
(11, 'Mr. Nice'),
(12, 'Narco'),
(13, 'Bombasto'),
(14, 'Celeritas'),
(15, 'Magneta'),
(16, 'RubberMan'),
(17, 'Dynama'),
(18, 'Dr IQ'),
(19, 'Magma'),
(20, 'Tornado');
