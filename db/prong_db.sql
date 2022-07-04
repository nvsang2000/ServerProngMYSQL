CREATE DATABASE PRONGDB;

use PRONGDB;
--  CREATE TABLE CONSULT ---
CREATE TABLE IF NOT EXISTS consult ( 
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(200) NOT NULL, 
    place varchar(200) NOT NULL,
	url_image varchar(500) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--  CREATE TABLE MAGAZINE ---
CREATE TABLE IF NOT EXISTS magazine ( 
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(200) NOT NULL, 
    place varchar(200) NOT NULL,
    area varchar(200) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--  CREATE TABLE EQUIPMENT ---
CREATE TABLE IF NOT EXISTS equipment ( 
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,  
    name varchar(200) NOT NULL, 
    place varchar(200) NOT NULL,
	url_image varchar(500) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- insert DATA FOR table --
INSERT INTO consult (name, place, url_image) VALUES
  (
	'OUNCE Housing', 
    '인천Gimhae-si,Gyeongsangnam-do,Republic of Korea',
    'https://res.cloudinary.com/drqaocsli/image/upload/v1656827572/PRONG/review-nhung-quan-cafe-dep-o-thanh-pho-moi-binh-duong-8_ezfxtw.jpg'
	),( 
  'KOKACHARM', 
  'Seongbuk-gu, Seoul, Republic of Korea',
   'https://res.cloudinary.com/drqaocsli/image/upload/v1656827571/PRONG/Y-tuong-trang-tri-quan-ca-phe-cuc-don-gian-nhung-rat-thu-hut-khach-hang_iacecl.jpg'
  ),(
  'DHOLIC', 
  'Gimhae-si, Gyeongsangnam-do, Republic of Korea',
  'https://res.cloudinary.com/drqaocsli/image/upload/v1656827571/PRONG/quan-cafe-ngon-view-dep-quan-nhan_eviugo.jpg'
  );

INSERT INTO magazine ( name, place, area) VALUES
  (
	'UIX', 
	'Residential Space', 
    'Seoul'
	),(
	'Looc', 
	'Residential Space', 
    'Seoul'
	),( 
	'OUNCE', 
	'Residential Space', 
    'Busan'
);

INSERT INTO equipment ( name, place, url_image) VALUES
  (
	'Cafe Chair', 
    'Gimhae-si, Gyeongsangnam-do, Republic of Korea',
	'https://res.cloudinary.com/drqaocsli/image/upload/v1656830544/PRONG/download_xf4nmt.jpg'
	),(
  'Cafe Interior', 
  'Gimhae-si, Gyeongsangnam-do, Republic of Korea', 
  'https://res.cloudinary.com/drqaocsli/image/upload/v1656830544/PRONG/images_ugxgi6.jpg'
  ),(
  'cafe coffee cup', 
  'Gimhae-si, Gyeongsangnam-do, Republic of Korea',
  'https://res.cloudinary.com/drqaocsli/image/upload/v1656830545/PRONG/coffee-machine-cafe-shop-espresso-preparation-professional-equipment-background-takeaway-service-2DD6BJH_ivgjfb.jpg'
  );

