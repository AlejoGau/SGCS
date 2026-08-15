//MIGRADO2024
Ext.define( 'Common.model.ServTecSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        }, {
            name: 'stc_iid',
            type: 'int'
        }, {
            name: 'stc_iid_cuenta',
            type: 'int'
        }, {
            name: 'stc_inumero',
            type: 'int'
        }, {
            name: 'stc_ctipo_servicio',
            type: 'string'
        }, {
            name: 'stc_mobservaciones',
            type: 'string'
        }, {
            name: 'stc_iPrioridad',
            type: 'int'
        }, {
            name: 'stc_ccontacto',
            type: 'string'
        }, {
            name: 'stc_ctecnico_1',
            type: 'string'
        }, {
            name: 'stc_ctecnico_2',
            type: 'string'
        }, {
            name: 'stc_ctecnico_3',
            type: 'string'
        }, {
            name: 'stc_ctecnico_4',
            type: 'string'
        }, {
            name: 'stc_ctecnico_5',
            type: 'string'
        }, {
            name: 'stc_mobservaciones',
            type: 'string'
        }, {
            name: 'stc_nestado',
            type: 'int'
        },{name:'_nombreCuenta',type:'string', convert: function(value, record) {
            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta');//+' '+record.get('cue_cnombre')
        },            
        }, {
            name: '_stc_estadodescripcion',
            type: 'string',
            convert: function( v, record ) {
                switch( record.get( 'stc_nestado' ) ) {
                    case 1:
                        return getLocale( 'Pendiente' );
                        break;
                    case 2:
                        return getLocale( 'Asignado' );
                        break;
                    case 3:
                        return getLocale( 'Cancelado' );
                        break;
                    case 4:
                        return getLocale( 'Finalizado' );
                        break;
                    case 5:
                        return getLocale( 'En Ejecución' );
                        break;
                    case 6:
                        return getLocale( 'En Camino' );
                        break;
                }
            }
        },
        { name: 'stc_dfecha_desde_1', type: 'date', dateFormat: 'n/j/Y g:i:s A' },//"9/16/2015 9:19:37 AM"
        { name: 'stc_dfecha_hasta_1', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_desde_2', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_hasta_2', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_desde_3', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_hasta_3', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_cierre', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_modificacion', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dfecha_creacion', type: 'date', dateFormat: 'n/j/Y g:i:s A' }, // BC 406452332
        { name: 'stc_creclamo_1', type: 'string' },
        { name: 'stc_creclamo_2', type: 'string' },
        { name: 'stc_creclamo_3', type: 'string' },
        { name: 'stc_creclamo_4', type: 'string' },
        { name: 'stc_creclamo_5', type: 'string' },
        { name: 'stc_ctecnico_1_cnombre', type: 'string' },
        { name: 'stc_ctecnico_2_cnombre', type: 'string' },
        { name: 'stc_ctecnico_3_cnombre', type: 'string' },
        { name: 'stc_ctecnico_4_cnombre', type: 'string' },
        { name: 'stc_ctecnico_5_cnombre', type: 'string' },
        { name: 'ins_cnombre', type: 'string' },
        {
            name: 't1.ins_cnombre', type: 'string', convert: function( v, rec ) {
                return rec.get( 'ins_cnombre' )
            }
        },
        { name: 'stc_ctecnico_2_cnombre', type: 'string' },
        { name: 'stc_ctecnico_3_cnombre', type: 'string' },
        { name: 'stc_ctecnico_4_cnombre', type: 'string' },
        { name: 'stc_ctecnico_5_cnombre', type: 'string' },
        { name: 'stc_dintecnico_1', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_doutecnico_1', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dintecnico_2', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_doutecnico_2', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_dintecnico_3', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_doutecnico_3', type: 'date', dateFormat: 'n/j/Y g:i:s A' },
        { name: 'stc_minsumos', type: 'string' },
        { name: 'stc_ioperador', type: 'string' },
        { name: 'stc_cmovil_1', type: 'string' },
        { name: 'stc_cmovil_2', type: 'string' },
        { name: 'stc_yValor', type: 'float' },
        { name: 'stc_dfechapago', type: 'date'/*, dateFormat:'MS'*/ },
        { name: 'stc_nvalorpagotecnico', type: 'float' },
        { name: 'stc_ncostomanodeobra', type: 'float' },
        { name: 'stc_referencia', type: 'string' },
        { name: 'stc_cconformidad_html', type: 'string' },
        { name: 'movil_1_nombre', type: 'string' },
        { name: 'movil_2_nombre', type: 'string' },
        {
            name: 'tip_ccodigo',
            type: 'string'
        }, {
            name: 'tip_cdescripcion',
            type: 'string'
        }, {
            name: 'tip_yvalor',
            type: 'int'
        }, {
            name: 'tip_ndias',
            type: 'int'
        }, {
            name: 'tip_nvto',
            type: 'int'
        }, {
            name: 'tip_ntipo',
            type: 'int'
        },
        { name: 'cue_clinea', type: 'string' },
        { name: 'cue_ncuenta', type: 'string' },
        {
            name: 'dealer_cuenta', type: 'string', convert: function( v, rec ) {
                return rec.get( 'cue_clinea' ) + '-' + rec.get( 'cue_ncuenta' )
            }
        },
        { name: 'cue_cnombre', type: 'string' },
        { name: 'cue_iid', type: 'string' },
        { name: 'cue_ccalle', type: 'string' },
        { name: 'cue_clocalidad', type: 'string' },
        { name: 'cue_cprovincia', type: 'string' },
        { name: 'cue_ccodigopostal', type: 'string' },
        { name: 'cue_ccallecorreo', type: 'string' },
        { name: 'cue_clocalidadcorreo', type: 'string' },
        { name: 'cue_cprovinciacorreo', type: 'string' },
        { name: 'cue_ccodigopostalcorreo', type: 'string' },
        { name: 'cue_ctelefono', type: 'string' },
        { name: 'cue_cclave', type: 'string' },
        { name: 'cue_cpermiso', type: 'string' },
        { name: 'cue_ctipo', type: 'string' },
        { name: 'cue_cubicacion', type: 'string' },
        { name: 'cue_nparticion', type: 'string' },
        { name: 'cue_cobservacion', type: 'string' },
        { name: 'cue_cfoto', type: 'string' },
        { name: 'cue_dfechaalta', type: 'string' },
        { name: 'cue_dservicio', type: 'string' },
        { name: 'cue_nmostrar', type: 'string' },
        { name: 'cue_nsonidoul', type: 'string' },
        { name: 'cue_nllaveul', type: 'string' },
        { name: 'cue_cemail', type: 'string' },
        { name: 'cue_cinstalador', type: 'string' },
        { name: 'cue_cIMEI', type: 'string' },
        { name: 'cue_cLatLng', type: 'string' },
        { name: 'cue_nEfectiva', type: 'string' },
        { name: 'cue_cIdExtendido', type: 'string' },
        { name: 'cue_iZonaHoraria', type: 'string' },
        { name: 'cue_cPartitionInfo', type: 'string' },
        { name: 'pro_cdescripcion', type: 'string' },
        { name: 'ope_cnombre', type: 'string' },
        { name: 'lin_cimagen', type: 'string' },
        { name: 'lin_cmail', type: 'string' },
        { name: 'udw_usuario', type: 'string' },
        { name: 'udw_nombre', type: 'string' },
        { name: 'udw_apellido', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
        },
        url: '/Rest/search/ServTec',
        appendId: false
    }
});