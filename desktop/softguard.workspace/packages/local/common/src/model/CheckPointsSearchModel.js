//MIGRADO2024
Ext.define('Common.model.CheckPointsSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3083
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_tags_ag'
        },
		{name:'chp_idKey',type:'int'},
        {name:'chp_cReference',type:'string',convert: function(val,rec) {             
            return Ext.util.Format.trim(val);
        }},
        {name:'chp_cZona',type:'string'},
        {name:'chp_iCuenta',type:'int',defaultValue:0},
        {name:'chp_rLatitud',type:'string'},
        {name:'chp_rLongitud',type:'string'},
        {name:'chp_iTolerancia',type:'int',defaultValue:1},
        {name:'zon_cdescripcion',type:'string'},        
        {name:'zon_cimagen',type:'string'},
        {name:'zon_mobservacion',type:'string'},
        {name:'zon_idKey',type:'int',defaultValue:0},
        {name:'_cuenta',type:'string', convert: function(v, record){
           
            return record.get('cue_cnombre');
        }},
        {name:'chp_nTipo',type:'int'},
        {name:'_chp_nTipo',type:'string', convert:function (val,rec) {
            if(rec.get('chp_nTipo') == 1) {
                return getLocale('Bluetooth');
            } else if(rec.get('chp_nTipo') == 0){
                return getLocale('Qr code');
            } else if(rec.get('chp_nTipo') == 3){
                return getLocale('NFC');
            } else if(rec.get('chp_nTipo') == 4){
                return getLocale('Tag');
            }else if(rec.get('chp_nTipo') == 4){
                return getLocale('Manual');
            }
        }},
        {name:'_chp_nTipoCombo',type:'string'}
         ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_checkpoints_VC',
		appendId : true
	}
});