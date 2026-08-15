//MIGRADO2024
Ext.define( 'Common.view.PhotoPanelView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.photopanel',
    border: false,
    layout: 'fit',
    tbar: [
        {
            xtype: 'uploadbutton',
            id: 'draguploadxxxx',
            itemId: 'subir',
            text: getLocale( 'Subir Foto' ),
            plugins: [ {
                ptype: 'uploadwindow',
                title: 'Subir Foto',
                width: 350,
                height: 400,
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
                statusQueuedText: getLocale( 'Listo para subir' ),
                statusUploadingText: getLocale( 'Subiendo' ) + ' ({0}%)',
                statusFailedText: '<span style="color: red">' + getLocale( 'Error' ) + '</span>',
                statusDoneText: '<span style="color: green">' + getLocale( 'Completo' ) + '</span>',
                statusInvalidSizeText: getLocale( 'Archivo demasiado largo' ),
                statusInvalidExtensionText: getLocale( 'Formato inválido' )
            },
            listeners:
            {
                filesadded: function( uploader, files ) {
                    return true;
                },
                beforeupload: function( uploader, file ) {
                    var url = '/rest/upload/new?search=softguardMiscFile';
                    if( this.path ) {
                        url = url + '&Path=' + me.path
                    }
                    uploader.uploader.settings.url = url
                },
                fileuploaded: function( uploader, file ) {
                    //console.log('fileuploaded');
                },
                uploadcomplete: function( uploader, success, failed ) {
                     var file = success.pop();
                     var view = uploader.owner.up( 'photopanel' );
                     var record = view.record;
                     var field = view.field;
                     view.down( 'image' ).setSrc( '/gallery/' + file.name );
                     record.set( field, file.name );
                     record.save( {
                         callback: function( record, operation ) {
                             if( operation.success ) {
                                 notify( 'Los datos se guardaron con éxito' );
                             }
                         }
                     });
                },
                scope: this
            }
        },
        {
            text: 'eliminar',
            iconCls: 'icon-delete',
            itemId: 'delete',
            handler: function() {
                 var win = this.up( 'window' );
                 var view = win.down( 'photopanel' );
                 if(win.record){
                     console.log("tiene win record ",win.record)
                     console.log("view record -- ",view.record)
                 }else{
                     console.log("usa view . record",view.record)
                     console.log("win record",win.record)
                 }
                 var record = win.record ? win.record : view.record;
                 record.set( view.field, '' );
                 console.log( "record eliminar photo PROXYYYYYYYYYYYY", record.getProxy() )
                 record.save({
                         callback: function( record, operation ) {
                             if( operation.success ) {
                                 notify( 'Los datos se guardaron con éxito' );
                             }else{
                                 console.error("lasfhlakklas error error error")
                             }
                         }
                     } );
                 win.down( 'image' ).setSrc( '/gallery/' );
                 win.close();
            }
        }
    ],
    items: [
        {
            xtype: 'image',
            id: 'fotoImage',
        }
           
    ],
    initComponent: function() {
        this.callParent( arguments );
        console.log( "THIS - - -", this )
        this.down( 'image' ).setSrc( '/gallery/' + this.record.get( this.field ) );
        if( this.profile < 2 ) {
            this.down( '#delete' ).hide()
            this.down( '#subir' ).hide()
        }
    }
});