//MIGRADO2024
Ext.define( 'Common.controller.t_instaladoresdealerGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 't_instaladoresdealerSearchModel', 't_instaladoresdealerModel', 'TablasInstaladoresModel' ],
views: [ 't_instaladoresdealerGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            't_instaladoresdealergridview': {
                afterrender: this.initView,
                selectedDealer: this.onSelectedDealer,
                objectDelete: this.onDelete
            },
            't_instaladoresdealergridview button[action=search]': {
                click: this.onSearchClick
            },
            't_instaladoresdealergridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_instaladoresdealergridview button[action=add]': {
                click: this.onAdd
            },
            't_instaladoresdealergridview button[action="delete"]': {
                click: this.onDeleteClick
            }
        });
},
onSelectedDealer: function (selection, view ) {
    var controller = this;
    var cantGuardados = 0;

    Ext.Array.each( selection, function( v, k ) {
        // Preparar datos para inserción manual
        var data = {
            Id: 0,
            Name: v.get( 'Name' ) || v.get( 'lin_crazonsocial' ) || 'Dealer-Instalador',
            ObjectTypeId: 3080,
            ObjectTypeName: 't_instaladoresdealer',
            tid_iidInstalador: view.record.get( 'Id' ),
            tid_iidDealer: v.get( 'Id' ),
            lin_ccodigo: v.get( 'lin_ccodigo' ),
            lin_crazonsocial: v.get( 'lin_crazonsocial' )
        };

        console.log('DEBUG - Insertando dealer-instalador con AJAX:', data);

        Ext.Ajax.request({
            url: '/Rest/t_instaladoresdealer/?_dc=' + new Date().getTime(),
            method: 'POST',
            jsonData: data,
            timeout: 30000,
            success: function(response) {
                try {
                    var result = Ext.decode(response.responseText);
                    console.log('DEBUG - Respuesta inserción dealer:', result);

                    cantGuardados++;
                    if( selection.length <= cantGuardados ) {
                        view.store.load();
                    }
                } catch (e) {
                    console.error('Error al procesar respuesta dealer:', e);
                }
            },
            failure: function(response) {
                console.error('Error AJAX dealer:', response);
                cantGuardados++;
                if( selection.length <= cantGuardados ) {
                    view.store.load();
                }
            }
        });
    });
},
initView: function(view ) {
    var instaladorId = view.record.get('Id');

    // Si es un ID temporal de Sencha o no válido, usar 0
    if (isNaN(instaladorId) || instaladorId.toString().indexOf('Model-') > -1) {
        instaladorId = 0;
    }
    view.filters = [
        {
            property: 'tid_iidInstalador',
            value: view.record.get( 'Id' )
        }
    ];

    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getT_instaladoresdealerSearchModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );


    view.store.load();
},
    
objectChanged: function (view ) {
    view.store.load();
},
    
    
  
    
onAdd: function(grid, record, item, index, e, options ) {
    var view = grid.up( 't_instaladoresdealergridview' );
    var view = Ext.widget( 'dealerhelperview', {
        caller: view,
        record: view.record
    });
    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: getLocale( 'Deales' ),
        width: 600,
        height: 450,
        border: false,
        closeAction: 'destroy',
        items: view
    });
    win.show();
},    
    
   
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'tablaslineasgridview' );
    var store = view.getStore();
    store.clearFilter();
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );
},
    
    
    
onDelete: function(rec, view ) {
    if( rec ) {
        var dealerId = rec.get('Id');

        console.log('DEBUG - Eliminando dealer-instalador con AJAX:', dealerId);

        Ext.Ajax.request({
            url: '/Rest/t_instaladoresdealer/' + dealerId + '?_dc=' + new Date().getTime(),
            method: 'DELETE',
            timeout: 30000,
            success: function(response) {
                try {
                    var result = Ext.decode(response.responseText);
                    console.log('DEBUG - Respuesta eliminación dealer:', result);

                    view.store.remove( rec );
                    notify( 'Se elimino exitosamente' );
                    view.store.load();
                } catch (e) {
                    console.error('Error al procesar respuesta eliminación:', e);
                    notify( 'Se elimino exitosamente' );
                    view.store.remove( rec );
                    view.store.load();
                }
            },
            failure: function(response) {
                console.error('Error AJAX eliminación dealer:', response);
                notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                view.store.load();
            }
        });
    }
}
});