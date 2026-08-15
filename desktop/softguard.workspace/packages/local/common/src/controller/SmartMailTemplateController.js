//MIGRADO2024
Ext.define( 'Common.controller.SmartMailTemplateController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.SmartMailTemplateModuleStore' ],
    models: [ 'SmartMailTemplateModel' ],
    views: [ 'SmartMailTemplateView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'smartmailtemplateview': {
                beforerender: this.initView,
            }
        });
    }, // cierro init
    initView: function(view ) {
        var objectId = view.objectId;
        var record = view.record;
        if( record ) {
            this.setRecord( record, view );
        } else {
            console.log( 'load' );
            this.loadRecord( objectId, view );
        }
    },
    loadRecord: function(objectId, view ) {
        record = this.getSmartMailTemplateModelModel();
        if( objectId == 0 ) {
            var now = new Date();
            var myobject = record.create( {
                DateCreated: new Date(),
                Name: getLocale( 'Nuevo template' )
            });
            myobject.save( {
                scope: this,
                callback: function( record, operation ) {
                    this.setRecord( record, view );
                    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
                    var mytab = panel.down( '[title="Templates"]' );
                    mytab.down( 'pagingtoolbar' ).doRefresh();
                }
            });
        } else {
            record.load( objectId, {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        this.setRecord( record, view );
                    }
                },
                scope: this
            });
        }
    },
        
    setRecord: function(record, viewport ) {
        var myPanel = viewport.down( 'tabpanel' );
        var targetTab = viewport.targetTab;
        var title = getLocale( 'Informacion' );
        myPanel.record = record;
        // si center es un tabpanel agrego el tab, 
        // sino supongo que el form esta cargado y le agrego el record
        var mytab = myPanel.down( '[title=' + title + ']' );
        if( !mytab ) {
            var newTab = Ext.widget( 'smartmailtemplatedatosview', {
                record: record,
                title: title,
                targetTab: myPanel,
                closable: false
            });
            // agrego la paleta creada
            myPanel.add( newTab );
            myPanel.setActiveTab( newTab );
        }
        // el existe, lo activo
        else {
            myPanel.setActiveTab( mytab );
        }
        var _module = viewport.down( 'moduletreeview' );
        if( _module != null ) {
            _module.down( 'treeview' ).record = record;
            _module.record = record;
            _module.targetTab = myPanel;
            _module.down( 'treeview' ).targetTab = myPanel;
        }
    }
});