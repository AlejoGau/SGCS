//MIGRADO2024
Ext.define( 'Common.model.CuentaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ {
        name: 'Id',
        type: 'int'
    },
        {
            name: 'Name',
            type: 'string',
            mapping: 'cue_cnombre'
        },
        { name: 'cue_clinea', type: 'string' },
        {
            name: 'cue_ncuenta', type: 'string'/*,convert: function(v, record){
            if (v){
                v = v.substr(0,4)
            }
            return v
        }*/},
        {
            name: '_descripcion', type: 'string', convert: function( v, record ) {
                return record.get( 'cue_clinea' ) + " (" + record.get( 'cue_cnombre' ) + ")";
            }
        },
        {
            name: '_fullname', type: 'string', convert: function( v, record ) {
                return record.get( 'cue_clinea' ) + "-" + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
            }
        },
        { name: 'cue_cnombre', type: 'string' },
        { name: 'cue_ccalle', type: 'string' },
        { name: 'cue_clocalidad', type: 'string' },
        { name: 'cue_cprovincia', type: 'string' },
        { name: 'cue_ccodigopostal', type: 'string' },
        { name: 'cue_ccallecorreo', type: 'string' },
        { name: 'cue_clocalidadcorreo', type: 'string' },
        { name: 'cue_cprovinciacorreo', type: 'string' },
        { name: 'cue_provincia', type: 'string' },
        { name: 'cue_ccodigopostalcorreo', type: 'string' },
        { name: 'cue_ctelefono', type: 'string' },
        { name: 'cue_cclave', type: 'string' },
        { name: 'cue_cpermiso', type: 'string' },
        { name: 'cue_ctipo', type: 'string' },
        { name: 'cue_cubicacion', type: 'string' },
        { name: 'cue_nparticion', type: 'int', defaultValue: 0 },
        { name: 'cue_cfoto', type: 'string' },
        { name: 'cue_dfechaalta', type: 'date', dateFormat: 'MS' },
        { name: 'cue_dservicio', type: 'date', dateFormat: 'MS' },
        { name: 'cue_nPrioridad', type: 'int' },
        { name: 'gps_tfechahora', type: 'date', dateFormat: 'c' },
        { name: 'cue_nmostrar', type: 'int', defaultValue: 0 },
        { name: 'cue_iid', type: 'int', defaultValue: 0 },
        { name: 'cue_nsonidoul', type: 'int', defaultValue: 0 },
        { name: 'cue_nllaveul', type: 'int', defaultValue: 0 },
        { name: 'cue_cemail', type: 'string' },
        { name: 'cue_cinstalador', type: 'string' },
        { name: 'cue_cIMEI', type: 'string' },
        { name: 'cue_cLatLng', type: 'string' },
        { name: 'cue_cCustom', type: 'string' },
        { name: 'cue_iZonaHoraria', type: 'int', defaultValue: 0 },
        { name: 'cue_cConfig', type: 'string' },
        { name: 'Situacion', type: 'string' },
        { name: 'sta_nestado', type: 'int' },
        { name: 'sta_cultimaalarma', type: 'string' },
        { name: 'sta_cultimaalerta', type: 'string' },
        { name: 'sta_dFechaUltimaAlerta', type: 'date', dateFormat: 'c' },
        { name: 'sta_dfechautimaalarma', type: 'date', dateFormat: 'c' },
        { name: 'sta_dfechaultimotst', type: 'date', dateFormat: 'c' },
        { name: 'sta_ienviadossms', type: 'int' },
        { name: 'sta_nenviasms', type: 'int' },
        { name: 'cod_cdescripcion', type: 'string' },
        { name: 'cod_nColorLetra', type: 'string' },
        { name: 'cod_ncolor', type: 'string' },
        { name: 'act_nestado', type: 'int', defaultValue: 0 },
        { name: 'tip_nTipo', type: 'int' },
        { name: 'tip_nCondicion', type: 'int' },
        { name: 'tip_cdescripcion', type: 'string' },
        { name: 'tip_ccodigo', type: 'string' },
        { name: 'tip_curlimagen', type: 'string' },
        { name: 'cue_nAutoMonitoreo', type: 'int', defaultValue: 2 },
        { name: 'lin_crazonsocial', type: 'string' },
        { name: 'cue_iEngineStatus', type: 'int', defaultValue: 0 },
        { name: 'sta_ncuentaenfallodetst', type: 'int' },
        { name: 'sta_ncuentaenfallo2dotst', type: 'int' },
        { name: 'sta_ncuentaenfallo3ertst', type: 'int' },
        { name: 'sta_nEnFalloDeAC', type: 'int' },
        { name: 'cue_cUltimaAlarmaRecibida', type: 'string' },
        { name: 'cue_dFechaUltimaAlarmaRecibida', type: 'date' },
        /*********************************************************
         *  Daniel O. Medina
         *  https://basecamp.com/2249105/projects/14758734/todos/429220292
         *  16/11/2020
         */
        { name: 'cue_cobservacion', type: 'string' },
        /****************************************************** */
        { name: 'cod_cdescripcionUAR', type: 'string' },
        { name: 'cod_nColorLetraUAR', type: 'string' },
        { name: 'cod_ncolorUAR', type: 'string' },
        { name: 'madre_clinea', type: 'string' },
        { name: 'madre_ncuenta', type: 'string' },
        { name: 'madre_cnombre', type: 'string' },
        { name: 'cod_cdescripcionalerta', type: 'string' },
        { name: 'cod_ncolorAlerta', type: 'string' },
        { name: 'cod_nColorLetraAlerta', type: 'string' },
        { name: 'cue_cCustom1', type: 'string', mapping: 'cue_cCustom' },
        { name: 'ttz_noffset', type: 'number', defaultValue: 0 },
        { name: '_tfechahoraOffset', type: 'date', dateFormat: 'n/j/Y g:i:s A' }
        , { name: 'nvs_nNivel', type: 'int', defaultValue: 0 }
        , { name: 'cue_iVigiladoresVC', type: 'int', defaultValue: 0 }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/Search/CuentaByDealer',
        appendId: false,
    }
});