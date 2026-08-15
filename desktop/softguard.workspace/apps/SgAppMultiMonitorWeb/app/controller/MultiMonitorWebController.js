Ext.define( 'SgAppMultiMonitorWeb.controller.MultiMonitorWebController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [  ],
views: [ 'ExtUxNotification' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'viewport': {
            afterrender: this.initview
        }
    });
}, // cierro init

initview: function(view ) {

    /** tomo los permisos de webdealer o admin cuenta **/
    var modules = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );

    if( modules.isModuleAvailable( 'WebDealer' ) ) {
        this.application._nameModule = 'WebDealer';
    } else if( modules.isModuleAvailable( 'Administrator' ) ) {
        this.application._nameModule = 'Administrator';
    } else if( modules.isModuleAvailable( 'SgAppMultiMonitorWeb' ) ) {
        this.application._nameModule = 'SgAppMultiMonitorWeb';
    } else {
        notify( getLocale( 'El modulo de multimonitor requiere los permisos de Webdealer, MasterWebDealer o Admin cuentas' ) )
    }

    if( modules.isModuleAvailable( this.application._nameModule ) && !modules.getModuleAvailable( this.application._nameModule ).get( '_Security' ) && this.application._nameModule != 'Administrator' ) {
        notify( getLocale( '%Verifique que los permisos esten definidos para% ' + this.application._nameModule ) )
    }
    this.application._idModule = this.application.getModuleIdByName( this.application._nameModule );

    var tab = view.down( 'tabpanel' );
    var sorters = []
    sorters.push( {
        property: 'rec_tfechahora',
        direction: 'DESC'
    });

    var tr = tab.add( Ext.widget( 'eventosautorefreshview', {
        title: 'Eventos tiempo real',
        showMaximizer: false,
        layout: 'fit',
        mostrar: 2000,
        //estados: 0,

        sorters: [
            {
                property: 'r.rec_tfechahora',
                direction: 'DESC'
            }
        ]
    }) );

    tab.add( Ext.widget( 'procesamientotrgridview', {
        title: 'Procesamiento tiempo real'
    }) );



    //{xtype:"eventostrgridview",showMaximizer:false,id: 'center',itemId: 'center',region: 'center'}
    tab.add( Ext.widget( 'eventostrgridview', {
        title: 'Histórico de eventos',
        showMaximizer: false,
        mostrar: 2000,
        sorters: [
            {
                property: 'rec_tfechahora',
                direction: 'DESC'
            }
        ]
    }) );

    tab.add( Ext.widget( 'eventospendientestrgridview', {
        title: 'Eventos pendientes',
        itemId: 'tabpendientes',
        estados: '0',
        showprocesartodos: false,
        noshowprocesarporlotes: true,
        hideprocesomultiple: true,
        sorters: sorters
    }) );

    tab.setActiveTab( tr );

    tab.add( Ext.widget( 'eventosenfallorestauraciongridview', {
        title: 'Eventos en fallo restauracion',
        itemId: 'tabfallos'

    }) );


    tab.add( Ext.widget( 'eventosenfallotesteogridview', {
        title: 'Eventos en fallo testeo',
        itemId: 'tabfallostesteo'

    }) );
},

openObjectList: function() {
    /*
    var view = Ext.widget('eventosTRgridview');
    view.closable = false;

    var myPanel = Ext.getCmp('center');
    myPanel.add(view);
    myPanel.setActiveTab(view);
    */
},

openObjectById: function(objectId ) {
    notifyError( 'Opción no soportada' );
}
    
});