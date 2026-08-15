Ext.define( 'AdministratorSearch.controller.TablasPanelesGridController', {
    extend: 'Ext.app.Controller',
    stores: [ 'parametro_HIKVISIONP2RegionStore' ],
models: [ 'TablasPanelesModel', 'TablasPanelesSearchModel' ],
views: [ 'TablasPanelesGridView' ],

init: function(config ) {
    // genero los eventos
    this.control(
        {
            'tablaspanelesgridview': {
                refresh: this.initView,
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged

            },
            'tablaspanelesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaspanelesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaspanelesgridview button[action=add]': {
                click: this.onAdd
            },
            'tablaspanelesgridview button[action="delete"]': {
                click: this.onDeleteClick
            }


        });
},

initView: function(view ) {
    view.filters = [];
    
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getTablasPanelesSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters,
        sorters: [
            {
                property: 'pan_ccodigo',
                direction: 'ASC'
            }
        ]
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );

    view.store.load();
},
    
objectChanged: function (view ) {

    view.down( 'pagingtoolbar' ).doRefresh();

},
    
onAdd: function(grid, record, item, index, e, options ) {

    var id = 0;
    var view = grid.up( 'tablaspanelesgridview' );
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    var title = 'Nuevo panel';


    record = this.getTablasPanelesModelModel();


    var myobject = record.create( {
        'pan_ccodigo': ''
    });
    /*	myobject.save({
            scope : this,
            callback : function(record, operation) {
        */


    var view = Ext.widget( 'tablaspanelesformview', {
        caller: view,
        record: myobject,
    });

    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: title,
        width: 450,
        height: 250,
        border: false,
        items: view
    });
    win.show();

    /*         
         }
     });
*/


},    
    
    
   
onItemClick: function(grid, record, item, index, e, options ) {
    var id = record.get( 'Id' );
    var grid = grid.up( 'tablaspanelesgridview' );
    var panel = grid.targetTab ? grid.targetTab : Ext.getCmp( 'center' );
    var title = record.get( 'pan_cdescripcion' );

    var view = Ext.widget( 'tablaspanelesformview', {
        caller: grid,
        record: record,
    });

    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        caller: grid,
        layout: 'fit',
        title: title,
        width: 450,
        height: 500,
        translate: false,
        border: false,
        items: view
    });

    win.show();

},    
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},


onGetAllClick: function(button, event, options ) {

    var view = button.up( 'tablaspanelesgridview' );
    var store = view.getStore();
    store.clearFilter();
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );

},
    
onSearchClick: function(button, event, options ) {

    var view = button.up( 'tablaspanelesgridview' );

    var store = view.getStore();
    var fieldName = view.down( '#fieldName' ).getValue();
    var query = view.down( '#query' ).getValue();

    var filters = Ext.clone( view.filters );

    store.clearFilter( true );

    if( fieldName != '' ) {
        filters.push( {
            property: fieldName + ':LIKE',
            value: query
        });

    }

    if( filters.length > 0 ) {
        store.filter( filters );
    }
    else {
        store.clearFilter();
    }


},
    
onDeleteClick: function(button, event, options ) {

    var view = button.up( 'tablaspanelesgridview' );
    var selection = view.getSelectionModel().getSelection();


    if( selection ) {
        view.store.remove( selection );
        var delRec = view.store.getRemovedRecords();
        Ext.Array.each( delRec, function( rec ) {
            /**
             * BC 384713978 :Al cambiar a un Search para el armado de grilla y no usar el Objecto, debo al form bindearle el proxy del model nuevamente
             */
            var model = this.getTablasPanelesModelModel();
            rec.setConfig({
                proxy: model.getProxy()
            });
            rec.destroy( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se eliminio exitosamente' );
                        view.store.load();

                    }
                    else {
                        notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                    }
                }

            });

        }, this );


    }

}

});