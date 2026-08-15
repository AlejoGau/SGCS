Ext.define('Common.view.SoftguardVehiculosGridView', {
    extend:'Ext.grid.GridPanel',
    alias: 'widget.gridvehicle',
    itemId: 'gridvehicle',
    collapsed: false,
    //autoHeight: true,
    //store: "SoftguardUsuarioStore",
    
    columns: [{
                xtype:'actioncolumn', 
                width:50,
                items: [{
                    iconCls: 'icon-userEdit',
                    tooltip: getLocale('Modificar datos'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('gridvehicle');
                        var rec = grid.getStore().getAt(rowIndex);
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
                        return '<img src="/gallery/' + record.get('usu_cimagen') + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >';
                },
                
                iconCls: 'icon-photo',  // Use a URL in the icon config
                tooltip: 'Ver imagen',
                handler: function(grid, rowIndex, colIndex) {
                    var view = this.up('gridvehicle')
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
                header: 'Marca',
                sortable: true,
				dataIndex: "usu_cmetadata",
                renderer: function(value){    									
                    var json = Ext.JSON.decode(value);
                    return json.brand;
				},
                width: 100
            },
            {
                xtype: 'gridcolumn',
                header: 'Modelo',
                sortable: true,
				dataIndex: "usu_cmetadata",
                renderer: function(value){    									
                    var json = Ext.JSON.decode(value);
                    return json.model;
				},                
                width: 100
            },{
                xtype : 'gridcolumn',
                header : 'Matrícula',
    			sortable : false,
    			dataIndex : 'usu_cmetadata',
                renderer: function(value){    									
                    var json = Ext.JSON.decode(value);
                    return json.domain;
				},                
                width: 80
            },{
                xtype : 'gridcolumn',
                header : 'Vencimiento VTV',
    			sortable : false,
    			dataIndex : 'usu_cmetadata',
                renderer: function(value){    									
                    if(value){
                        var json = Ext.JSON.decode(value);
                        var date = new Date(json.vtv);
                        var dd = String(date.getDate()).padStart(2, '0');
                        var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                        var yyyy = date.getFullYear();
                        if(dd && mm && yyyy)
                            return  dd + '/' + mm + '/' + yyyy;
                        else
                            return '';    
                    }else
                        return '';

				},                
                width: 80                
            },{
                xtype : 'gridcolumn',
                header : 'Seguro Vto.',
    			sortable : false,
    			dataIndex : 'usu_cmetadata',
                renderer: function(value){
                    if(value){
                        var json = Ext.JSON.decode(value);
                        var date = new Date(json.seguroVto);
                        var dd = String(date.getDate()).padStart(2, '0');
                        var mm = String(date.getMonth() + 1).padStart(2, '0');
                        var yyyy = date.getFullYear();
                        if(dd && mm && yyyy)
                            return  dd + '/' + mm + '/' + yyyy;
                        else
                            return ''    ;
                    }else{
                        return '';
                    }
				},
                width: 80
		    },{
                xtype: 'actioncolumn',
                header: 'Blacklist',
                itemId: 'blacklistCol',
                sortable: false,
                align: 'center',
                width: 70,
                items: [{
                    getClass: function(value, meta, record){
                        var raw = record.get('usu_cmetadata');
                        if (raw){
                            try {
                                var json = Ext.JSON.decode(raw);
                                if (json && json.blacklist){
                                    return 'icon-cross';
                                }
                            } catch(e) {}
                        }
                        return 'x-hidden';
                    },
                    getTip: function(){ return 'En Blacklist'; }
                }]
		    },{
                xtype: 'gridcolumn',
                header: 'Perfil de acceso',
                itemId: 'perfilCol',
                sortable: false,
                dataIndex: 'usu_cmetadata',
                width: 140,
                renderer: function(value){
                    if (!value) return '';
                    var json;
                    try { json = Ext.JSON.decode(value); } catch(e) { return ''; }
                    if (!json || !json.profileVehicleId) return '';

                    var perfilStore = Ext.getStore('ComboPerfilVehicleStore');
                    if (!perfilStore) return '';

                    // El id viaja en el JSON del metadata y puede venir como string.
                    var perfil = perfilStore.getById(parseInt(json.profileVehicleId, 10));

                    return perfil ? perfil.get('pfv_cNombre') : '';
                }
		    }
        ],
    
        setRecord: function(record){
            this.record=record;
            this.fireEvent('recordchanged', this);
        },

        initComponent: function () {
            this.callParent(arguments);

            var me = this;

            if (Ext.getApplication().getName() != 'AccessControl') {
                var blacklistCol = this.down('#blacklistCol');
                if (blacklistCol) {
                    blacklistCol.hide();
                }
                var perfilCol = this.down('#perfilCol');
                if (perfilCol) {
                    perfilCol.hide();
                }
            }

            // La columna Perfil resuelve el id del metadata contra este store, compartido
            // con el combo del form. El refresh repinta la grilla cuando llegan los perfiles.
            var perfilStore = Ext.getStore('ComboPerfilVehicleStore');
            if (!perfilStore) {
                perfilStore = Ext.create('Ext.data.Store', {
                    storeId: 'ComboPerfilVehicleStore',
                    model: 'Tablas.model.t_PerfilVehicleSearchModel',
                    pageSize: 500
                });
            }
            perfilStore.on('load', function () {
                if (me.getView()) {
                    me.getView().refresh();
                }
            });
            if (!perfilStore.isLoaded() && !perfilStore.isLoading()) {
                perfilStore.load();
            }

            this.onSelectChange = function (selModel, selections) {
                this.down('button[action=delete]').setDisabled(selections.length === 0);
            };

            this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
            
            // Trae conflico con la apertura de vistas en Sencha7 por no tener definido AppFolder.
            // if(t.appFolder != '/js/Cuenta') {
            //     this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
            // }

            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save',
                    hidden: true,
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
                    hidden:true,
                    itemId: 'delete'
                }, {
                    iconCls: 'x-tbar-loading',
                    text: 'Refresh',
                    action: 'refresh'
                },"-", {
                    iconCls: 'icon-add',
                    text: 'Importar desde una cuenta',
                    hidden: true,
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
         this.addDocked(toolbar);
        } // cierro initS
});