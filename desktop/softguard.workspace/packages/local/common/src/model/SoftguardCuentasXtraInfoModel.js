//MIGRADO2024
Ext.define('Common.model.SoftguardCuentasXtraInfoModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
    },
    //cue_idKey,cue_iidCuenta, cue_iExcesoLimiteDia,cue_iExcesoLimiteHora
        {
            name: 'Name',
            type: 'string'
        },
            { name: 'cue_iidcuenta' ,type:'int',defaultValue:0},
            { name: 'cue_iExcesoLimiteDia' ,type:'int',defaultValue:0
              ,convert: function(v,r){
                  if(v == -1)
                    return 0;                  
                  if(v == 0)
                    return null;
                  else
                    return v;  
              }  
            },
            { name: 'cue_iExcesoLimiteHora' ,type:'int',defaultValue:0
              ,convert: function(v,r){
                  if(v == -1)
                    return 0;
                  if(v == 0)
                    return null;
                  else
                    return v;  
              }  
            
            }
        ],
    validations: [
    /*{ type: 'presence', name: 'Name', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'LastName', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'Email', message: 'Email es requerido.' }*/
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/m_CuentasXtraInfo',
        appendId: true,
    }
});