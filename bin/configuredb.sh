#!/bin/zsh

source './secrets/db_config.sh'

echo "Configuring database: $PGTABLE"

dropdb -p $PGPORT -U node_user monstersdb;
createdb -p $PGPORT -U node_user monstersdb;

psql -p $PGPORT -U node_user monstersdb < ./bin/sql/monsters.sql

echo "$PGTABLE configured"