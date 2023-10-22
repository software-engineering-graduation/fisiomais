
---

## Script de Criação do Banco de Dados

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`paciente` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `genero` ENUM('Homem', 'Mulher', 'Outro') NOT NULL,
  `endereco` VARCHAR(200) NULL,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`fisioterapeuta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`fisioterapeuta` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `telefone` VARCHAR(11) NOT NULL,
  `endereco` VARCHAR(200) NULL,
  PRIMARY KEY (`_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`consulta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`consulta` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `paciente__id` INT NOT NULL,
  `fisioterapeuta__id` INT NOT NULL,
  `data_e_hora` DATETIME(1) NOT NULL,
  `observacoes` TEXT(500) NULL,
  `confirmacao` TINYINT NOT NULL,
  `owner_id` INT NOT NULL,
  `link` LONGTEXT NULL,
  PRIMARY KEY (`_id`, `paciente__id`, `fisioterapeuta__id`),
  INDEX `fk_consulta_paciente_idx` (`paciente__id` ASC) VISIBLE,
  INDEX `fk_consulta_fisioterapeuta1_idx` (`fisioterapeuta__id` ASC) VISIBLE,
  CONSTRAINT `fk_consulta_paciente`
    FOREIGN KEY (`paciente__id`)
    REFERENCES `mydb`.`paciente` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_consulta_fisioterapeuta1`
    FOREIGN KEY (`fisioterapeuta__id`)
    REFERENCES `mydb`.`fisioterapeuta` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`midia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`midia` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `fisioterapeuta__id` INT NOT NULL,
  `type` ENUM('Vídeo', 'Imagem', 'GIF') NOT NULL,
  `arquivo` LONGBLOB NULL,
  `link_arquivo` LONGTEXT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `descricao` TEXT(1000) NOT NULL,
  PRIMARY KEY (`_id`, `fisioterapeuta__id`),
  INDEX `fk_midia_fisioterapeuta1_idx` (`fisioterapeuta__id` ASC) VISIBLE,
  CONSTRAINT `fk_midia_fisioterapeuta1`
    FOREIGN KEY (`fisioterapeuta__id`)
    REFERENCES `mydb`.`fisioterapeuta` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`tratamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tratamento` (
  `create_time` TIMESTAMP NULL,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `fisioterapeuta__id` INT NOT NULL,
  `paciente__id` INT NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `observacoes` TEXT NULL,
  `end_date` DATETIME NULL,
  `feedback` LONGTEXT NULL,
  PRIMARY KEY (`_id`),
  INDEX `fk_tratamento_fisioterapeuta1_idx` (`fisioterapeuta__id` ASC) VISIBLE,
  INDEX `fk_tratamento_paciente1_idx` (`paciente__id` ASC) VISIBLE,
  CONSTRAINT `fk_tratamento_fisioterapeuta1`
    FOREIGN KEY (`fisioterapeuta__id`)
    REFERENCES `mydb`.`fisioterapeuta` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tratamento_paciente1`
    FOREIGN KEY (`paciente__id`)
    REFERENCES `mydb`.`paciente` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`exercicio` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `descricao` TEXT(1000) NOT NULL,
  `fisioterapeuta__id` INT NOT NULL,
  PRIMARY KEY (`_id`, `fisioterapeuta__id`),
  INDEX `fk_exercicio_fisioterapeuta1_idx` (`fisioterapeuta__id` ASC) VISIBLE,
  CONSTRAINT `fk_exercicio_fisioterapeuta1`
    FOREIGN KEY (`fisioterapeuta__id`)
    REFERENCES `mydb`.`fisioterapeuta` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`exercicio_has_videos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`exercicio_has_videos` (
  `midia__id` INT NOT NULL,
  `midia_fisioterapeuta__id` INT NOT NULL,
  `exercicio__id` INT NOT NULL,
  PRIMARY KEY (`midia__id`, `midia_fisioterapeuta__id`, `exercicio__id`),
  INDEX `fk_exercicio_videos_midia1_idx` (`midia__id` ASC, `midia_fisioterapeuta__id` ASC) VISIBLE,
  INDEX `fk_exercicio_has_videos_exercicio1_idx` (`exercicio__id` ASC) VISIBLE,
  CONSTRAINT `fk_exercicio_videos_midia1`
    FOREIGN KEY (`midia__id` , `midia_fisioterapeuta__id`)
    REFERENCES `mydb`.`midia` (`_id` , `fisioterapeuta__id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercicio_has_videos_exercicio1`
    FOREIGN KEY (`exercicio__id`)
    REFERENCES `mydb`.`exercicio` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`tratamento_has_exercicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tratamento_has_exercicios` (
  `tratamento__id` INT NOT NULL,
  `exercicio__id` INT NOT NULL,
  PRIMARY KEY (`tratamento__id`, `exercicio__id`),
  INDEX `fk_tratamento_has_exercicios_exercicio1_idx` (`exercicio__id` ASC) VISIBLE,
  CONSTRAINT `fk_tratamento_has_exercicios_tratamento1`
    FOREIGN KEY (`tratamento__id`)
    REFERENCES `mydb`.`tratamento` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tratamento_has_exercicios_exercicio1`
    FOREIGN KEY (`exercicio__id`)
    REFERENCES `mydb`.`exercicio` (`_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`notificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`notificacao` (
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `_id` INT NOT NULL AUTO_INCREMENT,
  `consulta__id` INT NOT NULL,
  `consulta_paciente__id` INT NOT NULL,
  `consulta_fisioterapeuta__id` INT NOT NULL,
  `vizualizada` TINYINT NULL,
  PRIMARY KEY (`_id`, `consulta__id`, `consulta_paciente__id`, `consulta_fisioterapeuta__id`),
  CONSTRAINT `fk_notificacao_consulta1`
    FOREIGN KEY (`consulta__id` , `consulta_paciente__id` , `consulta_fisioterapeuta__id`)
    REFERENCES `mydb`.`consulta` (`_id` , `paciente__id` , `fisioterapeuta__id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

---
