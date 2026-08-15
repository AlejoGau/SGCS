//MIGRADO2024
Ext.define('Common.controller.MetadataController', {
    extend: 'Ext.app.Controller',
        	stores : [  ],
			models : [  ],
			views : [ 'MetadataGridView' ],
    refs: [
    {
        ref: 'statusBar',
        selector: '#statusbar'
    }
    ],
    init: function () {
        // genero los eventos
        this.control({
            'metadatagridview': {
                beforeload: this.loadEvent,
                beforerender: this.loadData,
                propertychange: this.onPropertyChange
            },
            
            'metadatagridview [action=metasave]': {
                click: this.onSaveClick
            },
            
            'metadatagridview [action=metadelete]': {
                click: this.onDeleteClick
            },
            
            'metadatagridview [action=metaadd]': {
                click: this.onAddClick
            }
            
        });
    }, // cierro init
     loadEvent: function (store, operation, options) {
        console.log('loaddata:',arguments);
    },
    
    loadData: function (panel) {
        var _ObjectId = panel.record.get('Id');
        var _ObjectTypeName = panel.record.get('ObjectTypeName');
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/'+_restPath+'/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
        
        Ext.Ajax.request({
          url: url,
          scope: this,
          panel: panel,
          success: function(resp,operation) {
            var metadata = Ext.JSON.decode(resp.responseText);
            this.setMetadata(metadata,operation.panel);
          }
        });
    },
    
    onSaveClick: function(button){
        var grid = button.up('propertygrid');
        this.updateMetadata(grid);
    },
    
    onAddClick: function(button){
        var grid = button.up('propertygrid');
        this.showPropertyDialog(grid);
    },
    
    onDeleteClick: function(button){
        var grid = button.up('propertygrid');
        //var object = grid.source;
        Ext.Msg.prompt('Eliminar propiedad', 'Nombre:', function(btn, text){
            if (btn == 'ok'){
                grid.removeProperty(text);
            }
        },this);
    },
    
    setMetadata: function(object,panel){
        panel.setSource(object);
    },
    
    showPropertyDialog: function(panel){
        var object = panel.source;
        Ext.Msg.prompt('Metadata', 'Nombre de la Propiedad:', function(btn, text){
            if (btn == 'ok'){
                object[text]='';
                panel.setSource(object);
            }
        },this);
        
    },
    
    updateMetadata: function(panel){
        var _ObjectId = panel.record.get('Id');
        var _ObjectTypeName = panel.record.get('ObjectTypeName');
        var url = '/rest/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
        var json = Ext.encode(panel.source);
        console.log(json, panel.source, panel);
        Ext.Ajax.request({
          url: url,
          method: 'POST',
          params: json,
          scope: this,
          panel: panel,
          success: function(resp,operation) {
            // quitar dirty de la interfaz si aplica
          }
        });
    },
    
    onPropertyChange: function(newObject){
        //marcar como dirty en la interfaz
    }
});