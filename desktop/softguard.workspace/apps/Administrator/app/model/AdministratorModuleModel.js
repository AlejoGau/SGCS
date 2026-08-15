Ext.define('Administrator.model.AdministratorModuleModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{name: 'Id', type: 'int', mapping: 'dwm_idKey'},
        {name: 'Name', type:'string'},
        {name:'dwm_idKey',type:'int'},
        {name:'dwm_idWeb',type:'int'},
        {name:'dwm_idModules',type:'int'},
        {name:'dwm_idTabla',type:'string'},
        {name:'dwm_dealer',type:'string'},
        {name:'dwm_cuenta_desde',type:'string'},
        {name:'dwm_cuenta_hasta',type:'string'},
        {name:'dwm_data',type:'string'}
    ],
    
    validations: [
        /*{type: 'presence',  field: 'cue_dfechaalta'},
        {type: 'presence',  field: 'cue_dservicio'},
        {type: 'presence',  field: 'cue_clinea'},
        {type: 'presence',  field: 'cue_ncuenta'},
        {type: 'presence',  field: 'cue_cnombre'},
        {type: 'length',    field: 'name',     min: 2},
        {type: 'inclusion', field: 'gender',   list: ['Male', 'Female']},
        {type: 'exclusion', field: 'username', list: ['Admin', 'Operator']},
        {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}*/
    ],
    
    proxy: {
        type: 'rest',
        url: '/rest/usersdesktopwebmodulos/',
        appendId: true
    }

});
