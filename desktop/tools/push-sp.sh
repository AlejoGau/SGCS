#!/bin/bash
#
# push-sp.sh — Deploy stored procedures a SQL Server sin pedir password.
# Lee credenciales de tools/.sql-creds (gitignored).
#
# USO:
#   bash tools/push-sp.sh <sp-name>               # SP en _Desktop
#   bash tools/push-sp.sh <sp-name> <Database>    # SP en otra base
#   bash tools/push-sp.sh --all                   # Todos los SPs de _Desktop
#   bash tools/push-sp.sh --all <Database>        # Todos los SPs de otra base
#
# EJEMPLOS:
#   bash tools/push-sp.sh crm_contrato_itemSearch
#   bash tools/push-sp.sh SearchOrganizationOuterApplyTaxonomy
#   bash tools/push-sp.sh --all

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
CREDS_FILE="$SCRIPT_DIR/.sql-creds"

if [ ! -f "$CREDS_FILE" ]; then
    echo "ERROR: No se encontro $CREDS_FILE"
    echo "Crea el archivo con SQL_SERVER, SQL_USER, SQL_PASSWORD"
    exit 1
fi

# shellcheck disable=SC1090
source "$CREDS_FILE"

SP_ARG="${1:-}"
DATABASE="${2:-_Desktop}"

if [ -z "$SP_ARG" ]; then
    echo "USO: push-sp.sh <sp-name|--all> [Database]"
    exit 1
fi

SP_DIR="$REPO_ROOT/database/$DATABASE/StoredProcedures"

if [ ! -d "$SP_DIR" ]; then
    echo "ERROR: No existe el directorio: $SP_DIR"
    exit 1
fi

# Resolver lista de archivos
if [ "$SP_ARG" = "--all" ]; then
    FILES=("$SP_DIR"/*.sql)
else
    if [ -f "$SP_ARG" ]; then
        FILES=("$SP_ARG")
    elif [ -f "$SP_DIR/${SP_ARG}.sql" ]; then
        FILES=("$SP_DIR/${SP_ARG}.sql")
    else
        echo "ERROR: No se encontro el archivo para: $SP_ARG"
        exit 1
    fi
fi

TOTAL=${#FILES[@]}
COUNT=0
ERRORS=0

echo "Aplicando $TOTAL SP(s) a $SQL_SERVER / $DATABASE ..."

for FILE_PATH in "${FILES[@]}"; do
    SP_NAME="$(basename "$FILE_PATH" .sql)"
    COUNT=$((COUNT + 1))
    echo "  [$COUNT/$TOTAL] $SP_NAME"

    # Convertir ruta Unix a Windows para sqlcmd
    WIN_PATH=$(cygpath -w "$FILE_PATH" 2>/dev/null || echo "$FILE_PATH" | sed 's|^/\([a-zA-Z]\)/|\1:/|')

    sqlcmd -S "$SQL_SERVER" -U "$SQL_USER" -P "$SQL_PASSWORD" \
           -d "$DATABASE" -i "$WIN_PATH" -b 2>&1

    if [ $? -ne 0 ]; then
        echo "  ERROR: $SP_NAME fallo"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "Listo: $((COUNT - ERRORS))/$TOTAL SPs aplicados."
if [ "$ERRORS" -gt 0 ]; then
    echo "Errores: $ERRORS SP(s) fallaron (ver mensajes arriba)"
    exit 1
fi
