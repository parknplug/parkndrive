SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

INSERT INTO `e_driver` (`d_id`, `d_name`, `d_first_name`, `d_username`, `d_email`, `d_password`, `d_h_id`, `realm`, `credentials`, `challenges`, `emailVerified`, `verificationToken`, `status`, `created`, `lastUpdated`) VALUES
(1, 'Stark', 'Tony', 'ironman', 'stark@starkindustries.com', '$2a$10$yWWCc18pB/iYUS9OVymdfOOYWbRkDy9j8GryXipfZeqvIDRlqvygG', 1, NULL, NULL, NULL, NULL, NULL, NULL, '2017-05-24 16:24:27', '2017-05-24 16:24:27'),
(2, 'Potts', 'Pepper', 'pepper', 'ceo@starkindustries.com', '$2a$10$1u7MYrju5t7wqyJz/nGOve.od/lT9fBXtMGOdMqT1l.4o0lXVGmIq', 1, NULL, NULL, NULL, NULL, NULL, NULL, '2017-05-24 16:24:32', '2017-05-24 16:24:32'),
(3, 'Wayne', 'Bruce', 'batman', 'bruce@wayne-enterprises.com', '$2a$10$U7.FxhlWIbaOufNPaO/w.uvfViF8Hq6TT9yJWwi18krCx8hdrCesa', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2017-05-24 16:24:57', '2017-05-24 16:24:57');

INSERT INTO `e_house` (`h_id`, `h_name`, `h_address`, `h_postal_code`, `h_city`, `h_country`) VALUES
(1, NULL, '10880, Malibu Point', 90265, 'Malibu', 'US'),
(2, 'Wayne Manor', 'Crest Hill', 333, 'Gotham City', 'US');
