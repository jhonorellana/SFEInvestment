-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-03-2024 a las 23:45:39
-- Versión del servidor: 10.6.17-MariaDB-cll-lve
-- Versión de PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mecsistel_investment`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `SP_ACTUALIZAR_AMORTIZACION_INVESTMENT`$$
CREATE  PROCEDURE `SP_ACTUALIZAR_AMORTIZACION_INVESTMENT` ()   BEGIN
	update amortization
       set am_expired = 1
	   where am_expiration_date < now()
       and am_sold_date is null
	 order by id desc;

 	update investment
       set inv_paid = 1
	   where inv_expiration_date < now()
       and inv_sold_date is null
	 order by id desc;

END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_BY_ENTERPRISE`$$
CREATE  PROCEDURE `SP_AMORTIZATION_BY_ENTERPRISE` ()   BEGIN

SELECT LEFT(am_enterprise, LENGTH(am_enterprise) - 10) AS empresa,
       SUM(am_principal) AS capital
FROM amortization
WHERE DATE(am_expiration_date) >= CURDATE()  -- Condición para incluir registros del día de hoy
  AND am_enterprise NOT LIKE '%BONOS%'
  AND is_active = 1
  AND is_deleted = 0
GROUP BY empresa
ORDER BY capital DESC;

END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_BY_ENTERPRISE_OLD`$$
CREATE  PROCEDURE `SP_AMORTIZATION_BY_ENTERPRISE_OLD` ()   BEGIN

  select am_enterprise as empresa, sum(am_principal) as capital from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
  group by am_enterprise;



END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_BY_MONTH_OWNER`$$
CREATE  PROCEDURE `SP_AMORTIZATION_BY_MONTH_OWNER` (IN `_year` INT, IN `_month` INT)   BEGIN
    SELECT
        am_expiration_date AS fecha,
        am_owner AS propietario,
        LEFT(am_enterprise, LENGTH(am_enterprise) - 10) AS empresa,
        sum(am_interest) AS interes,
        sum(am_principal) AS capital,
        sum(am_interest + am_principal) AS total
    FROM amortization
    WHERE (am_expiration_date AND MONTH(am_expiration_date) = _month AND YEAR(am_expiration_date) = _year)
       -- OR (_month = 0 AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0
	GROUP by fecha, propietario, empresa

            UNION
    SELECT
        "X" AS fecha,
        "" AS propietario,
        "TOTAL" AS empresa,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE (am_expiration_date AND MONTH(am_expiration_date) = _month AND YEAR(am_expiration_date) = _year)
       -- OR (_month = 0 AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0

    ORDER BY FECHA, PROPIETARIO;


END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_BY_OWNER`$$
CREATE  PROCEDURE `SP_AMORTIZATION_BY_OWNER` ()   BEGIN

select am_owner, sum(am_principal) from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
  and is_active = 1
  and is_deleted = 0
  group by am_owner;



END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_DETAIL_BY_DATES`$$
CREATE  PROCEDURE `SP_AMORTIZATION_DETAIL_BY_DATES` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN
    SELECT
        am_purchase_date AS compra,
        am_expiration_date AS fecha,
        am_owner AS propietario,
        am_enterprise AS empresa,
        am_rate AS tasa,
        am_return AS rendimiento,
        am_interest AS interes,
        am_principal AS capital,
        am_interest + am_principal AS total
    FROM amortization
    WHERE (am_expiration_date between _initialDate and _finalDate)
       and is_active = 1
       and is_deleted = 0
        UNION
    SELECT
        "" AS compra,
        "X" AS fecha,
        "" AS propietario,
        "TOTAL" AS empresa,
        "" AS tasa,
        "" AS rendimiento,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
		 WHERE (am_expiration_date between _initialDate and _finalDate)
         and is_active = 1
         and is_deleted = 0

	ORDER BY FECHA, PROPIETARIO;


END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_DETAIL_BY_MONTH`$$
CREATE  PROCEDURE `SP_AMORTIZATION_DETAIL_BY_MONTH` (IN `_year` INT, IN `_month` INT)   BEGIN
    SELECT
        am_purchase_date AS compra,
        am_expiration_date AS fecha,
        am_owner AS propietario,
        am_enterprise AS empresa,
        am_rate AS tasa,
        am_return AS rendimiento,
        am_interest AS interes,
        am_principal AS capital,
        am_interest + am_principal AS total
    FROM amortization
    WHERE (am_expiration_date AND MONTH(am_expiration_date) = _month AND YEAR(am_expiration_date) = _year)
       -- OR (_month = 0 AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0

        UNION
    SELECT
        "" AS compra,
        "X" AS fecha,
        "" AS propietario,
        "TOTAL" AS empresa,
        "" AS tasa,
        "" AS rendimiento,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE (am_expiration_date AND MONTH(am_expiration_date) = _month AND YEAR(am_expiration_date) = _year)
       -- OR (_month = 0 AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0
	ORDER BY FECHA, PROPIETARIO;


END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_SUMMARY`$$
CREATE  PROCEDURE `SP_AMORTIZATION_SUMMARY` (IN `OPC` INT)   BEGIN
    SELECT
        YEAR(am_expiration_date) AS anio,
        CASE
            WHEN MONTH(am_expiration_date) = 1 THEN 'Enero'
            WHEN MONTH(am_expiration_date) = 2 THEN 'Febrero'
            WHEN MONTH(am_expiration_date) = 3 THEN 'Marzo'
            WHEN MONTH(am_expiration_date) = 4 THEN 'Abril'
            WHEN MONTH(am_expiration_date) = 5 THEN 'Mayo'
            WHEN MONTH(am_expiration_date) = 6 THEN 'Junio'
            WHEN MONTH(am_expiration_date) = 7 THEN 'Julio'
            WHEN MONTH(am_expiration_date) = 8 THEN 'Agosto'
            WHEN MONTH(am_expiration_date) = 9 THEN 'Septiembre'
            WHEN MONTH(am_expiration_date) = 10 THEN 'Octubre'
            WHEN MONTH(am_expiration_date) = 11 THEN 'Noviembre'
            WHEN MONTH(am_expiration_date) = 12 THEN 'Diciembre'
        END AS mes,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE am_expiration_date
       and is_active = 1
       and is_deleted = 0
    GROUP BY YEAR(am_expiration_date), MONTH(am_expiration_date)
    ORDER BY am_expiration_date;



END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_SUMMARY_BY_DATES`$$
CREATE  PROCEDURE `SP_AMORTIZATION_SUMMARY_BY_DATES` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN
    SELECT
        am_expiration_date AS fecha,
        am_owner AS propietario,
        LEFT(am_enterprise, LENGTH(am_enterprise) - 10) AS empresa,
        sum(am_interest) AS interes,
        sum(am_principal) AS capital,
        sum(am_interest + am_principal) AS total
    FROM amortization
    WHERE am_expiration_date between _initialDate and _finalDate
       and is_active = 1
       and is_deleted = 0
	GROUP by fecha, propietario, empresa

            UNION
    SELECT
        "X" AS fecha,
        "" AS propietario,
        "TOTAL" AS empresa,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE am_expiration_date between _initialDate and _finalDate
       and is_active = 1
       and is_deleted = 0

    ORDER BY FECHA, PROPIETARIO;


END$$

DROP PROCEDURE IF EXISTS `SP_AMORTIZATION_SUMMARY_BY_MONTH`$$
CREATE  PROCEDURE `SP_AMORTIZATION_SUMMARY_BY_MONTH` (IN `OPC` INT, IN `_year` INT, IN `_month` INT)   BEGIN
    SELECT
        YEAR(am_expiration_date) AS anio,
        CASE
            WHEN MONTH(am_expiration_date) = 1 THEN 'Enero'
            WHEN MONTH(am_expiration_date) = 2 THEN 'Febrero'
            WHEN MONTH(am_expiration_date) = 3 THEN 'Marzo'
            WHEN MONTH(am_expiration_date) = 4 THEN 'Abril'
            WHEN MONTH(am_expiration_date) = 5 THEN 'Mayo'
            WHEN MONTH(am_expiration_date) = 6 THEN 'Junio'
            WHEN MONTH(am_expiration_date) = 7 THEN 'Julio'
            WHEN MONTH(am_expiration_date) = 8 THEN 'Agosto'
            WHEN MONTH(am_expiration_date) = 9 THEN 'Septiembre'
            WHEN MONTH(am_expiration_date) = 10 THEN 'Octubre'
            WHEN MONTH(am_expiration_date) = 11 THEN 'Noviembre'
            WHEN MONTH(am_expiration_date) = 12 THEN 'Diciembre'
        END AS mes,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE (am_expiration_date AND MONTH(am_expiration_date) = _month AND YEAR(am_expiration_date) = _year)
       OR (_month = 0 AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0
    GROUP BY YEAR(am_expiration_date), MONTH(am_expiration_date)
    UNION
    SELECT
        _year AS anio,
        'TOTAL' AS mes,
        SUM(am_interest) AS interes,
        SUM(am_principal) AS capital,
        SUM(am_interest) + SUM(am_principal) AS total
    FROM amortization
    WHERE (am_expiration_date AND YEAR(am_expiration_date) = _year)
       and is_active = 1
       and is_deleted = 0  ;

END$$

DROP PROCEDURE IF EXISTS `SP_BALANCE`$$
CREATE  PROCEDURE `SP_BALANCE` (IN `initial_date` VARCHAR(10), IN `final_date` VARCHAR(10))   BEGIN

/*
    DECLARE initial_date DATE;
    DECLARE final_date DATE;
  delete from balance;


  	SET @fecha1 = SUBSTRING_INDEX(initial_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET initial_date =  STR_TO_DATE(@fecha2, '%b %d %Y');

	SET @fecha1 = SUBSTRING_INDEX(final_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET final_date =  STR_TO_DATE(@fecha2, '%b %d %Y');
*/

    delete from balance;

  insert into balance select 'Intereses esperados en el período escogido', sum(am_interest) from amortization where am_expiration_date > (initial_date) and am_expiration_date <= final_date and is_active = 1
       and is_deleted = 0  ;
  insert into balance select 'Capital inversiones más bonos de vencimiento próximo', sum(am_principal) as capital from amortization where am_expiration_date > initial_date and is_active = 1
       and is_deleted = 0  ;
  insert into balance select 'Capital bonos excepto los de vencimiento próximo', sum(inv_principal) from investment where is_active=1 and is_deleted=0 and inv_type = 4 and inv_expiration_date > initial_date and id not in (175, 144, 201, 205, 206);
  insert into balance select ov_description, ov_value from othervalue;
  select description as detalle, value as valor from balance
  union
  select 'TOTAL' as detalle, sum(value) as valor from balance;

END$$

DROP PROCEDURE IF EXISTS `SP_BALANCE_old`$$
CREATE  PROCEDURE `SP_BALANCE_old` (IN `initial_date` DATE, IN `final_date` DATE)   BEGIN
  delete from balance;
  insert into balance select 'Intereses esperados en el período escogido', sum(am_interest) from amortization where am_expiration_date >= (initial_date) and am_expiration_date <= final_date;
  insert into balance select 'Capital inversiones más bonos de vencimiento próximo', sum(am_principal) as capital from amortization where am_expiration_date > initial_date;
  insert into balance select 'Capital bonos excepto los de vencimiento próximo', sum(inv_principal) from investment where is_active=1 and inv_type = 4 and inv_id not in (175, 144);
  insert into balance select ov_description, ov_value from othervalue;
  select description as detalle, value as valor from balance
  union
  select 'TOTAL' as detalle, sum(value) as valor from balance;

END$$

DROP PROCEDURE IF EXISTS `SP_BALANCE_old2`$$
CREATE  PROCEDURE `SP_BALANCE_old2` (IN `initial_date_str` VARCHAR(200), IN `final_date_str` VARCHAR(200))   BEGIN

    DECLARE initial_date DATE;
    DECLARE final_date DATE;
  delete from balance;


  	SET @fecha1 = SUBSTRING_INDEX(initial_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET initial_date =  STR_TO_DATE(@fecha2, '%b %d %Y');

	SET @fecha1 = SUBSTRING_INDEX(final_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET final_date =  STR_TO_DATE(@fecha2, '%b %d %Y');



  insert into balance select 'Intereses esperados en el período escogido', sum(am_interest) from amortization where am_expiration_date >= (initial_date) and am_expiration_date <= final_date;
  insert into balance select 'Capital inversiones más bonos de vencimiento próximo', sum(am_principal) as capital from amortization where am_expiration_date > initial_date;
  insert into balance select 'Capital bonos excepto los de vencimiento próximo', sum(inv_principal) from investment where is_active=1 and inv_type = 4 and inv_id not in (175, 144);
  insert into balance select ov_description, ov_value from othervalue;
  select description as detalle, value as valor from balance
  union
  select 'TOTAL' as detalle, sum(value) as valor from balance;

END$$

DROP PROCEDURE IF EXISTS `SP_BONDHIS_SELECT`$$
CREATE  PROCEDURE `SP_BONDHIS_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN

SELECT
	`bond_his`.`id` as id,
    `bond_his`.`FECHA` as fecha,
    `bond_his`.`DECRETO` as decreto,
    `bond_his`.`PRECIO_PORC` as precio_porc,
    `bond_his`.`RENDIMIENTO_PORC` as rendimiento,
    `bond_his`.`PLAZO_POR_VENCER` as dias_por_vencer,
     ROUND(plazo_por_vencer / 360, 2) AS anios_por_vencer,
    `bond_his`.`TASA_INTERES` as tasa_interes,
    `bond_his`.`VALOR_NOMINAL` as valor_nominal,
    `bond_his`.`VALOR_EFECTIVO` as valor_efectivo,
    `bond_his`.`FECHA_EMISION` as fecha_emision,
    `bond_his`.`FECHA_VENCIMIENTO` as fecha_vencimiento,
    `bond_his`.`PROCEDENCIA` as procedencia,
    `bond_his`.`TIPO` as tipo,
    `bond_his`.`TIPO_MERCADO_1` as tipo_mercado
FROM `bond_his`
WHERE (FECHA between _initialDate and _finalDate) or (FECHA=_initialDate)
ORDER BY rendimiento_porc desc;


END$$

DROP PROCEDURE IF EXISTS `SP_BOND_AMORTIZATION_CREATION`$$
CREATE  PROCEDURE `SP_BOND_AMORTIZATION_CREATION` (IN `_inv_purchase_date` DATE, IN `_inv_expiration_date` DATE, IN `_inv_owner` VARCHAR(20), IN `_inv_enterprise` VARCHAR(100), IN `_inv_rate` DECIMAL(8,2), IN `_inv_return` DECIMAL(8,2), IN `_inv_principal` DECIMAL(8,2), IN `_inv_monthly_interest` DECIMAL(8,2), IN `_inv_previous_interest` DECIMAL(8,2), IN `_inv_first_date` DATE)   BEGIN
  DECLARE _inv_type INT;
  DECLARE _inv_months INT;
  DECLARE _inv_days INT;
--  DECLARE _inv_sold INT;
  DECLARE _is_active INT;
  DECLARE _inv_retention INT;
  -- DECLARE _inv_return DECIMAL(8,2); -- Declarar la variable
  -- DECLARE _inv_principal DECIMAL(8,2); -- Declarar la variable
  DECLARE _inv_id INT;

  SET _inv_type = 4;
  SET _inv_months = 0;
  SET _inv_days = 0;
--  SET _inv_sold = 0;
  SET _is_active = 1;
  SET _inv_retention = 0;


  -- INSERT con variables correctas
  INSERT INTO `investment`
    (`inv_type`, `inv_purchase_date`, `inv_expiration_date`, `inv_owner`, `inv_enterprise`,
     `inv_months`, `inv_days`, `inv_rate`, `inv_return`, `inv_principal`, `inv_retention`,
     -- `inv_sold`,
     `is_active`)
  VALUES
    (_inv_type, _inv_purchase_date, _inv_expiration_date, _inv_owner, _inv_enterprise,
     _inv_months, _inv_days, _inv_rate, _inv_return, _inv_principal, _inv_retention,
     -- _inv_sold,
     _is_active);

SELECT MAX(id) INTO _inv_id FROM investment;

     -- diciembre
INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date,_inv_first_date, _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest - _inv_previous_interest, _inv_previous_interest,0, _inv_monthly_interest - _inv_previous_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 1 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 2 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 3 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 4 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 5 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 6 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 7 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 8 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 9 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 10 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);


INSERT INTO `amortization`
(
`inv_id`, `am_purchase_date`, `am_expiration_date`, `am_owner`, `am_enterprise`,
`am_months`, `am_days`, `am_rate`, `am_return`, `am_interest`, `am_principal`, `am_retention`,
`am_interest_total`)
values(
 _inv_id,_inv_purchase_date, date_add(_inv_first_date, interval 11 month), _inv_owner,_inv_enterprise,
_inv_months, _inv_days, _inv_rate, _inv_return, _inv_monthly_interest, 0,0, _inv_monthly_interest);







END$$

DROP PROCEDURE IF EXISTS `SP_BOND_BY_OWNER`$$
CREATE  PROCEDURE `SP_BOND_BY_OWNER` ()   BEGIN

select inv_owner, sum(inv_principal)  from investment where inv_type = 4 and is_active = 1 group by inv_owner;

END$$

DROP PROCEDURE IF EXISTS `SP_BOND_HIS_SUMMARY`$$
CREATE  PROCEDURE `SP_BOND_HIS_SUMMARY` (IN `p_year` INT)   BEGIN


  IF p_year <> 0 THEN
    SELECT FECHA AS fecha,
           ROUND(MIN(RENDIMIENTO_PORC),2) AS min_rendimiento,
		   ROUND(AVG(RENDIMIENTO_PORC),2) AS media_rendimiento,
           ROUND(MAX(RENDIMIENTO_PORC),2) AS max_rendimiento
    FROM BOND_HIS
    WHERE YEAR(FECHA) = p_year
    GROUP BY FECHA
    ORDER BY FECHA;
  END IF;

/*
  IF p_year = 0 THEN
    SELECT SHA_DATE AS fecha,
           SHA_ISSUER AS emisor,
           SUM(SHA_NUMBER) AS cantidad,
           ROUND(SUM(SHA_CASH_VALUE),2) AS valor,
           ROUND(SUM(SHA_CASH_VALUE) / SUM(SHA_NUMBER),2) AS precio,
           COUNT(*) AS transacciones
    FROM SHARES
    WHERE SHA_ISSUER_ID = p_issuer
    GROUP BY SHA_DATE
    ORDER BY SHA_DATE;
  END IF;
*/
END$$

DROP PROCEDURE IF EXISTS `SP_BONOS`$$
CREATE  PROCEDURE `SP_BONOS` ()   BEGIN


    SELECT
    `bonos`.`propietario`,
    `bonos`.`fechaCompra`,
    `bonos`.`fechaPrimerPago`,
    `bonos`.`fechaEmision`,
    `bonos`.`fechaVencimiento`,
    `bonos`.`tasaMensual`,
    `bonos`.`tasaMensualReal`,
    `bonos`.`rendimiento`,
    `bonos`.`interesMensual`,
    `bonos`.`interesPrimerMes`,
    `bonos`.`valorNominal`,
    `bonos`.`precioComprado`,
    `bonos`.`precioNetoComprado`,
    `bonos`.`valorSinComision`,
    `bonos`.`valorConComision`,
    `bonos`.`pagado`,
    `bonos`.`interesAcumuladoPrevio`,
    `bonos`.`comisionCasa`,
    `bonos`.`comisionBolsa`,
    `bonos`.`totalComisiones`
FROM `bonos`

UNION

SELECT
    '' AS propietario,
    '' AS fechaCompra,
    '' AS fechaPrimerPago,
    '' AS fechaEmision,
    'TOTAL' AS fechaVencimiento,
    '' AS tasaMensual,
    '' AS tasaMensualReal,
    '' AS rendimiento,
    sum(interesMensual) AS interesMensual,
    '' AS interesPrimerMes,
    sum(valorNominal) as valorNominal,
    '' AS precioComprado,
    '' AS precioNetoComprado,
    sum(valorSinComision) AS valorSinComision,
    sum(valorConComision) AS valorConComision,
    sum(pagado) AS pagado,
    sum(interesAcumuladoPrevio) AS interesAcumuladoPrevio,
    sum(comisionCasa) AS comisionCasa,
    sum(comisionBolsa) AS comisionBolsa,
    sum(totalComisiones) AS totalComisiones
FROM `bonos`
order by fechaVencimiento, propietario;




END$$

DROP PROCEDURE IF EXISTS `SP_BONOSHIS_RESUMEN_CREATION`$$
CREATE  PROCEDURE `SP_BONOSHIS_RESUMEN_CREATION` ()   BEGIN

-- drop table bonos_temp;

CREATE TABLE `bonos_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `anios` int(11) DEFAULT NULL,
  `rendimiento` decimal(8,2) DEFAULT NULL,
  `tasa` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO bonos_temp (fecha, anios, rendimiento, tasa)
SELECT FECHA as fecha, ROUND (PLAZO_POR_VENCER / 360) AS anios,
       round(AVG(RENDIMIENTO_PORC),2) as rendimiento,
       round(AVG(TASA_INTERES),2) as tasa
       FROM bond_his
GROUP BY FECHA, ANIOS
ORDER BY FECHA, ANIOS;


-- drop table `bonos_resumen`;

CREATE TABLE `bonos_resumen` (
  `fecha` date DEFAULT NULL,
  `anios_0` int(11) DEFAULT NULL,
  `rendimiento_0` decimal(8,2) DEFAULT NULL,
  `tasa_0` decimal(8,2) DEFAULT NULL,
  `anios_1` int(11) DEFAULT NULL,
  `rendimiento_1` decimal(8,2) DEFAULT NULL,
  `tasa_1` decimal(8,2) DEFAULT NULL,
  `anios_2` int(11) DEFAULT NULL,
  `rendimiento_2` decimal(8,2) DEFAULT NULL,
  `tasa_2` decimal(8,2) DEFAULT NULL,
  `anios_3` int(11) DEFAULT NULL,
  `rendimiento_3` decimal(8,2) DEFAULT NULL,
  `tasa_3` decimal(8,2) DEFAULT NULL,
  `anios_4` int(11) DEFAULT NULL,
  `rendimiento_4` decimal(8,2) DEFAULT NULL,
  `tasa_4` decimal(8,2) DEFAULT NULL,
  `anios_5` int(11) DEFAULT NULL,
  `rendimiento_5` decimal(8,2) DEFAULT NULL,
  `tasa_5` decimal(8,2) DEFAULT NULL,
  `anios_6` int(11) DEFAULT NULL,
  `rendimiento_6` decimal(8,2) DEFAULT NULL,
  `tasa_6` decimal(8,2) DEFAULT NULL,
  `anios_7` int(11) DEFAULT NULL,
  `rendimiento_7` decimal(8,2) DEFAULT NULL,
  `tasa_7` decimal(8,2) DEFAULT NULL,
  `anios_8` int(11) DEFAULT NULL,
  `rendimiento_8` decimal(8,2) DEFAULT NULL,
  `tasa_8` decimal(8,2) DEFAULT NULL,
  `anios_9` int(11) DEFAULT NULL,
  `rendimiento_9` decimal(8,2) DEFAULT NULL,
  `tasa_9` decimal(8,2) DEFAULT NULL,
  `anios_10` int(11) DEFAULT NULL,
  `rendimiento_10` decimal(8,2) DEFAULT NULL,
  `tasa_10` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



insert into bonos_resumen (fecha)
select distinct(fecha) from bond_his;

-- select * from bonos_resumen;

UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_0 = T.anios,
    R.rendimiento_0 = T.rendimiento,
    R.tasa_0 = T.tasa
WHERE T.anios = 0;


UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_1 = T.anios,
    R.rendimiento_1 = T.rendimiento,
    R.tasa_1 = T.tasa
WHERE T.anios = 1;



UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_2 = T.anios,
    R.rendimiento_2 = T.rendimiento,
    R.tasa_2 = T.tasa
WHERE T.anios = 2;




UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_3 = T.anios,
    R.rendimiento_3 = T.rendimiento,
    R.tasa_3 = T.tasa
WHERE T.anios = 3;



UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_4 = T.anios,
    R.rendimiento_4 = T.rendimiento,
    R.tasa_4 = T.tasa
WHERE T.anios = 4;



UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_5 = T.anios,
    R.rendimiento_5 = T.rendimiento,
    R.tasa_5 = T.tasa
WHERE T.anios = 5;


UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_6 = T.anios,
    R.rendimiento_6 = T.rendimiento,
    R.tasa_6 = T.tasa
WHERE T.anios = 6;


UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_7 = T.anios,
    R.rendimiento_7 = T.rendimiento,
    R.tasa_7 = T.tasa
WHERE T.anios = 7;



UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_8 = T.anios,
    R.rendimiento_8 = T.rendimiento,
    R.tasa_8 = T.tasa
WHERE T.anios = 8;




UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_9 = T.anios,
    R.rendimiento_9 = T.rendimiento,
    R.tasa_9 = T.tasa
WHERE T.anios = 9;


UPDATE bonos_resumen R
JOIN bonos_temp T ON R.fecha = T.fecha
SET R.anios_10 = T.anios,
    R.rendimiento_10 = T.rendimiento,
    R.tasa_10 = T.tasa
WHERE T.anios = 10;






UPDATE bonos_resumen
SET
    rendimiento_0 = (SELECT AVG(rendimiento_0) FROM bonos_resumen WHERE anios_0 IS not NULL),
    tasa_0 = (SELECT AVG(tasa_0) FROM bonos_resumen WHERE anios_0 IS not NULL)
WHERE anios_0 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_1 = (SELECT AVG(rendimiento_1) FROM bonos_resumen WHERE anios_1 IS not NULL),
    tasa_1 = (SELECT AVG(tasa_1) FROM bonos_resumen WHERE anios_1 IS not NULL)
WHERE anios_1 IS NULL;

UPDATE bonos_resumen
SET
    rendimiento_2 = (SELECT AVG(rendimiento_2) FROM bonos_resumen WHERE anios_2 IS not NULL),
    tasa_2 = (SELECT AVG(tasa_2) FROM bonos_resumen WHERE anios_2 IS not NULL)
WHERE anios_2 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_3 = (SELECT AVG(rendimiento_3) FROM bonos_resumen WHERE anios_3 IS not NULL),
    tasa_3 = (SELECT AVG(tasa_3) FROM bonos_resumen WHERE anios_3 IS not NULL)
WHERE anios_3 IS NULL;



UPDATE bonos_resumen
SET
    rendimiento_4 = (SELECT AVG(rendimiento_4) FROM bonos_resumen WHERE anios_4 IS not NULL),
    tasa_4 = (SELECT AVG(tasa_4) FROM bonos_resumen WHERE anios_4 IS not NULL)
WHERE anios_4 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_5 = (SELECT AVG(rendimiento_5) FROM bonos_resumen WHERE anios_5 IS not NULL),
    tasa_5 = (SELECT AVG(tasa_5) FROM bonos_resumen WHERE anios_5 IS not NULL)
WHERE anios_5 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_6 = (SELECT AVG(rendimiento_6) FROM bonos_resumen WHERE anios_6 IS not NULL),
    tasa_6 = (SELECT AVG(tasa_6) FROM bonos_resumen WHERE anios_6 IS not NULL)
WHERE anios_6 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_7 = (SELECT AVG(rendimiento_7) FROM bonos_resumen WHERE anios_7 IS not NULL),
    tasa_7 = (SELECT AVG(tasa_7) FROM bonos_resumen WHERE anios_7 IS not NULL)
WHERE anios_7 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_8 = (SELECT AVG(rendimiento_8) FROM bonos_resumen WHERE anios_8 IS not NULL),
    tasa_8 = (SELECT AVG(tasa_8) FROM bonos_resumen WHERE anios_8 IS not NULL)
WHERE anios_8 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_9 = (SELECT AVG(rendimiento_9) FROM bonos_resumen WHERE anios_9 IS not NULL),
    tasa_9 = (SELECT AVG(tasa_9) FROM bonos_resumen WHERE anios_9 IS not NULL)
WHERE anios_9 IS NULL;


UPDATE bonos_resumen
SET
    rendimiento_10 = (SELECT AVG(rendimiento_10) FROM bonos_resumen WHERE anios_10 IS not NULL),
    tasa_10 = (SELECT AVG(tasa_10) FROM bonos_resumen WHERE anios_10 IS not NULL)
WHERE anios_10 IS NULL;


END$$

DROP PROCEDURE IF EXISTS `SP_BONOSHIS_RESUMEN_SELECT`$$
CREATE  PROCEDURE `SP_BONOSHIS_RESUMEN_SELECT` ()   BEGIN


SELECT `bonos_resumen`.`fecha`,
    `bonos_resumen`.`rendimiento_0`,
    `bonos_resumen`.`rendimiento_1`,
    `bonos_resumen`.`rendimiento_2`,
    `bonos_resumen`.`rendimiento_3`,
    `bonos_resumen`.`rendimiento_4`,
    `bonos_resumen`.`rendimiento_5`,
    `bonos_resumen`.`rendimiento_6`,
    `bonos_resumen`.`rendimiento_7`,
    `bonos_resumen`.`rendimiento_8`,
    `bonos_resumen`.`rendimiento_9`,
    `bonos_resumen`.`rendimiento_10`,
	`bonos_resumen`.`tasa_0`,
    `bonos_resumen`.`tasa_1`,
    `bonos_resumen`.`tasa_2`,
    `bonos_resumen`.`tasa_3`,
    `bonos_resumen`.`tasa_4`,
    `bonos_resumen`.`tasa_5`,
    `bonos_resumen`.`tasa_6`,
    `bonos_resumen`.`tasa_7`,
    `bonos_resumen`.`tasa_8`,
    `bonos_resumen`.`tasa_9`,
    `bonos_resumen`.`tasa_10`
FROM `bonos_resumen`
where year(fecha) >= 2020
-- where year(fecha) = 2024
;

END$$

DROP PROCEDURE IF EXISTS `SP_BONOS_INVERTIDO_RENDIMIENTO`$$
CREATE  PROCEDURE `SP_BONOS_INVERTIDO_RENDIMIENTO` ()   select sum(pagado) as invertido, rendimiento from bonos
where is_active = 1 and is_deleted = 0 and fechaVencimiento > now()
group by rendimiento order by rendimiento desc$$

DROP PROCEDURE IF EXISTS `SP_BONOS_INVERTIDO_VENCIMIENTO`$$
CREATE  PROCEDURE `SP_BONOS_INVERTIDO_VENCIMIENTO` ()   select sum(pagado) as invertido, year(fechaVencimiento) as anioVencimiento from bonos
where is_active = 1 and is_deleted = 0 and fechaVencimiento > now()
group by anioVencimiento order by anioVencimiento desc$$

DROP PROCEDURE IF EXISTS `SP_FACTURASHIS_SELECT`$$
CREATE  PROCEDURE `SP_FACTURASHIS_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN

SELECT `facturas_his`.`id`,
    `facturas_his`.`FECHA` as fecha,
    `facturas_his`.`EMISOR` as emisor,
    `facturas_his`.`PRECIO_PORC` as precio_porc,
    `facturas_his`.`VALOR_NOMINAL` as valornominal,
    `facturas_his`.`VALOR_EFECTIVO` as valorefectivo,
    `facturas_his`.`EMISION` as emision,
    `facturas_his`.`VENCIMIENTO` as vencimiento,
    `facturas_his`.`RENDIMIENTO` as rendimiento,
    `facturas_his`.`PROCEDENCIA` as procedencia,
    `facturas_his`.`OBSERVACIONES` as observaciones
FROM `facturas_his`
 WHERE (FECHA between _initialDate and _finalDate) or (FECHA=_initialDate)
ORDER BY rendimiento desc;


END$$

DROP PROCEDURE IF EXISTS `SP_GENERICOSHIS_SELECT`$$
CREATE  PROCEDURE `SP_GENERICOSHIS_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN

SELECT
    `genericos_his`.`id` as id,
    `genericos_his`.`FECHA` as fecha,
    `genericos_his`.`EMISOR` as emisor,
    `genericos_his`.`PRECIO_PORC` as precio_porc,
    `genericos_his`.`RENDIMIENTO` as rendimiento,
    `genericos_his`.`PLAZO_DIAS` as plazo_dias,
     plazo_dias / 360 as plazo_anios,
    `genericos_his`.`INTERES` as interes,
    `genericos_his`.`VALOR_NOMINAL` as valornominal,
    `genericos_his`.`VALOR_EFECTIVO` as valorefectivo,
    `genericos_his`.`EMISION` as emision,
    `genericos_his`.`VENCIMIENTO` as vencimiento,
    `genericos_his`.`PROCEDENCIA` as procedencia,
    `genericos_his`.`TITULO` as titulo,
    `genericos_his`.`MERCADO` as mercado
FROM `genericos_his`
 WHERE (FECHA between _initialDate and _finalDate) or (FECHA=_initialDate)
ORDER BY rendimiento desc;


END$$

DROP PROCEDURE IF EXISTS `SP_INVERSION`$$
CREATE  PROCEDURE `SP_INVERSION` ()   SELECT `id` AS id,
    `inv_type` as Tipo,
    `inv_purchase_date` as FechaCompra,
    `inv_expiration_date` as FechaVencimiento,
    `inv_owner` as Propietario,
    `inv_enterprise` as Empresa,
    `inv_rate` as TasaInteres,
    `inv_return` as Rendimiento,
    `inv_principal` as Capital,
    `inv_retention` as Retencion,
    `inv_paid` as Pagado,
    `inv_expired` as Expirado,
    `is_active` as Activo
FROM `investment`
ORDER BY id DESC$$

DROP PROCEDURE IF EXISTS `SP_INVERTIDO_RENDIMIENTO`$$
CREATE  PROCEDURE `SP_INVERTIDO_RENDIMIENTO` (IN `_type` VARCHAR(20))   BEGIN
	IF _type = 'BONO'  then
			SELECT SUM(pagado) AS invertido, rendimiento
			FROM bonos
			WHERE is_active = 1 AND is_deleted = 0 AND fechaVencimiento > NOW()
			GROUP BY rendimiento
			ORDER BY rendimiento DESC;
	END IF;
	IF _type = 'INVERSIONES' then
			SELECT SUM(A.am_principal) AS invertido, A.am_return AS rendimiento
			FROM amortization A
			JOIN investment I ON A.inv_id = I.id
			WHERE A.is_active = 1 AND A.is_deleted = 0 AND A.am_expiration_date > NOW()
			  AND I.is_active = 1 AND I.is_deleted = 0 AND I.inv_expiration_date > NOW()
			  AND I.inv_type <> 4
			GROUP BY A.am_return
			ORDER BY A.am_return DESC;
	END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_INVERTIDO_VENCIMIENTO`$$
CREATE  PROCEDURE `SP_INVERTIDO_VENCIMIENTO` (IN `_type` VARCHAR(25))   BEGIN
    IF _type = 'BONO' THEN
        SELECT SUM(pagado) AS invertido, CAST(YEAR(fechaVencimiento) AS CHAR) AS anioVencimiento
        FROM bonos
        WHERE is_active = 1 AND is_deleted = 0 AND fechaVencimiento > NOW()
        GROUP BY anioVencimiento
        ORDER BY invertido DESC;
    END IF;

    IF _type = 'INVERSIONES' THEN
        SELECT SUM(A.am_principal) AS invertido, CAST(YEAR(A.am_expiration_date) AS CHAR) AS anioVencimiento
        FROM amortization A
        JOIN investment I ON A.inv_id = I.id
        WHERE A.is_active = 1 AND A.is_deleted = 0 AND A.am_expiration_date > NOW()
            AND I.is_active = 1 AND I.is_deleted = 0 AND I.inv_expiration_date > NOW()
            AND I.inv_type <> 4
        GROUP BY anioVencimiento
        ORDER BY invertido DESC;
    END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_INVESTMENT_BY_OWNER`$$
CREATE  PROCEDURE `SP_INVESTMENT_BY_OWNER` ()   BEGIN

select 'BONO' as tipo, inv_owner as propietario, sum(inv_principal) as capital  from investment where inv_type = 4 and is_active = 1 group by inv_owner

union

select 'OTRAS INVERSIONES', am_owner as propietario, sum(am_principal) as capital from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
  and is_active = 1
  and is_deleted = 0
  group by am_owner;


END$$

DROP PROCEDURE IF EXISTS `SP_INVESTMENT_BY_OWNERNEW`$$
CREATE  PROCEDURE `SP_INVESTMENT_BY_OWNERNEW` ()   BEGIN

select concat('BONOS - ', inv_owner) as inversionpropietario, sum(inv_principal) as capital from investment where inv_type = 4 and is_active = 1 and is_deleted = 0 group by inv_owner
union
select CONCAT('INVERSIONES - ', am_owner) as inversionpropietario, sum(am_principal) as capital from amortization
where
    am_expiration_date > NOW()
    and am_enterprise not like '%BONOS%'
    and am_enterprise not like '%BRIK%'
    and is_active = 1
    and is_deleted = 0
    group by am_owner

union
select CONCAT('ACCIONES - ', am_owner) as inversionpropietario, sum(am_principal) as capital from amortization
where
    am_expiration_date > NOW()
    and am_enterprise not like '%BONOS%'
    and am_enterprise like '%BRIK%'
    and is_active = 1
    and is_deleted = 0
    group by am_owner;


END$$

DROP PROCEDURE IF EXISTS `SP_INVESTMENT_BY_OWNER_TOTAL`$$
CREATE  PROCEDURE `SP_INVESTMENT_BY_OWNER_TOTAL` (IN `TOTAL_STR` VARCHAR(10))   BEGIN

  CREATE TEMPORARY TABLE INVESTMENT_BY_OWNER_TEMP (
    tipo VARCHAR(45) NOT NULL,
    propietario VARCHAR(45) NOT NULL,
    capital DECIMAL(8,2) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  INSERT INTO INVESTMENT_BY_OWNER_TEMP
  SELECT 'BONO' AS tipo, inv_owner AS propietario, SUM(inv_principal) AS capital
  FROM investment
  WHERE inv_type = 4 AND is_active = 1
  GROUP BY inv_owner
  UNION
  SELECT 'OTRAS INVERSIONES' AS tipo, am_owner AS propietario, SUM(am_principal) AS capital
  FROM amortization
  WHERE am_expiration_date > NOW() AND am_enterprise NOT LIKE '%BONOS%'
        and is_active = 1
        and is_deleted = 0
  GROUP BY am_owner;

  IF TOTAL_STR = 'NO' THEN
    SELECT tipo, propietario, capital FROM INVESTMENT_BY_OWNER_TEMP;
  ELSE
    SELECT tipo, propietario, capital FROM INVESTMENT_BY_OWNER_TEMP
    UNION
    SELECT '' AS tipo, 'TOTAL' AS propietario, SUM(capital) AS capital FROM INVESTMENT_BY_OWNER_TEMP;
  END IF;

  DROP TEMPORARY TABLE IF EXISTS INVESTMENT_BY_OWNER_TEMP;



END$$

DROP PROCEDURE IF EXISTS `SP_INVEST_INVERTIDO_RENDIMIENTO`$$
CREATE  PROCEDURE `SP_INVEST_INVERTIDO_RENDIMIENTO` ()   SELECT sum(A.am_principal) invertido, A.am_return as rendimiento
 FROM amortization A, investment I
where A.is_active = 1 and A.is_deleted = 0 and A.am_expiration_date > now()
      and I.is_active = 1 and I.is_deleted = 0 and I.inv_expiration_date > now()
      and A.inv_id = I.inv_id
      and inv_type <> 4
group by rendimiento order by rendimiento desc$$

DROP PROCEDURE IF EXISTS `SP_INVEST_INVERTIDO_VENCIMIENTO`$$
CREATE  PROCEDURE `SP_INVEST_INVERTIDO_VENCIMIENTO` ()   SELECT sum(A.am_principal) invertido, year(A.am_expiration_date) as anioVencimiento
 FROM amortization A, investment I
where A.is_active = 1 and A.is_deleted = 0 and A.am_expiration_date > now()
      and I.is_active = 1 and I.is_deleted = 0 and I.inv_expiration_date > now()
      and A.inv_id = I.inv_id
      and inv_type <> 4
group by anioVencimiento order by anioVencimiento desc$$

DROP PROCEDURE IF EXISTS `SP_INVEST_VS_BOND`$$
CREATE  PROCEDURE `SP_INVEST_VS_BOND` ()   BEGIN
CREATE TABLE `ownercapital_003` (
  `owner` varchar(45) NOT NULL,
  `capital` decimal(8,2) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


insert into ownercapital_003 select inv_owner, sum(inv_principal), 'BONOS' from investment where inv_type = 4 and is_active = 1 group by inv_owner;
insert into ownercapital_003 select am_owner, sum(am_principal), 'INVERSIONES' from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
         and is_active = 1
         and is_deleted = 0
         and am_enterprise not like '%BRIKAPITAL%'
  group by am_owner;

insert into ownercapital_003 select am_owner, sum(am_principal), 'ACCIONES' from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
         and is_active = 1
         and is_deleted = 0
         and am_enterprise like '%BRIKAPITAL%'
  group by am_owner;



select type as tipo , sum(capital) as capital from ownercapital_003 where type like '%INVERSIONES%'
union
select type as tipo, sum(capital) as capital from ownercapital_003 where type like '%BONOS%'
union
select type as tipo, sum(capital) as capital from ownercapital_003 where type like '%ACCIONES%';


DROP TABLE ownercapital_003;

END$$

DROP PROCEDURE IF EXISTS `SP_OBLIGACIONESHIS_SELECT`$$
CREATE  PROCEDURE `SP_OBLIGACIONESHIS_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN

SELECT
    `obligaciones_his`.`id`,
    `obligaciones_his`.`FECHA` as fecha,
    `obligaciones_his`.`EMISOR` as emisor,
    `obligaciones_his`.`PRECIO_PORC` as precio_porc,
    `obligaciones_his`.`RENDIMIENTO` as rendimiento,
    `obligaciones_his`.`PLAZO_DIAS` as plazo_dias,
    plazo_dias / 360 as plazo_anios,
    `obligaciones_his`.`INTERES` as interes,
    `obligaciones_his`.`VALOR_NOMINAL` as valornominal,
    `obligaciones_his`.`VALOR_EFECTIVO` as valorefectivo,
    `obligaciones_his`.`EMISION` as emision,
    `obligaciones_his`.`VENCIMIENTO` as vencimiento,
    `obligaciones_his`.`PROCEDENCIA` as procedencia,
    `obligaciones_his`.`TIPO_MERCADO` as mercado
FROM `obligaciones_his`
WHERE (FECHA between _initialDate and _finalDate) or (FECHA=_initialDate)
ORDER BY rendimiento desc;


END$$

DROP PROCEDURE IF EXISTS `SP_OTHERVALUE`$$
CREATE  PROCEDURE `SP_OTHERVALUE` ()   BEGIN
SELECT `othervalue`.`id` as id,
    `othervalue`.`ov_description` as Descripcion,
    `othervalue`.`ov_value` as Valor ,
    `othervalue`.`is_active` as Activo
FROM `othervalue`;
END$$

DROP PROCEDURE IF EXISTS `SP_OTHER_INVESTMENT_DETAIL`$$
CREATE  PROCEDURE `SP_OTHER_INVESTMENT_DETAIL` ()   BEGIN

 CREATE TABLE `other_investment_temp` (
  `fechaExpiracion` date NOT NULL,
  `empresa` varchar(60) NOT NULL,
  `propietario` varchar(60) NOT NULL,
  `tasa` decimal(8,2) DEFAULT NULL,
  `rendimiento` decimal(8,2) DEFAULT NULL,
  `capital` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



  insert into other_investment_temp select  RIGHT(am_enterprise, 10) as fechaExpiracion, LEFT(am_enterprise, LENGTH(am_enterprise) - 10) as empresa, am_owner as propietario, am_rate as tasa, am_return as rendimiento, sum(am_principal) as capital from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
         and is_active = 1
       and is_deleted = 0
  group by empresa, fechaExpiracion, am_owner
  order by fechaExpiracion ;

  select * from other_investment_temp
  union
  select 'X' as fechaExpiracion, '' as empresa, 'TOTAL' as propietario, '' as tasa, '' as rendimiento, sum(capital) as capital from other_investment_temp;

  DROP TABLE `other_investment_temp`;

END$$

DROP PROCEDURE IF EXISTS `SP_PAPELESHIS_SELECT`$$
CREATE  PROCEDURE `SP_PAPELESHIS_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN

SELECT `papeles_his`.`id`,
    `papeles_his`.`FECHA` as fecha,
    `papeles_his`.`EMISOR` as emisor,
    `papeles_his`.`PRECIO_PORC` as precio_porc,
    `papeles_his`.`RENDIMIENTO` as rendimiento,
    `papeles_his`.`PLAZO_DIAS` as plazo_dias,
     PLAZO_DIAS / 360 as plazo_anios,
    `papeles_his`.`DESCUENTO_PORC` as descuento_porc,
    `papeles_his`.`INTERES` as interes,
    `papeles_his`.`VALOR_NOMINAL` as valornominal,
    `papeles_his`.`VALOR_EFECTIVO` as valorefectivo,
    `papeles_his`.`EMISION` as emision,
    `papeles_his`.`VENCIMIENTO` as vencimiento,
    `papeles_his`.`PROCEDENCIA` as procedencia,
    `papeles_his`.`MERCADO` as mercado
FROM `papeles_his`
WHERE (FECHA between _initialDate and _finalDate) or (FECHA=_initialDate)
ORDER BY rendimiento desc;


END$$

DROP PROCEDURE IF EXISTS `SP_SHARESLASTDATE_SELECT`$$
CREATE  PROCEDURE `SP_SHARESLASTDATE_SELECT` ()   BEGIN
    SELECT `shares_lastdate`.`SHA_ISSUER_ID` AS idEmisor,
    `shares_lastdate`.`SHA_ISSUER` as emisor,
    `shares_lastdate`.`MAX_DATE` as fechamaxima,
    `shares_lastdate`.`MAX_PRICE` as preciomaximo,
    `shares_lastdate`.`MIN_PRICE` as preciominimo,
    `shares_lastdate`.`AVG_PRICE` as preciopromedio
    FROM `shares_lastdate`
    order by max_date desc;
END$$

DROP PROCEDURE IF EXISTS `SP_SHARES_LAST_DATE`$$
CREATE  PROCEDURE `SP_SHARES_LAST_DATE` ()   BEGIN

TRUNCATE TABLE shares_lastdate;
/*
CREATE TABLE `shares_lastdate` (
  `SHA_ISSUER_ID` int(11) NOT NULL,
  `SHA_ISSUER` varchar(100) DEFAULT NULL,
  `MAX_DATE` date DEFAULT NULL,
  `MAX_PRICE` decimal(8,2) DEFAULT NULL,
  `MIN_PRICE` decimal(8,2) DEFAULT NULL,
  `AVG_PRICE` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`SHA_ISSUER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

*/
CREATE TABLE `shares_lastdate_temp` (
  `SHA_ISSUER_ID` int(11) NOT NULL,
  `SHA_ISSUER` varchar(100) DEFAULT NULL,
  `MAX_DATE` date DEFAULT NULL,
  PRIMARY KEY (`SHA_ISSUER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# OBTIENE LA ÚLTIMA FECHA EN LA QUE SE TRANSACCIONÓ CON UNA EMPRESA    INICIO
INSERT INTO shares_lastdate_temp (sha_issuer_id, sha_issuer, max_date)
SELECT SHA_ISSUER_ID, SHA_ISSUER, MAX(SHA_DATE) as max_date FROM shares
WHERE SHA_CASH_VALUE > 0 and sha_date < '2024-12-31' GROUP BY SHA_ISSUER ORDER BY SHA_ISSUER;
# OBTIENE LA ÚLTIMA FECHA EN LA QUE SE TRANSACCIONÓ CON UNA EMPRESA    FIN

INSERT INTO shares_lastdate (SHA_ISSUER_ID, SHA_ISSUER, MAX_DATE, AVG_PRICE, MIN_PRICE, MAX_PRICE)
	SELECT A.SHA_ISSUER_ID ,
               A.SHA_ISSUER,
               B.MAX_DATE,
               ROUND(SUM(A.SHA_CASH_VALUE) / SUM(A.SHA_NUMBER), 2) AS AVG_PRICE,
               ROUND(MIN(SHA_PRICE),2) AS MIN_PRICE,
               ROUND(MAX(SHA_PRICE),2) AS MAX_PRICE
	from shares A, shares_lastdate_temp B
	where A.SHA_DATE = B.MAX_DATE
	  AND A.SHA_ISSUER_ID = B.SHA_ISSUER_ID
	GROUP BY A.SHA_ISSUER_ID, A.SHA_DATE;


UPDATE shares A
SET A.sha_cash_value = (
    SELECT AVG_PRICE
    FROM shares_lastdate B
    WHERE A.SHA_DATE = '2024-12-31'
    AND A.SHA_ISSUER_ID = B.SHA_ISSUER_ID
)
WHERE A.SHA_DATE = '2024-12-31' ;



-- select * from shares_lastdate ORDER BY MAX_DATE DESC;

-- DROP TABLE shares_lastdate;
DROP TABLE shares_lastdate_temp;



END$$

DROP PROCEDURE IF EXISTS `SP_SHARES_SELECT`$$
CREATE  PROCEDURE `SP_SHARES_SELECT` (IN `_initialDate` DATE, IN `_finalDate` DATE)   BEGIN


SELECT `shares`.`SHA_ID` as id,
    `shares`.`SHA_ISSUER_ID` as idemisor,
    `shares`.`SHA_DATE` as fecha,
    `shares`.`SHA_ISSUER` as emisor,
    `shares`.`SHA_TYPE` as tipo,
    `shares`.`SHA_NOMINAL_VALUE` as valornominal,
    `shares`.`SHA_PRICE` as precio,
    `shares`.`SHA_NUMBER` as cantidad,
    `shares`.`SHA_CASH_VALUE` as efectivo,
    `shares`.`SHA_PROVENANCE` as procedencia
FROM `shares`
WHERE  SHA_TYPE like '%ACCIONES%' and
      ((SHA_DATE between _initialDate and _finalDate) or (SHA_DATE=_initialDate))


ORDER BY SHA_TYPE, SHA_ISSUER, SHA_PRICE desc;
END$$

DROP PROCEDURE IF EXISTS `SP_SHARES_SUMMARY`$$
CREATE  PROCEDURE `SP_SHARES_SUMMARY` (IN `p_issuer` INT, IN `p_year` INT)   BEGIN
  IF p_issuer <> 0 AND p_year <> 0 THEN
    SELECT SHA_DATE AS fecha,
           SHA_ISSUER AS emisor,
           SUM(SHA_NUMBER) AS cantidad,
           ROUND(SUM(SHA_CASH_VALUE),2) AS valor,
           ROUND(SUM(SHA_CASH_VALUE) / SUM(SHA_NUMBER),2) AS precio,
           COUNT(*) AS transacciones
    FROM shares
    WHERE SHA_ISSUER_ID = p_issuer and YEAR(SHA_DATE) = p_year
    GROUP BY SHA_DATE
    ORDER BY SHA_DATE;
  END IF;

  IF p_issuer <> 0 AND p_year = 0 THEN
    SELECT SHA_DATE AS fecha,
           SHA_ISSUER AS emisor,
           SUM(SHA_NUMBER) AS cantidad,
           ROUND(SUM(SHA_CASH_VALUE),2) AS valor,
           ROUND(SUM(SHA_CASH_VALUE) / SUM(SHA_NUMBER),2) AS precio,
           COUNT(*) AS transacciones
    FROM shares
    WHERE SHA_ISSUER_ID = p_issuer
    GROUP BY SHA_DATE
    ORDER BY SHA_DATE;
  END IF;

  IF p_issuer = 0 THEN
    SELECT SHA_DATE AS fecha,
           SHA_ISSUER AS emisor,
           SUM(SHA_NUMBER) AS cantidad,
           ROUND(SUM(SHA_CASH_VALUE),2) AS valor,
           ROUND(SUM(SHA_CASH_VALUE) / SUM(SHA_NUMBER),2) AS precio,
           COUNT(*) AS transacciones
    FROM shares
    GROUP BY SHA_DATE
    ORDER BY SHA_DATE;
  END IF;
END$$

DROP PROCEDURE IF EXISTS `SP_TOTAL_INVESTMENT_BY_OWNER`$$
CREATE  PROCEDURE `SP_TOTAL_INVESTMENT_BY_OWNER` ()   BEGIN

CREATE TABLE `ownercapital_001` (
  `owner` varchar(45) NOT NULL,
  `capital` decimal(8,2) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


insert into ownercapital_001 select inv_owner, sum(inv_principal), 'BONO' from investment where inv_type = 4 and is_deleted = 0 and is_active = 1 group by inv_owner;
insert into ownercapital_001 select am_owner, sum(am_principal), 'INVERSIONES' from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
  and is_active = 1
  and is_deleted = 0
  group by am_owner;

select owner as propietario, sum(capital) as capital from ownercapital_001 where owner not like '%Cristian%' GROUP BY owner
union
select 'Cristian' as propietario, sum(capital) as capital from ownercapital_001 where owner like '%Cristian%';




DROP TABLE ownercapital_001;


END$$

DROP PROCEDURE IF EXISTS `SP_TRADING`$$
CREATE  PROCEDURE `SP_TRADING` (IN `initial_date` VARCHAR(10), IN `final_date` VARCHAR(10))   BEGIN
/*
    DECLARE part1 VARCHAR(10);
    DECLARE part2 VARCHAR(10);
    DECLARE part3 VARCHAR(10);
    DECLARE initial_date DATE;
    DECLARE final_date DATE;

    -- Obtener la primera parte de la fecha inicial
    SET part1 = SUBSTRING_INDEX(initial_date_str, '/', 1);
    -- Obtener la segunda parte de la fecha inicial
    SET part2 = SUBSTRING_INDEX(SUBSTRING_INDEX(initial_date_str, '/', 2), '/', -1);
    -- Obtener la tercera parte de la fecha inicial
    SET part3 = SUBSTRING_INDEX(initial_date_str, '/', -1);
    -- Concatenar las partes en el formato YYYY-MM-DD
    SET initial_date = CONCAT(part3, '-', part2, '-', part1);

    -- Obtener la primera parte de la fecha final
    SET part1 = SUBSTRING_INDEX(final_date_str, '/', 1);
    -- Obtener la segunda parte de la fecha final
    SET part2 = SUBSTRING_INDEX(SUBSTRING_INDEX(final_date_str, '/', 2), '/', -1);
    -- Obtener la tercera parte de la fecha final
    SET part3 = SUBSTRING_INDEX(final_date_str, '/', -1);
    -- Concatenar las partes en el formato YYYY-MM-DD
    SET final_date = CONCAT(part3, '-', part2, '-', part1);

	set final_date = final_date_str;
    set initial_date = final_date_str;

*/
    -- Realizar la consulta utilizando las fechas formateadas
    SELECT tra_date AS fecha, tra_description AS descripcion, tra_value AS valor, tra_type AS tipo, tra_owner AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    UNION
    SELECT 'X' AS fecha, 'TOTAL' AS descripcion, SUM(tra_value) AS valor, '' AS tipo, '' AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    ORDER BY fecha;
END$$

DROP PROCEDURE IF EXISTS `SP_TRADING_new`$$
CREATE  PROCEDURE `SP_TRADING_new` (IN `initial_date_str` VARCHAR(10), IN `final_date_str` VARCHAR(10))   BEGIN
    DECLARE part1 VARCHAR(10);
    DECLARE part2 VARCHAR(10);
    DECLARE part3 VARCHAR(10);
    DECLARE initial_date DATE;
    DECLARE final_date DATE;

    -- Obtener la primera parte de la fecha inicial
    SET part1 = SUBSTRING_INDEX(initial_date_str, '/', 1);
    -- Obtener la segunda parte de la fecha inicial
    SET part2 = SUBSTRING_INDEX(SUBSTRING_INDEX(initial_date_str, '/', 2), '/', -1);
    -- Obtener la tercera parte de la fecha inicial
    SET part3 = SUBSTRING_INDEX(initial_date_str, '/', -1);
    -- Concatenar las partes en el formato YYYY-MM-DD
    SET initial_date = CONCAT(part3, '-', part2, '-', part1);

    -- Obtener la primera parte de la fecha final
    SET part1 = SUBSTRING_INDEX(final_date_str, '/', 1);
    -- Obtener la segunda parte de la fecha final
    SET part2 = SUBSTRING_INDEX(SUBSTRING_INDEX(final_date_str, '/', 2), '/', -1);
    -- Obtener la tercera parte de la fecha final
    SET part3 = SUBSTRING_INDEX(final_date_str, '/', -1);
    -- Concatenar las partes en el formato YYYY-MM-DD
    SET final_date = CONCAT(part3, '-', part2, '-', part1);

    -- Realizar la consulta utilizando las fechas formateadas
    SELECT tra_date AS fecha, tra_description AS descripcion, tra_value AS valor, tra_type AS tipo, tra_owner AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    UNION
    SELECT 'X' AS fecha, 'TOTAL' AS descripcion, SUM(tra_value) AS valor, '' AS tipo, '' AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    ORDER BY fecha;
END$$

DROP PROCEDURE IF EXISTS `SP_TRADING_old`$$
CREATE  PROCEDURE `SP_TRADING_old` (IN `initial_date` DATE, IN `final_date` DATE)   BEGIN

  select tra_date as fecha, tra_description as descripcion, tra_value as valor, tra_type as tipo, tra_owner as propietario
  from trading
  where tra_date >= initial_date and tra_date <= final_date
  union
  select 'X' as fecha,'TOTAL' as descripcion, sum(tra_value) as valor, '' as tipo, '' as propietario from trading
  where tra_date >= initial_date and tra_date <= final_date
  order by fecha;

END$$

DROP PROCEDURE IF EXISTS `SP_TRADING_old2`$$
CREATE  PROCEDURE `SP_TRADING_old2` (IN `initial_date` DATE, IN `final_date` DATE)   BEGIN

  select tra_date as fecha, tra_description as descripcion, tra_value as valor, tra_type as tipo, tra_owner as propietario
  from trading
  where tra_date >= initial_date and tra_date <= final_date
  union
  select 'X' as fecha,'TOTAL' as descripcion, sum(tra_value) as valor, '' as tipo, '' as propietario from trading
  where tra_date >= initial_date and tra_date <= final_date
  order by fecha;

END$$

DROP PROCEDURE IF EXISTS `SP_TRADING_old3`$$
CREATE  PROCEDURE `SP_TRADING_old3` (IN `initial_date_str` VARCHAR(200), IN `final_date_str` VARCHAR(200))   BEGIN
    DECLARE part1 VARCHAR(10);
    DECLARE part2 VARCHAR(10);
    DECLARE part3 VARCHAR(10);
    DECLARE initial_date DATE;
    DECLARE final_date DATE;

	-- SET @fecha_original = 'Thu Jan 11 2024 00:00:00 GMT-0500 (hora de Ecuador)';
    -- set @fecha0 = URL_DECODE(initial_date_str);
	SET @fecha1 = SUBSTRING_INDEX(initial_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET initial_date =  STR_TO_DATE(@fecha2, '%b %d %Y');

	SET @fecha1 = SUBSTRING_INDEX(final_date_str, ' ', 4);
	SET @fecha2 = TRIM(SUBSTRING_INDEX(@fecha1, ' ', -3));
	SET final_date =  STR_TO_DATE(@fecha2, '%b %d %Y');

    -- Realizar la consulta utilizando las fechas formateadas
    SELECT tra_date AS fecha, tra_description AS descripcion, tra_value AS valor, tra_type AS tipo, tra_owner AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    UNION
    SELECT 'X' AS fecha, 'TOTAL' AS descripcion, SUM(tra_value) AS valor, '' AS tipo, '' AS propietario
    FROM trading
    WHERE tra_date >= initial_date AND tra_date <= final_date
    ORDER BY fecha;
END$$

DROP PROCEDURE IF EXISTS `SP_TYPE_INVESTMENT_BY_OWNER`$$
CREATE  PROCEDURE `SP_TYPE_INVESTMENT_BY_OWNER` (IN `_type` VARCHAR(20))   BEGIN
/*
CREATE TABLE `ownercapital` (
  `owner` varchar(45) NOT NULL,
  `capital` decimal(8,2) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
*/
DELETE FROM ownercapital;

insert into ownercapital select inv_owner, sum(inv_principal), 'BONO' from investment where inv_type = 4 and is_active = 1 and is_deleted = 0 group by inv_owner;
insert into ownercapital select am_owner, sum(am_principal), 'INVERSIONES' from amortization
  where
  am_expiration_date > NOW()
  and am_enterprise not like '%BONOS%'
         and is_active = 1
       and is_deleted = 0
  group by am_owner;

IF _type = 'BONO'  then
   select owner as inversionpropietario, sum(capital) as capital from ownercapital where type = 'BONO' group by OWNER;
END IF;
IF _type = 'INVERSIONES' then
   select owner as inversionpropietario, sum(capital) as capital from ownercapital where type <> 'BONO'  group by OWNER;
END IF;

# DROP TABLE ownercapital;

END$$

DROP PROCEDURE IF EXISTS `SP_UPDATE_SHARES_LASTDATE`$$
CREATE  PROCEDURE `SP_UPDATE_SHARES_LASTDATE` ()   BEGIN
/*
	CREATE TABLE `shares_lastdate_temp` (
	  `SHA_ISSUER_ID` int(11) NOT NULL,
	  `SHA_ISSUER` varchar(100) DEFAULT NULL,
	  `MAX_DATE` date DEFAULT NULL,
	  PRIMARY KEY (`SHA_ISSUER_ID`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



	-- OBTIENE LA ÚLTIMA FECHA EN LA QUE SE TRANSACCIONÓ CON UNA EMPRESA    INICIO
	INSERT INTO shares_lastdate_temp (sha_issuer_id, sha_issuer, max_date)
	SELECT SHA_ISSUER_ID, SHA_ISSUER, MAX(SHA_DATE) as max_date FROM shares
	WHERE SHA_CASH_VALUE > 0 and sha_date < '2024-12-31' GROUP BY SHA_ISSUER ORDER BY SHA_ISSUER;
	-- OBTIENE LA ÚLTIMA FECHA EN LA QUE SE TRANSACCIONÓ CON UNA EMPRESA    FIN
*/

UPDATE shares_lastdate A
JOIN (
    SELECT SHA_ISSUER_ID, MAX(SHA_DATE) AS MAX_DATE,
           ROUND(SUM(SHA_CASH_VALUE) / SUM(SHA_NUMBER), 2) AS avg_price,
           ROUND(MIN(SHA_PRICE),2) AS MIN_PRICE,
           ROUND(MAX(SHA_PRICE),2) AS MAX_PRICE
    FROM shares
    GROUP BY SHA_ISSUER_ID
) AS B ON A.SHA_ISSUER_ID = B.SHA_ISSUER_ID
SET A.MAX_DATE = B.MAX_DATE,
    A.AVG_PRICE = B.avg_price,
    A.MIN_PRICE = B.MIN_PRICE,
    A.MAX_PRICE = B.MAX_PRICE;


	select * from shares_lastdate;


	-- DROP TABLE shares_lastdate_temp;

END$$

DROP PROCEDURE IF EXISTS `SP_VARIATION`$$
CREATE  PROCEDURE `SP_VARIATION` ()   BEGIN
    SELECT id as id,
           var_date as Fecha,
           var_jaime as Jaime,
           var_argentina as Argentina,
           var_cristian as Cristian,
           var_totalbalance as SaldoTotal,
           var_ownbalance as SaldoPropio,
           var_importation as Importacion,
           var_own as TotalPropio
    from variation
    order by id desc;

END$$

--
-- Funciones
--
DROP FUNCTION IF EXISTS `FormatDateString`$$
CREATE  FUNCTION `FormatDateString` (`date_str` VARCHAR(10)) RETURNS VARCHAR(10) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
        DECLARE date_parts VARCHAR(3);
        DECLARE formatted_date VARCHAR(10);

        -- Dividir el string usando el carácter '/'
        SET date_parts = SUBSTRING_INDEX(date_str, '/', -1) + SUBSTRING_INDEX(SUBSTRING_INDEX(date_str, '/', 1), '/', -1);

        -- Reconstruir la fecha en el formato deseado
        SET formatted_date = STR_TO_DATE(date_parts, '%Y%m%d');

        RETURN formatted_date;

END$$

DELIMITER ;
