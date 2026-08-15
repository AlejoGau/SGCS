Ext.define('Cuenta.model.SmsSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'RowNumber',
    fields: [
        
            {name: 'RowNumber', type: 'int'},
            {name: 'que_iid', type: 'int'},
            {name: 'que_tfechahora', type: 'date', dateFormat:'n/j/Y g:i:s A', defaultValue: new Date(-62135586000000)},
            {name: 'que_tfechahoraiso', type: 'date'},
            {name: 'que_idCuenta', type: 'int'},
            {name: 'que_iModemSMS', type: 'int'},
            {name: 'que_cAsunto', type: 'string'},
            {name: 'que_cDestino', type: 'string'},
            {name: 'que_nEstado', type: 'int'},
            {name: 'que_idCmd', type: 'int'},
            {name: 'que_nRechazo', type: 'int'},
            {name: 'cue_iid', type: 'int'},
            {name: 'cue_clinea', type: 'string'},
            {name: 'cue_ncuenta', type: 'string'},
            {name: 'cue_cnombre', type: 'string'},
            {name: 'cue_ccalle', type: 'string'},
            {name: 'cue_clocalidad', type: 'string'},
            {name: 'cue_cprovincia', type: 'string'},
            {name: 'cue_ccodigopostal', type: 'int'},
            {name: 'cue_ccallecorreo', type: 'string'},
            {name: 'cue_clocalidadcorreo', type: 'string'},
            {name: 'cue_cprovinciacorreo', type: 'string'},
            {name: 'cue_ccodigopostalcorreo', type: 'int'},
            {name: 'cue_ctelefono', type: 'string'},
            {name: 'cue_cclave', type: 'string'},
            {name: 'cue_cpermiso', type: 'string'},
            {name: 'cue_ctipo', type: 'string'},
            {name: 'cue_cubicacion', type: 'string'},
            {name: 'cue_nparticion', type: 'int'},
            {name: 'cue_cobservacion', type: 'string'},
            {name: 'cue_cfoto', type: 'string'},
            {name: 'cue_dfechaalta', type: 'date'},
            {name: 'cue_dservicio', type: 'date'},
            {name: 'cue_nmostrar', type: 'int'},
            {name: 'cue_nsonidoul', type: 'int'},
            {name: 'cue_nllaveul', type: 'int'},
            {name: 'cue_cemail', type: 'string'},
            {name: 'cue_cinstalador', type: 'string'},
            {name: 'cue_cIMEI', type: 'string'},
            {name: 'cue_cLatLng', type: 'string'},
            {name: 'cue_nEfectiva', type: 'int'},
            
            /* Sumo la informacion del Gateway */
            {name: 'sms_icodigo' ,type: 'int' },
            {name: 'sms_cdescripcion' ,type: 'string' },
            {name: 'sms_nport' ,type: 'int' },
            {name: 'sms_cseteo' ,type: 'string' },
            {name: 'sms_cinbox' ,type: 'string' },
            {name: 'sms_ndefault' ,type: 'int' },
            {name: 'sms_cterminal' ,type: 'string' },
            {name: 'sms_csource' ,type: 'string' },
            {name: 'sms_nEstado' ,type:'int' },
            {name: 'sms_iGateway' ,type:'int' },
            {name: 'sms_idKey' ,type:'int' }
        
    ],

    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            root : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/smsqueue'
        
    }
});