Ext.define('Administrator.store.WPModuleStoreNUEVO', {
    extend : 'Ext.data.TreeStore',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'WPModuleStoreNUEVO',
   
    root: {
        expanded : true,
        children: [
            {
                text : 'Cuentas',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-cuentas'
            },{
                text : 'Eventos',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-eventos'
            },{
                text : 'Operadores',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-operadores'
            },{
                text : 'Servicio Técnico',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-serviciotecnico'
            },{
                text : 'Vigicontrol',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-vigicontrol'
            },{
                text : 'CRM',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-crm'
            },{
                text : 'Sistema',
                expanded : false,
                leaf: false,
                iconCls : 'icon-categ-sistema'
            },{
                text : 'SmartPanics',
                expanded : false,
                leaf: false,
                iconCls : 'icon-smartpanic'
            },{
                text : 'TrackGuard',
                expanded : false,
                leaf: false,
                iconCls : 'SgTrackGuard-icon'
            },{
                text : 'CleanApp',
                expanded : false,
                leaf: false,
                iconCls : 'SgCleanApp-icon'
            },{
                text : 'Control de tiempo y asistencia',
                expanded : false,
                leaf: false,
                iconCls : 'icon-reporte-cronogramatecnico'
            },{
                text : 'MoneyGuard',
                expanded : false,
                leaf: false,
                iconCls : 'icon-moneyguard-16'
            }
        ]
    }
        
});

