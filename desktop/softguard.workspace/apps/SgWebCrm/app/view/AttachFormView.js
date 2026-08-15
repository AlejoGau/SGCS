Ext.define('SGWebCrm.view.AttachFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.attachformview'],
    title : 'Propiedades',
    autoScroll: true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 120,
		anchor : '100%',
		labelAlign: 'left'					
	},
	items : [
        {
            xtype : 'displayfield',
            name : 'Id',    
            fieldLabel : 'Id'
		},{
    		xtype : 'textfield',
            name : 'Name',
			fieldLabel : 'Nombre',			
			allowBlank : false
		},{
            xtype: 'textfield',
            name: 'SmallComment',
            fieldLabel: 'Epígrafe'
        },{
            xtype: 'fieldset',
            title: 'Datos',
            collapsible: true,
            items:[{
            xtype: 'textfield',
            name: 'FullName',
            fieldLabel: 'Nombre original'
        },{
            xtype: 'displayfield',
            name: 'Format',
            fieldLabel: 'Tipo de archivo'
		},{
    	    xtype: 'displayfield',
            name: 'Weight',
            fieldLabel: 'Tamaño'
	    },{
            xtype: 'displayfield',
            name: 'Width',
            fieldLabel: 'Ancho'
    	},{
            xtype: 'displayfield',
            name: 'Height',
            fieldLabel: 'Alto'
        }]
        },{
            xtype: 'fieldset',
            title: 'Link',
            collapsible: true,
            items:[{
                xtype: 'textfield',
                name: 'Link',
                fieldLabel: 'Url'
                
            },
            {
                xtype: 'combobox',
                store:['_blank','_self','_parent'],
                name: 'Target',
                fieldLabel: 'Target'
            }]
        }
    ],
	initComponent : function() {
        me=this;
		this.callParent();
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    scope: this                    
                },Ext.create('Common.view.UploadButton', {
                text: 'Subir Archivos',
                iconCls:'icon-application-link',
                plugins: [{
                              ptype: 'uploadwindow',
                              title: 'Upload',
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
        			
        			statusQueuedText: 'Ready to upload',
        			statusUploadingText: 'Uploading ({0}%)',
        			statusFailedText: '<span style="color: red">Error</span>',
        			statusDoneText: '<span style="color: green">Complete</span>',
        
        			statusInvalidSizeText: 'File too large',
        			statusInvalidExtensionText: 'Invalid file type'
        		},
        		listeners: 
        		{
        			filesadded: function(uploader, files)								
        			{
        				//uploader.start();
        				return true;
        			},
        			
        			beforeupload: function(uploader, file){
                         var url = '/Rest/upload/new?search='+me.searchName;
                         var filename = file.files[0].name;
                         var fileType = /.*\.(\w+)/g.exec(filename)[1].toLowerCase();
                         var form = uploader.owner.up('attachformview');
                         var record = form.getRecord();
                         
                         url = Ext.urlAppend(url,'fileName='+record.get('Id'))+'.'+fileType;
                         
                         if (this.path){
                            url = Ext.urlAppend(url,'Path='+me.path);
                         }
                         
                         uploader.uploader.settings.url = url
        			},
        
        			fileuploaded: function(uploader, file){
                        var filename = file.name;
                        var fileSize = Ext.util.Format.fileSize(file.size);
                        var fileType = /.*\.(\w+)/g.exec(filename)[1].toLowerCase();
                        var form = uploader.owner.up('attachformview');
                        var record = form.getRecord();
                        record.set('Format',fileType);
                        record.set('FullName',record.get('Id')+'.'+fileType);
                        record.set('Weight',fileSize);
                        
                        form.loadRecord(record);
                        
                        var path ='/Rest/upload/get?search=attachfile&download=false&filename='+record.get('FullName');
                        //var path='/gallery/'+record.get('Id')+'.'+record.get('Format');
                        //record.set('Link',path);
                        var img=new Image();
                        img.src=path;
                        img.onload=function(){
                            record.set('Width',img.width);
                            record.set('Height',img.height);
                            
                            form.loadRecord(record);
                            record.save();
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
            }),
            {
                iconCls : 'icon-Highlight',
                text    : 'Destacar',
                action  : 'newHighlight',
                scope   : this 
            }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init

});