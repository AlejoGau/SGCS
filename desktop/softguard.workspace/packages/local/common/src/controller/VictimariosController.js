//MIGRADO2024
Ext.define( 'Common.controller.VictimariosController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'VictimariosModel', 'VictimariosSearchModel', 'TablasInstaladoresSearchModel' ],
views: [ 'VictimariosView', 'DatosVictimarioView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'victimariosview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'victimariosview button[action=search]': {
                click: this.onSearchClick
            },
            'victimariosview button[action=getall]': {
                click: this.onGetAllClick
            },
            'victimariosview button[action=add]': {
                click: this.onAdd
            },
            'victimariosview button[action=seleccionarCuenta]': {
                click: this.onSeleccionarCuenta
            },
        });
},
initView: function(view ) {
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getVictimariosSearchModelModel(),
        pageSize: 1000,
        page: 1,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters,
    })
    console.log(view.store)
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );
    this.onSearchClick( view )
},
    
objectChanged: function (view ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
    
    
onAdd: function(btn, record, item, index, e, options ) {
    var panel = btn.up( 'victimariosview' )
    var title = 'Nuevo Victimario';
    var mytab = panel.up('tabpanel').down('victimariosformview');
    var tabpanel = panel.up('tabpanel');
    var model = this.getVictimariosModelModel();
    var myobject = model.create( {
    });
    if( !mytab ) {
        var newTab = Ext.widget( 'victimariosformview', {
            title: title,
            targetTab: panel,
            closable: true
        });
        newTab.record = myobject
        newTab.newvic = true
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    }
    /** 
    console.log(Ext.getCmp('center'))
    var id = 0;
    var view = grid.up('victimariosview');
    var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
    var title = 'Nuevo Victimario';
    
    
    model = this.getVictimariosModelModel();
     
        
    var myobject = model.create({
    });            
    	
    var viewwin = Ext.widget('tablasinstaladoresformview',{
        caller: view,
        record: myobject,
        objectId : id,
        createDealer: view.createDealer?view.createDealer:null
    });
    
    var win = Ext.create('Ext.Window', {
        iconCls: 'icon-table-add',
        layout : 'fit',
        title : title,
        width : 450,
        height : 400,
        border : false,
        items : viewwin
    });
    win.show();
    */
},    
    
   
onItemClick: function(btn, record, item, index, e, options ) {
    console.log( 'entre a victima' )
    var id = record.get( 'Id' );
    var tabpanel = btn.up( 'tabpanel' );
    var title = record.get( 'vic_cApellido' ) + ', ' + record.get( 'vic_cNombre' );
    var mytab = tabpanel.down( 'victimariosformview' );
    var victimario = this.getVictimariosModelModel();
    if( !mytab ) {
        var newTab = Ext.widget( 'victimariosformview', {
            title: title,
            targetTab: mytab,
            closable: true
        });
        victimario.load( id, {
            callback: function( recordx ) {
                newTab.idModel = id
                newTab.record = recordx
                newTab.newvic = false
                tabpanel.add( newTab );
                tabpanel.setActiveTab( newTab );
            }
        })
    }
    /**
    var view = grid.up('tablasinstaladoresgridview');
    var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
    var title = record.get('ins_cnombre');
    
    
    if(view.readOnly) {
        return false;
    }
     var view = Ext.widget('tablasinstaladoresformview',{
        caller: grid,
        record: record,
        objectId : id,
    });
    
    var win = Ext.create('Ext.Window', {
        iconCls: 'icon-table-add',
        layout : 'fit',
        title : title,
        translate: false,
        width : 450,
        height : 510,
        border : false,
        items : view
    });
    win.show();
     */
},     
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'victimariosview' ) ? button.up( 'victimariosview' ) : button;
    var store = view.getStore();
    store.proxy.extraParams.idKeyCuenta = '';
    store.clearFilter( true );
    store.load();
    view.down( '#fieldName' ).setValue( '' );
    view.down( '#fieldApellido' ).setValue( '' );
    view.down( '#fieldDni' ).setValue( '' );
    view.down( '#fieldLocalidad' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'victimariosview' ) ? button.up( 'victimariosview' ) : button;
    var store = view.getStore();
    var id
    var nombre = view.down( '#fieldName' ).getValue();
    var apellido = view.down( '#fieldApellido' ).getValue();
    var dni = view.down( '#fieldDni' ).getValue();
    var localidad = view.down( '#fieldLocalidad' ).getValue();
    var objetivo = view.down( '#idcuenta' ).getValue();
    var filters = [];
    if( view.idCuentaPrin ) {
        store.proxy.extraParams.idKeyCuenta = view.idCuentaPrin;
    }
    if( nombre != '' ) {
        filters.push( {
            property: 'vic_cNombre:LIKE',
            value: nombre
        });
    }
    if( apellido != '' ) {
        filters.push( {
            property: 'vic_cApellido:LIKE',
            value: apellido
        });
    }
    if( dni != '' ) {
        filters.push( {
            property: 'vic_cIdentificacion:LIKE',
            value: dni
        });
    }
    if( localidad != '' ) {
        filters.push( {
            property: 'vic_cLocalidad:LIKE',
            value: localidad
        });
    }
    if( objetivo ) {
        store.proxy.extraParams.idKeyCuenta = objetivo;
    } else {
        store.proxy.extraParams.idKeyCuenta = view.idCuentaPrin;
    }
    store.clearFilter( true );
    store.filter( filters );
    if( filters.length == 0 ) {
        store.load();
    }
},
    
onSeleccionarCuenta: function (button, events, eOps ) {
    var view = button.up( 'victimariosview' );
    //view.win = win;
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione Cuentas',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'cuentahelperview',
                filterTipo: 'nofilter',
                caller: view
                // filterTipo: 5,
                // tip_ncondicion: "3"
            }
        ]
    });
    win.show();
},
    
onCuentaSelected: function (selection, view, recordPreSelected ) {
    var controller = this;
    console.log( controller );
    Ext.Array.each( selection, function( record ) {
        var cueiid = record.get( 'cue_iid' );
        var nombre = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
        view.down( '#idcuenta' ).setValue( cueiid )
        view.down( '#nombrecuenta' ).setValue( nombre )
        view.down( '#sacarcuenta' ).show();
    });
},
});