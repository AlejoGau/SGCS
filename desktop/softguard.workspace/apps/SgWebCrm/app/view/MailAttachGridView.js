Ext.define('SGWebCrm.view.MailAttachGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mailattachgridview'],
    title : '',
    autoHeight : true,
    hideHeaders: true,
    searchName: 'attachfile',
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-delete',
                    tooltip: getLocale('Eliminar archivo'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('mailattachgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('deleteattach',rec,view);
                    }
                }
            ]
        },{
    		xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'Name',
            flex: 1,
            // renderer con nombre + tamaño
			sortable : true			
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        
        //('deleteattach', 'deleteall');
        
        this.view.targetTab = this.targetTab;
        var me = this;
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [ 
                Ext.create('Common.view.UploadButton', {
                    text: 'Adjuntar archivo',
                    iconCls:'icon-application-link',
                    plugins: [{
                                  ptype: 'uploadwindow',
                                  title: getLocale('Adjuntar archivo'),
                                  width: 520,
                                  height: 350
                              }],
                	uploader: 
            		{
            			url: '/Rest/upload/new?search='+this.searchName,
                        autoStart: true,
            			uploadpath: '',
                        multi_selection: false,
                    	autoStart: true,
            			maxFileSize: '2020mb',
            			
            			dropElement: 'center-body',
            			
            			statusQueuedText: getLocale('Listo para subir'),
            			statusUploadingText: getLocale('Uploading')+' ({0}%)',
            			statusFailedText: '<span style="color: red">'+getLocale('Error')+'</span>',
            			statusDoneText: '<span style="color: green">'+getLocale('Complete')+'</span>',
            
            			statusInvalidSizeText: getLocale('Archivo demasiado grande'),
            			statusInvalidExtensionText: getLocale('Tipo de archivo inválido')
            		},
            		listeners: 
            		{
            			filesadded: function(uploader, files)								
            			{
            				//uploader.start();
            				return true;
            			},
            			
            			beforeupload: function(uploader, upload){
                            var record = me.record;
                            
                            if (record.get('Id') == 0){
                                notifyError('Debe guardar el programa antes de adjuntar archivos.');
                                return false;
                            }
                            
                            var url = '/Rest/upload/new?search='+me.searchName;
                            var filename = upload.files[0].name;
                            var fileType = /.*\.(\w+)/g.exec(filename)[1].toLowerCase();
                                                      
                            url = Ext.urlAppend(url,'fileName='+record.get('ObjectTypeId')+'_'+record.get('Id')+'_'+filename);
                            
                            if (this.path){
                                url = Ext.urlAppend(url,'Path='+me.path);
                            }
                            
                            uploader.uploader.settings.url = url
            			},
            
            			fileuploaded: function(uploader, file){
                            var record = me.record;
                            var filename = record.get('ObjectTypeId')+'_'+record.get('Id')+'_'+file.name;
                            var fileSize = Ext.util.Format.fileSize(file.size);
                            var fileType = /.*\.(\w+)/g.exec(filename)[1].toLowerCase();

                    
                            if (record){
                                // si estoy en un programa
                                if (record.get('ObjectTypeName') == 'SmartMailProgram'){
                                    var attach = Ext.create('SGWebCrm'+'.model.SmartMailProgramAttachModel',{
                                        Id: 0,
                                        Name: filename,
                                        ProgramId: record.get('Id')
                                    });
                                    
                                    attach.save({callback: function(record, operation){
                                        // actualizo la grilla
                                        me.getStore().load();
                                    }});
                                } else {
                                    // si estoy en un template
                                    var attach = Ext.create('SGWebCrm.model.SmartMailProgramAttachModel',{
                                        Name: filename
                                    });
                                    
                                    attach.save({callback: function(attach, operation){
                                        // grabo la relacion
                                        var relationModel = 'SGWebCrm.model.RelationModel';
                                        var relation = Ext.create(relationModel);
                                        relation.set('ObjectTypeId',record.get('ObjectTypeId'));
                                        relation.set('ObjectId',record.get('Id'));
                                        relation.set('RelationObjectTypeId',attach.get('ObjectTypeId'));
                                        relation.set('RelationObjectId',attach.get('Id'));
                                        
                                        // guardo la relacion
                                        relation.save({callback: function(){
                                            // actualizo la grilla
                                            me.getStore().load();
                                        }})
                                        
                                        
                                        
                                        
                                    }});
                                }
                                
                            }                     
            			},
            			
            			uploadcomplete: function(uploader, success, failed)								
            			{
                            if (failed.length > 0){
                                notify('Falló la subida de '+failed.length+' archivos.')
                            }
            				
            			},
            			scope: this
            		}
                })
            ]// cierro items
         }); 

         this.addDocked(toolbar);

    },
    setFolder: function(folder){
        var store = this.getStore();
        var name = folder.get('Name');
        var path = folder.get('Path')?folder.get('Path')+'/':'';
        this.setTitle('Archivos: '+path+name);
        store.folder = folder;
        this.folder = folder;
        store.filter({
            property: 'FolderId',
            value: folder.get('Id'),
            id: 'FolderId'
        });
    }
});
