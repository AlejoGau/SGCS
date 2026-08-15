//MIGRADO2024
Ext.define('Common.view.SoftguardUsuarioGridView', {
    extend:'Ext.grid.GridPanel',
    alias: 'widget.griduser',
    itemId: 'griduser',
    collapsed: false,
    isControlAcceso: '',
    
    columns: [{
                xtype:'actioncolumn', 
                width:50,
                items: [{
                    iconCls: 'icon-userEdit',
                    tooltip: getLocale('Modificar datos'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('griduser');
                        var rec = grid.getStore().getAt(rowIndex);
                        if(isNaN(rec.id)){
                            rec.id = rec.data.usu_iid;
                            rec.data.Id = rec.data.usu_iid;
                        }
                        view.fireEvent('objectedit',rec,view);
                    }
                }/*,{
                    iconCls: 'icon-door-in',
                    tooltip: getLocale('Control de accesos'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('griduser');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('controlacceso',rec,view);
                    }
                }*/]
            },
            
            {
                xtype:'actioncolumn', 
                header: 'Foto',
                width:50,
                renderer: function(value, metadata,record){
                    if ( record.get('usu_cimagen'))
                        return '<img src="/gallery/' + record.get('usu_cimagen') + '" width="32" heigth="32" style="float:right" >';
                },
                
                iconCls: 'icon-photo',  // Use a URL in the icon config
                tooltip: 'Ver imagen',
                handler: function(grid, rowIndex, colIndex) {
                    var view = this.up('griduser')
                    var record = grid.getStore().getAt(rowIndex),
                        photo = record.get('usu_cimagen'),
                        name = record.get('usu_cnombre');
                    
                    
                    var tbar = [];
                    if (view.profile >= 2){
                        tbar = [Ext.create('Common.view.UploadButton', {
                                id: 'dragupload',
                                text: 'Subir Foto',
                                plugins: [{
                                              ptype: 'uploadwindow',
                                              title: 'Subir Foto',
                                              width: 350,
                                              height: 150
                                          }
                                ],
                                uploader: 
                        		{
                        			url: '/rest/upload/new?search=softguardMiscFile',
                        			uploadpath: '',
                                    multi_selection: false,
                        			autoStart: true,
                        			maxFileSize: '50mb',
                        			
                        			dropElement: 'fotoImage',
                        			
                        			statusQueuedText: getLocale('Listo para subir'),
                        			statusUploadingText: getLocale('Subiendo')+' ({0}%)',
                        			statusFailedText: '<span style="color: red">Error</span>',
                        			statusDoneText: '<span style="color: green">Completo</span>',
                        
                        			statusInvalidSizeText: 'Archivo demasiado largo',
                        			statusInvalidExtensionText: 'Formato inválido'
                        		},
                        		listeners: 
                        		{
                        			filesadded: function(uploader, files)								
                        			{
                        				return true;
                        			},
                        			
                        			beforeupload: function(uploader, file)								
                        			{
                                         var url = '/rest/upload/new?search=softguardMiscFile';
                                         if (this.path){
                                            url = url +'&Path='+me.path
                                         }
                                         
                                         uploader.uploader.settings.url = url
                        			},
                        
                        			fileuploaded: function(uploader, file)								
                        			{
                        				//console.log('fileuploaded');
                        			},
                        			
                        			uploadcomplete: function(uploader, success, failed)								
                        			{
                        				var file = success.pop();
                                        w.down('image').setSrc('/gallery/'+file.name);
            							record.set('usu_cimagen', file.name);
                                        
                                        record.save({
                                        callback : function(record, operation) {
                                            if (operation.success){
                                                notify('Los datos se guardaron con éxito');
                                            }
                                    	}
                                    });
                        			},
                        			scope: this
                        		}
                            }),
                            {
                                text: 'eliminar',
                                iconCls: 'icon-delete',
                                handler: function(){
                                    var win = this.up('window');
            						var record = win.record;
                                    record.set('usu_cimagen', '');
            						record.save();
                                    win.down('image').setSrc('/gallery/');
            						//win.close();
                                }
                            }
            			]
                    }
                
            		var w = Ext.widget('window', {
            			title : 'Foto: ',
            			height : 252,
            			width : 360,
            			closeAction : 'destroy',
            			border : false,
            			layout : 'fit',
                        record: record,
            			tbar:tbar,
            			items : [
            				{
            					xtype:'image',
            					src : '/gallery/' + photo,
                                id: 'fotoImage'
            				}
            			],
            			autoShow: true,
            			modal:true
            		});
                }
            },
            {
                xtype: 'gridcolumn',
                header: 'Código',
                sortable: true,
                dataIndex: "usu_icodigo",
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Nombre',
                sortable: true,
        		dataIndex: "usu_cnombre",
                width: 250
            },
            /*{
                xtype: 'gridcolumn',
                header: 'Identificador',
                sortable: true,
				dataIndex: "usu_iid",
                width: 100
            },*/
            {
                xtype: 'gridcolumn',
                header: 'Tipo',
                sortable: true,
				dataIndex: "usu_ntipo",
                renderer: function(value){
                    var isControlAcceso = this.isControlAcceso;
                    if (isControlAcceso == 1) {
                        var store = Ext.data.StoreManager.get('ControlAccesoStore');
                        var record = store.findRecord('Value', value);
                        if(record == undefined){
                            return '';
                        } else {
                            return record.get('Name');
                        }
                    } else if (isControlAcceso == 2) {
                        var store = Ext.data.StoreManager.get('ControlAccesoStore');
                        console.log(value)
                        if (value == 2 ){
                            return 'Visita'
                        }
                        if ( value == 1){
                            return 'Normal'
                        }
                        return ''
                    } else{
                        var storetu = Ext.data.StoreManager.get('SoftguardUsuarioTipoStore');
                        
                        var recordtu = storetu.findRecord('Value', value);
                        if(recordtu == undefined){
                            return '';
                        } else {
                            return recordtu.get('Name');
                        }
                        
                    }
				},
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Observación',
                sortable: true,
				dataIndex: "usu_mobservacion",
                width: 250
            },{
                xtype : 'gridcolumn',
                header : 'Clave',
    			sortable : false,
    			dataIndex : 'usu_cclave',
                itemId: 'usu_cclave',
                hidden: true,
                width: 80
		    }
        ],
    
        setRecord: function(record){
            this.record=record;
            this.fireEvent('recordchanged', this);
        },
        initComponent: function () {
            this.onSelectChange = function (selModel, selections) {
                this.down('button[action=delete]').setDisabled(selections.length === 0);
            };
            
            /*if(t.appFolder != '/js/SgAppAccessControl') {
                
            }*/
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                {
                    text: 'Guardar',
                    iconCls: 'icon-save',
                    action: 'save',
                    hidden: true, //se oculta el botón para evitar el guardar en modo synchronize
                    itemId: 'save'
                },
                {xtype: 'tbseparator'},
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete',
                    itemId: 'delete'
                }, {
                    iconCls: 'x-tbar-loading',
                    text: 'Refresh',
                    itemId: 'refresh',
                    action: 'refresh'
                },"-", {
                    iconCls: 'icon-add',
                    text: 'Importar desde una cuenta',
                    action: 'copyusers'
                },
                {xtype: 'tbseparator'},
                {
                    iconCls: 'icon-usuarios',
                    text: 'Ver usuario de cuenta madre',
                    hidden:true,
                    action: 'verusuariosmadre',
                    itemId: 'verusuariosmadre'
                }]
             }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
        } // cierro init
});