#!/bin/zsh

source './secrets/db_config.sh'

echo "Configuring database: $PGTABLE"

dropdb -p $PGPORT -U $PGUSER $PGTABLE;
createdb -p $PGPORT -U $PGUSER $PGTABLE;

psql -p $PGPORT -U $PGUSER $PGTABLE < ./bin/sql/monsters.sql

echo "$PGTABLE configured"