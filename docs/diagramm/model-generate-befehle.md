# Verwendete model:generate-Befehle

## Team

```powershell
npx sequelize-cli model:generate --name Team --attributes name:string,klasse:string

```
## Member
npx sequelize-cli model:generate --name Member --attributes teamId:integer,vorname:string,nachname:string

## Projekt
npx sequelize-cli model:generate --name Project --attributes teamId:integer,titel:string,beschreibung:text,praesentiertAm:date

## Criterion
npx sequelize-cli model:generate --name Criterion --attributes name:string,maxScore:integer,weight:decimal

## Juror
npx sequelize-cli model:generate --name Juror --attributes name:string,email:string

## Evaluation
npx sequelize-cli model:generate --name Evaluation --attributes projectId:integer,criterionId:integer,jurorId:integer,score:i