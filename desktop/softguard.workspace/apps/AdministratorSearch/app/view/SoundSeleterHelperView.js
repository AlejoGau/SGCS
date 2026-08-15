//Ext.require('FileManager.view.GridFeatureTileView')

window.ondragenter = function(e)
{
    e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    return false;
};

window.ondragover = function(e)
{
    e.preventDefault();
    return false;
};

window.ondrop = function(e)
{
    return false;
};

window.ondragleave = function(e)
{
    return false;
};


Ext.define('AdministratorSearch.view.SoundSeleterHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.soundsgridview',
    title : '',
    id: 'filegridview',
    Id: 'filegridview',
    itemId: 'filegridview',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    
    config: {
         searchName: ''
    },
    
    
    columns : [
        {
    		xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'Name',
			sortable : true,
            flex:1
		},{
    		xtype : 'gridcolumn',
			header : 'Creación',
            dataIndex : 'CreationTime',
			sortable : true	,
            flex:1		
		},{
        	xtype : 'gridcolumn',
			header : 'Tamaño',
            dataIndex : 'Weight',
            width : 80,
            renderer: Ext.util.Format.fileSize,
			sortable : true			
		},{
            xtype:'actioncolumn',
            width:40,
            items: [{
                iconCls: 'icon-sound',
                tooltip: getLocale('Descargar'),
                handler: function(grid, rowIndex, colIndex) {
                    var view = grid.up('soundsgridview')
                    var rec = grid.getStore().getAt(rowIndex);
                    if(view.audio && !view.audio.paused) {
                        view.audio.pause();
                    }
                    view.audio = new Audio(rec.get('VirtualPath'));
                    view.audio.play();
                }
            }]
        }
    ],
    
    setSearch: function(){
        
    },
    
    initComponent: function () {
        this.callParent(arguments);   
        var me = this;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                Ext.create('command.view.UploadButton', {
                            itemId: 'dragupload',
                            iconCls: 'icon-book-add',
                            text: 'Subir Archivo',
                            plugins: [{
                                          ptype: 'uploadwindow',
                                          title: 'Subir Archivo',
                                          width: 350,
                                          height: 150
                                      }
                            ],
                            uploader: 
                    		{
                    			url: '/rest/upload/new?search=softguardMiscFile',
                    			uploadpath: 'codAlarmSound',
                                multi_selection: true,
                    			autoStart: true,
                    			maxFileSize: '50mb',
                    			
                    			dropElement: 'filegridview',
                    			
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
console.log(arguments)
                                    var validExtensions = ['mp3','wav'];
                                    var valid = true;

                                    Ext.Array.each(files, function (v) {                
                                        var fileName = v.name.split('.')
                                        var fileObj = {
                                            name : v.name,
                                            valid : false
                                        }
                                        
                                        validExtensions.map(function (extesionValid) {
                                            
                                            if(extesionValid == fileName[fileName.length-1]) {
                                                fileObj.valid = true;
                                            }

                                        })
                                        if(fileObj.valid == false) {
                                            valid = false;
                                            return false;
                                        }
                                    })

                                    if(valid) {
                                        return true;
                                    } else {
                                        return false;
                                        notify('Uno o varios archivos no son sonido.')
                                    }
                    				
                    			},
                    			
                    			beforeupload: function(uploader, file)								
                    			{
                                     var url = '/rest/upload/new?';
                                        url = Ext.String.urlAppend(url,'search=SoftguardMiscFile');
                                     //   url = Ext.String.urlAppend(url,'createFolder=true');
                                        url = Ext.String.urlAppend(url,'Path='+this.path);
                                     
                                     uploader.uploader.settings.url = url
                    			},
                    
                    			fileuploaded: function(uploader, file)								
                    			{
                    				//console.log('fileuploaded');
                    			},
                    			
                    			uploadcomplete: function(uploader, success, failed)								
                    			{
                    				var file = success.pop();
                                    this.refresh();
                    			},
                    			scope: this
                    		}
                        })
            ]
        }); 
        this.addDocked(toolbar);
        
        
    },
    
    refresh: function(){
        var store = this.getStore();
        store.load({scope:store});
    },
    
    setPath: function(path){
        var store = this.getStore();
        this.setTitle('Archivos: '+path);
        store.path = path;
        store.load({scope:store});
        this.path = path;
    }
});