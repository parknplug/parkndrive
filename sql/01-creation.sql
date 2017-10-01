SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `parkndrive`;
USE `parkndrive`;

-- driver table
CREATE TABLE IF NOT EXISTS `e_driver` (
  `d_id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `d_name` varchar(50) NOT NULL,
  `d_first_name` varchar(50) NOT NULL,
  `d_username` varchar(32) NOT NULL,
  `d_email` varchar(50) NOT NULL,
  `d_password` varchar(64) NULL DEFAULT NULL,
  `d_h_id` int(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`d_id`),
  KEY `d_h_id` (`d_h_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- house table
CREATE TABLE IF NOT EXISTS `e_house` (
  `h_id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `h_name` varchar(50) DEFAULT NULL,
  `h_address` varchar(50) NOT NULL,
  `h_postal_code` int(1) NOT NULL,
  `h_city` varchar(50) NOT NULL,
  `h_country` varchar(2) NOT NULL DEFAULT 'FR',
  `h_value` int(5) unsigned NOT NULL,
  PRIMARY KEY (`h_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


-- foreign key
ALTER TABLE `e_driver`
  ADD CONSTRAINT `FK__e_driver__e_house__h_id` FOREIGN KEY (`d_h_id`) REFERENCES `e_house` (`h_id`) ON DELETE CASCADE;


-- mandatory for user model
ALTER TABLE  `e_driver` 
  ADD `realm` varchar(50) NULL DEFAULT NULL,
  ADD `credentials` varchar(50) NULL DEFAULT NULL,
  ADD `challenges` varchar(50) NULL DEFAULT NULL,
  ADD `emailVerified` int(1) NULL DEFAULT NULL,
  ADD `verificationToken` varchar(50) NULL DEFAULT NULL,
  ADD `status` int(11) NULL DEFAULT NULL,
  ADD `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD `lastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

DROP TABLE IF EXISTS `e_car`;
CREATE TABLE `e_car` (
  `c_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `c_name` varchar(45) NOT NULL,
  `c_d_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `c_d_id_idx` (`c_d_id`),
  CONSTRAINT `c_d_id` FOREIGN KEY (`c_d_id`) REFERENCES `e_driver` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `e_travel`;
CREATE TABLE `e_travel` (
  `t_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `t_distance` int(10) unsigned NOT NULL,
  `t_c_id` int(10) unsigned DEFAULT NULL,
  `t_d_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`t_id`),
  KEY `t_c_id_idx` (`t_c_id`),
  KEY `t_d_id_idx` (`t_d_id`),
  CONSTRAINT `t_c_id` FOREIGN KEY (`t_c_id`) REFERENCES `e_car` (`c_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `t_d_id` FOREIGN KEY (`t_d_id`) REFERENCES `e_driver` (`d_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
