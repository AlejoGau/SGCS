Ext.define( 'WebMG.controller.RemesaExportFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 't_condiciones_pago_fcSearchModel', 't_organizacion_fcSearchModel' ],
    views: [ 'RemesaExportFormView' ],

    init: function(config ) {
        // genero los eventos
        this.control( {
            'remesaexportformview': {
                afterrender: this.initview
            },
            'remesaexportformview button[action="export"]': {
                click: this.onExportClick
            },
            'remesaexportformview #organizacionfacturadora': {
                change: this.onOrganizacionFacturadoraChange
            },
            'remesaexportformview #condicionpago': {
                select: this.onCondicionPagoSelect
            }
        });
    }, 

    initview: function(view ) {
        // var record = view.record;
        var controller = this;

        var CondicionPagoStore = Ext.create( 'Ext.data.Store', {
            model: controller.getT_condiciones_pago_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        })

        var condicionpago = view.down( '#condicionpago' );
        condicionpago.bindStore( CondicionPagoStore );
        CondicionPagoStore.load();

        var organizacionFacturadoraStore = Ext.create( 'Ext.data.Store', {
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        })

        view.down( '#organizacionfacturadora' ).bindStore( organizacionFacturadoraStore )

        organizacionFacturadoraStore.load( {
            callback: function( records ) {
                if( records.length <= 0 ) {
                    Ext.MessageBox.alert( 'Falta configuracion', 'Es necesario tener creadas las las las organizaciones facturadoras. Ingrese a AdministratorSearch para crearlas.', function() { });
                    return false;
                } else if ( records.length == 1 ) {
                    view.down( '#organizacionfacturadora' ).select(records[0]);
                }
            }
        })
    },    

    onOrganizacionFacturadoraChange: function(combo, newvalue, oldvalue){
        var view = combo.up('remesaexportformview');
        var condicionpagoStore = view.down('#condicionpago').getStore();
        condicionpagoStore.filter(
            [
                {
                    property: 'con_orgidcodigoid',
                    value: newvalue,
                    id: 'con_orgidcodigoid'
                },{
                    property: 'con_iRemesa:GTINT',
                    value: 0,
                    id: 'con_iRemesa'
                }
            ]
        );
    },

    onCondicionPagoSelect: function(combo, records){
        var view = combo.up('remesaexportformview');
        view.condicionpagorecord = records[0];
        view.down('#export').enable();
    },
        
    onExportClick: function(button, event, options ) {
        var view = button.up('remesaexportformview');
        // me fijo que tipo de remesa es para saber a donde llamar
        var rem_cidentificacion = view.condicionpagorecord.get('rem_cidentificacion');

        if (rem_cidentificacion == 'visa'){
            // preparo el nombre del archivo
            var dt = Date.now();
            var filename = 'DEBLIQD_'+Ext.Date.format(dt, 'Ymd')+'.txt';
            // llamo al handler
            var url = '/handler/remesaVisaPrisma?con_idkey='+view.condicionpagorecord.get('con_idKey')+'&filename='+filename;
            window.open(url);
        }
    }
});