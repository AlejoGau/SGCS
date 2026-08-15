//MIGRADO2024
Ext.define('Common.model.SoftguardTestModel', {
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
    	{name:'tst_ncada',type:'int',defaultValue:0},
        {name:'tst_ntipo',type:'int',defaultValue:0},
        {name:'tst_ireinicio',type:'int',defaultValue:0},
        {name:'tst_calarma',type:'string'},
        {name:'tst_ncada2',type:'int',defaultValue:0},
        {name:'tst_ntipo2',type:'int',defaultValue:0},
        {name:'tst_calarmaesperada',type:'string'},
        {name:'tst_calarmagenerar',type:'string'},
        {name:'tst_ncada3',type:'int',defaultValue:0},
        {name:'tst_ntipo3',type:'int',defaultValue:0},
        {name:'tst_calarma3esperada',type:'string'},
        {name:'tst_calarma3generar',type:'string'},
        
        {name:'tst_cAlarmaAutoprocesa',type:'string'},
        {name:'tst_cAlarma2Autoprocesa ',type:'string'},
        {name:'tst_cAlarma3Autoprocesa ',type:'string'},
        {name:'tst_iTiempoCtrl',type:'int',defaultValue:0},
        {name:'tst_iCtrlExec',type:'int',defaultValue:0},
        {name:'tst_cAlarmaCtrlGenerar',type:'string'}
    ],
    proxy: {
        type: 'softguardtestproxy',
        url: '/Rest/Cuenta/{0}/Test',
        replaceIdRegex: /\{0\}/,
        appendId: true,
    }
});
															