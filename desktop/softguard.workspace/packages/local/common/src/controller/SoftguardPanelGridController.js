//MIGRADO2024
Ext.define( 'Common.controller.SoftguardPanelGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SoftguardTablaPanelesModel', 'PanelSearchModel', 'PanelModel' ],
views: [ 'SoftguardPanelGridView', 'SoftguardPanelView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'panelgridview': {
            afterrender: this.initView,
            refresh: this.onRefresh,
            itemdblclick: this.onItemDblClick,
            eliminar: this.onEliminar
        },
        'panelgridview button[action=search]': {
            click: this.onSearchClick
        },
        'panelgridview button[action=new]': {
            click: this.onNuevoClick
        }
    });
}, // cierro init
onEliminar: function (rec, view ) {
    var controller = this;
    Ext.MessageBox.confirm( 'Eliminar', 'Esta a punto de eliminar  un panel, desea continuar ?', function( btn ) {
        if( btn === 'yes' ) {
            var model = controller.getPanelModelModel();
            model.load(rec.get("Id"),{
                callback: function(record,operation){
                    record.erase({
                        success: function(record, operation){
                            view.getStore().load();
                        }
                    });
                }
            });
            /*rec.setConfig({
				proxy: controlller.getPanelModelModel().getProxy()
			});
            rec.destroy()*/
        }
        else {
            //some code
        }
    });
},
    
onItemDblClick: function(view, recordSearch, item, index, e, options ) {
    var view = view.up( 'panelgridview' )
    var module = view.module;
    var profile = module.get( 'profile' );
    // var view = view.up('panelgridview')
    var model = this.getPanelModelModel();
    model.load(recordSearch.get('Id'),{
        callback: function(record){
            var _config = {
                record: record,
                caller: view,
                profile: profile
            };
            if( view.editorConfig ) {
                Ext.apply( _config, view.editorConfig );
            }
            console.log( "_config", _config )
            var newView = Ext.widget( 'panelformview', _config );
            // Lo agregamos al panel
            var myWindow = Ext.widget( 'window', {
                title: getLocale( 'Panel' ) + ' (' + record.get( 'pan_ccodigo' ) + ')',
                translate: false,
                height: 430,
                width: 800,
                modal: true,
                items: newView,
                closable: true,
                layout: 'fit'
            }).show();
        }
    });

},
    
onRefresh: function (view ) {
    view.store.load()
},
    
onNuevoClick: function(button, event, options ) {
    var view = button.up( 'panelgridview' );
    var controller = this;
    var model = this.getPanelModelModel();
    
    var myobject = model.create( {
        pan_iidcuenta: view.record.get( 'Id' )
    });
    myobject.set('Id',0);
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Nuevo panel',
        closeAction: 'destroy',
        height: 430,
        width: 750,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'panelformview',
                record: myobject,
                caller: view
            }
        ]
    });
    win.show();
},
    
initView: function(view ) {
    var module = view.module;
    var profile = module.get( 'profile' );
    if( profile < 2 ) {
        view.down( 'toolbar' ).hide();
        view.down( '#delete' ).hide();
    }
    var record = view.record;
    var filters = [];
    filters.push( {
        property: 'pan_iidcuenta',
        value: record.get( 'cue_iid' )
    });
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getPanelSearchModelModel(),
        remoteFilter: true,
        autoload: false,
        filters: filters
    });
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( store );
    view.bindStore( store );
    store.load( );
},
    
    
onSearchClick: function(button ) {
    var view = button.up( 'servtecgridview' );
    var store = view.getStore();
    var estado = view.down( '#estado' );
    var filters = [];
    if( estado.getValue() ) {
        filters.push( {
            property: 'stc_nestado',
            value: estado.getValue(),
            id: 'estado'
        });
    }
    store.filter( filters );
}
});