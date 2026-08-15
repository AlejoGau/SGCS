//Ext.require('FileManager.view.GridFeatureTileView')
window.ondragenter = function( e ) {
    e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    return false;
};
window.ondragover = function( e ) {
    e.preventDefault();
    return false;
};
window.ondrop = function( e ) {
    return false;
};
window.ondragleave = function( e ) {
    return false;
};
Ext.define( 'Common.view.SoftguardDocumentosFileView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.documentosgridview',
    title: 'Archivos',
    id: 'filegridview',
    itemId: 'filegridview',
    selType: 'checkboxmodel',
    autoHeight: true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    config: {
        searchName: ''
    },
    columns: [ {
        xtype: 'actioncolumn',
        width: 120,
        items: [ {
            iconCls: 'icon-book-link',
            tooltip: getLocale( 'Descargar' ),
            handler: function( grid, rowIndex, colIndex ) {
                var rec = grid.getStore().getAt( rowIndex );
                var view = grid.up( 'documentosgridview' );
                var url = '/Rest/upload/get';
                url = Ext.String.urlAppend( url, 'search=' + view.searchName );
                url = Ext.String.urlAppend( url, 'createFolder=true' );
                url = Ext.String.urlAppend( url, 'download=true' );
                url = Ext.String.urlAppend( url, 'Path=' + rec.get( 'Path' ) );
                url = Ext.String.urlAppend( url, 'filename=' + encodeURIComponent( rec.get( 'Name' ) ) );
                window.open( url );
            }
        }, {
                iconCls: 'icon-book-go',
                tooltip: getLocale( 'Abrir' ),
                handler: function( grid, rowIndex, colIndex ) {
                    var view = grid.up( 'documentosgridview' );
                    
                    var rec = grid.getStore().getAt( rowIndex );
                    var name = rec.get( 'Name' );
                    var regexp = /(gif|jpe?g|png|txt|avi|mpg|mpeg|pdf)/gi
                    var matches_array = name.match( regexp );
                    var ext = name.split( '.' )[ 1 ];
                    var mime = '';
                    if( ext == 'pdf' || name.toUpperCase().indexOf('.PDF')>=0 ) {
                        
                        mime = 'application/pdf';
                    } else if( ext.match( /(gif|jpe?g|png)/gi ) 
                        || name.toUpperCase().indexOf('.GIF')>=0 
                        || name.toUpperCase().indexOf('.JPG')>=0
                        || name.toUpperCase().indexOf('.JPE')>=0 
                        || name.toUpperCase().indexOf('.PNG')>=0 
                        ) {
                        ext = 'png';
                        mime = 'image/' + ext;
                        
                    } else if( ext.match( /(avi|mpg|mpeg)/gi ) 
                        || name.toUpperCase().indexOf('.AVI')>=0 
                        || name.toUpperCase().indexOf('.MPG')>=0 
                        || name.toUpperCase().indexOf('.MPEG')>=0 
                        ) {
                        mime = 'video/' + ext
                    } else if( ext == 'txt' 
                        || name.toUpperCase().indexOf('.TXT')>=0 
                        ) {
                        mime = 'text/plain'
                        extensio='.txt';
                    }
                    if( matches_array ) {
                        var url = '/Rest/upload/get';
                        url = Ext.String.urlAppend( url, 'search=' + view.searchName );
                        url = Ext.String.urlAppend( url, 'createFolder=true' );
                        url = Ext.String.urlAppend( url, 'download=false' );
                        url = Ext.String.urlAppend( url, 'Path=' + rec.get( 'Path' ) );
                        url = Ext.String.urlAppend( url, 'mimetype=' + mime );
                        url += '&filename=' + encodeURIComponent( rec.get( 'Name' ));
                        window.open( url );
                    } else {
                    }
                },
                getClass: function( v, meta, rec ) {          // Or return a class from a function
                    var name = rec.get( 'Name' );
                    var regexp = /(gif|jpe?g|png|txt|avi|mpg|mpeg|pdf)/gi
                    var matches_array = name.match( regexp );
                    if( matches_array || name.toUpperCase().indexOf('.PDF')>=0
                        || name.toUpperCase().indexOf('.GIF')>=0 
                        || name.toUpperCase().indexOf('.JPG')>=0
                        || name.toUpperCase().indexOf('.JPE')>=0 
                        || name.toUpperCase().indexOf('.PNG')>=0 
                        || name.toUpperCase().indexOf('.AVI')>=0 
                        || name.toUpperCase().indexOf('.MPG')>=0 
                        || name.toUpperCase().indexOf('.MPEG')>=0                         
                        || name.toUpperCase().indexOf('.TXT')>=0                         
                    )
                        
                        return 'icon-book-go';
                    else
                        return 'icon--hidden';
                }
            }
        ]
    },
        {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'Name',
            width: 300,
            //flex: 1
            sortable: true
        }, {
            xtype: 'gridcolumn',
            header: 'Creación',
            dataIndex: 'CreationTime',
            width: 200,
            //flex: 1
            sortable: true
        }, {
            xtype: 'gridcolumn',
            header: 'Tamaño',
            dataIndex: 'Weight',
            width: 80,
            renderer: Ext.util.Format.fileSize,
            sortable: true
        }
    ],
    setSearch: function() {
    },
    initComponent: function() {
        this.callParent( arguments );
        var me = this;
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                
                Ext.create( 'Common.view.UploadButton', {
                    itemId: 'dragupload',
                    iconCls: 'icon-book-add',
                    text: 'Subir Archivo',
                    plugins: [ {
                        ptype: 'uploadwindow',
                        title: 'Subir Archivo',
                        width: 350,
                        height: 150
                    }
                    ],
                    uploader:
                    {
                        url: '/Rest/upload/new?search=' + me.searchName,
                        uploadpath: 'Docs',
                        multi_selection: true,
                        autoStart: true,
                        maxFileSize: '50mb',
                        //dropElement: 'filegridview',
                        statusQueuedText: getLocale( 'Listo para subir' ),
                        statusUploadingText: getLocale( 'Subiendo' ) + ' ({0}%)',
                        statusFailedText: '<span style="color: red">Error</span>',
                        statusDoneText: '<span style="color: green">Completo</span>',
                        statusInvalidSizeText: 'Archivo demasiado largo',
                        statusInvalidExtensionText: 'Formato inválido'
                    },
                    listeners:
                    {
                        filesadded: function( uploader, files ) {
                            return true;
                        },
                        beforeupload: function( uploader, file ) {
                            var url = '/Rest/upload/new?';
                            url = Ext.String.urlAppend( url, 'search=' + me.searchName );
                            url = Ext.String.urlAppend( url, 'createFolder=true' );
                            url = Ext.String.urlAppend( url, 'Path=' + this.path );
                            uploader.uploader.settings.url = url
                        },
                        fileuploaded: function( uploader, file ) {
                            //console.log('fileuploaded');
                        },
                        uploadcomplete: function( uploader, success, failed ) {
                            var file = success.pop();
                            this.refresh();
                        },
                        scope: this
                    }
                }),
                {
                    itemId: 'deleteArch',
                    text: 'Eliminar archivo',
                    iconCls: 'icon-book-delete',
                    disabled: true,
                    action: 'eliminararchivo'
                }
            ]
        });
        this.addDocked( toolbar );
    },
    refresh: function() {
        var store = this.getStore();
        store.load( { scope: store });
    },
    setPath: function( path ) {
        var store = this.getStore();
        this.setTitle( 'Archivos: ' + path );
        store.path = path;
        store.load( { scope: store });
        this.path = path;
    }
});
