Ext.define( 'AdministratorSearch.controller.TablasCodigosAlarmaFormController',
    {
        extend: 'Ext.app.Controller',
        stores: [ 'TablasGruposStore', 'SiNoStore' ],
        models: [ 'TablasCodigosAlarmaModel', 'TablasCodigosAlarmaSearchModel', 'TablasGruposSearchModel', 'ReceptorFormatosSearchModel' ],
        views: [ 'TablasCodigosAlarmaFormView' ],
        audio: null,
        init : function(config ) {
            // genero los eventos
            this.control( {
                'tablascodigosalarmasformview': {
                    afterrender: this.initview,
                    soundSelected: this.onSoundSelected,
                    selectedEvents: this.eventsSelected,
                    selectedGroups: this.gorupsSelected
                },
                'tablascodigosalarmasformview button[action="save"]': {
                    click: this.onSaveClick
                },
                'tablascodigosalarmasformview button[action="playsound"]': {
                    click: this.onPlayClick
                },
                'tablascodigosalarmasformview button[action="stopsound"]': {
                    click: this.onStopClick
                },
                'tablascodigosalarmasformview button[action="photo"]': {
                    click: this.onPhotoClick
                },
                'tablascodigosalarmasformview #elegirsonido': {
                    click: this.onElegirSonidoClick
                },
                 'tablascodigosalarmasformview #agregargrupo': {
                    click: this.onAgregarGrupoClick
                },
                'tablascodigosalarmasformview #agregarevento' : {
                    click : this.onAgregarEventoClick
                }
            });
        }, // cierro init

        onSoundSelected: function (record, view ) {
            view.down( '#urlsonido' ).setValue( record.get( 'Name' ) )
        },

        onAgregarEventoClick: function (btn) {
            var view = btn.up('tablascodigosalarmasformview');
            
            var filter = [];
            
            var myWindow = Ext.widget('window',{
                title: 'Selector de eventos',
                height: 400,
                width: 900,
                //autoScroll: true,
                modal: true, 
                items: [{
                    xtype: 'eventselecterhelperview',
                    eventSelected: view.record.get('cod_cAlarmaAutoprocesa'),
                    caller: view,
                    filter: filter
                }],
                layout: 'fit'
            }).show();
        },

        //Federico V. Agregue funcion para llamar al helper groupsselecterhelpercontroller para la tarea DS-663
          onAgregarGrupoClick: function (btn) {
            var view = btn.up('tablascodigosalarmasformview');
            
            var filter = [];
            
            var myWindow = Ext.widget('window',{
                title: 'Selector de grupos',
                height: 400,
                width: 900,
                //autoScroll: true,
                modal: true, 
                items: [{
                    xtype: 'groupsselecterhelperview',
                    groupSelected: view.record.get('cod_cGrupo'),
                    caller: view,
                    filter: filter
                }],
                layout: 'fit'
            }).show();
        },

        eventsSelected: function(records, view) {
            var textarea = view.down('#eventos');
            var text = '';
            
            var arrayEventos = [];
            Ext.Array.each(records.items, function(record){
                text = text + record.get('Descripcion')+'\r\n';
                arrayEventos.push(record.get('cod_ccodigo'));
            })
        
            textarea.setValue(text);
        
            view.down('#eventoshide').setValue(arrayEventos.join(','));
            view.record.set('cod_cAlarmaAutoprocesa',arrayEventos.join(','));
        },

        
        gorupsSelected: function(records, view) {
            var textarea = view.down('#grupos');
            var text = '';
            
            var arrayGrupos = [];
            Ext.Array.each(records.items, function(record){
                text = text + record.get('gru_cdescripcion')+'\r\n';
                arrayGrupos.push(record.get('gru_ccodigo'));
            })
        
            textarea.setValue(text);
        
            view.down('#gruposhide').setValue(arrayGrupos.join(','));
            view.record.set('cod_cGrupo',arrayGrupos.join(','));
        },    
            
        onElegirSonidoClick: function(button, event, options ) {
            var view = button.up( 'tablascodigosalarmasformview' );
            var form = view.getForm();
            var record = view.record;

            var w = Ext.widget( 'window', {
                title: 'Sonidos',
                height: 252,
                width: 360,
                closeAction: 'destroy',
                border: false,
                layout: 'fit',
                modal: true,
                items: [ {
                    xtype: 'soundsgridview',
                    caller: view
                }]
            });
            w.show()
        },

        onPhotoClick: function(button, event, options ) {
            var view = button.up( 'tablascodigosalarmasformview' );
            var form = view.getForm();
            var record = view.record;

            /*   var photo = record.get('lin_cimagen');
            var name = record.get('lin_cimagen');*/
            var rename = record.get( 'cod_ccodigo' ) + '.png';

            var w = Ext.widget( 'window', {
                title: 'Foto: ',
                height: 252,
                width: 360,
                closeAction: 'destroy',
                border: false,
                layout: 'fit',
                record: record,
                tbar: [ Ext.create( 'common.view.UploadButton', {
                    id: 'dragupload',
                    text: 'Subir Foto',
                    plugins: [ {
                        ptype: 'uploadwindow',
                        title: 'Subir Foto',
                        width: 350,
                        height: 150
                    }
                    ],
                    uploader:
                    {
                        url: '/rest/upload/new?search=codigoAlarmaFile',
                        uploadpath: '',
                        multi_selection: false,
                        autoStart: true,
                        maxFileSize: '50mb',

                        dropElement: 'cuentaFotoImage',

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
                            var url = '/rest/upload/new?search=codigoAlarmaFile';
                            if( this.path ) {
                                url = url + '&Path=' + me.path
                            }
                            uploader.uploader.settings.url = url
                        },

                        fileuploaded: function( uploader, file ) {
                            //console.log('fileuploaded');
                        },

                        uploadcomplete: function( uploader, success, failed ) {
                            // var path =  '\\\\CLOUDSG\\CloudSecuritySuite\\Web\\images\\codala';
                            var file = success.pop();
                            var name = file.name;

                            if( name != '' ) {
                                var sourcepath = name;
                                var destinationpath = rename;
                                Ext.Ajax.request( {
                                    url: '/Rest/FileSystem/MoveFile',
                                    params: {
                                        sourcepath: sourcepath,
                                        search: 'codigoAlarmaFile',
                                        destinationpath: destinationpath
                                    },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {

                                        w.down( 'image' ).setSrc( '/images/codala/' + rename );
                                    }
                                });
                            }
                        },
                        afterupload: function( uploader, success, failed ) {
                        },
                        scope: this
                    }
                }),
                    /*{
                        text:'Subir Foto',
                        iconCls : 'icon-photo',
                        handler:function(){
                            var parentWindow = this.up('window');
                            var record = parentWindow.record;
                            var w = Ext.widget('window', {
                                title:'Subir Foto',
                                autoShow:true,
                                height:300,
                                width:400,
                                modal:true,
                                layout:'fit',
                                record: record,
                                parent: parentWindow,
                                items:[{
                                    xtype:'uxiframe',
                                    src:'/fileupload',
                                    listeners:{
                                        onfileuploaded:function(files){
                                            var foto = files[0];
                                            var w = this.up('window');
                                            console.log("cuentacontroller.onfileuploaded.window", w,foto);
                                            var m = w.record;
                                            m.set('cue_cfoto', foto.filename);
                                            m.save();
                                            w.parent.down('image').setSrc('/gallery/' + foto.filename);
                                            w.close();
                                        }
                                    }
                                }]
                            });
                        }
                    },*/
                    {
                        text: 'eliminar',
                        iconCls: 'icon-delete',
                        handler: function() {
                            var win = this.up( 'window' );
                            var record = win.record;
                            record.set( 'cue_cfoto', '' );
                            record.save();
                            win.down( 'image' ).setSrc( '/images/codigoalarma/' );
                            //win.close();
                        }
                    }
                ],
                items: [
                    {
                        xtype: 'image',
                        src: '/images/codigoalarma/' + rename,
                        id: 'cuentaFotoImage'
                    }
                ],
                autoShow: true,
                modal: true
                        });
            w.model = form.getRecord();
        },

        initview: function(view ) {
            var controller = this;
            view.loadRecord( view.record );
            var record = view.record;
            
            if( view.objectId != 0 ) {
                view.down( '#codigo' ).setDisabled( true );
            }

            var colorBack = this.decimalColorToHTMLcolor( view.record.get( 'cod_ncolor' ) ); //this.toHex(view.record.get('cod_ncolor'));
            var colorLetra = this.decimalColorToHTMLcolor( view.record.get( 'cod_nColorLetra' ) ); //this.toHex(view.record.get('cod_nColorLetra'));

            view.down( '#nombre' ).setFieldStyle( 'background-color : ' + colorBack + '; color: ' + colorLetra + '; font-size:22px;' );

            var cheboxvalue = view.record.get( "cod_nLeeSonido" ) ? true : false;
            view.down( '#_nLeeSonido' ).setValue( cheboxvalue );

           // view.down('#cod_cGrupo').setValue(record.get('cod_cGrupo'));
            controller.setAutoprosesa(view);
            controller.setAutoprosesaGrupos(view)

            if( view.record.get( 'cod_ccodigo' ) != '' ) {
                var store = Ext.create( 'Ext.data.Store', {
                    model: controller.getReceptorFormatosSearchModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [ {
                        property: 'cod_ccodigo',
                        value: view.record.get( 'cod_ccodigo' )
                    }]
                })
                view.down( '#relacionados' ).bindStore( store );
                store.load();
            } else {
                view.down( '#relacionados' ).hide();
            }
    

        },
            
        toHex: function (colorInt ) {
            colorHex = '#' + ( '00000' + ( colorInt | 0 ).toString( 16 ) ).substr( -6 );
            return colorHex;
        },

        setAutoprosesa: function(view){
            /**
             * Cargo los campos con lo del record al iniciar, si existen
             * */
            var eventos = view.record.get('cod_cAlarmaAutoprocesa');
            
            var aeventos = [];
            var filterAlarmas = [];
            var text='';
            
         

            if (eventos){
                view.down('#eventoshide').setValue(eventos);
                aeventos = eventos.split(',');
                filterAlarmas = aeventos;
            }           
            
            var model =  this.getTablasCodigosAlarmaSearchModelModel();
            var filter = [{
                property:'cod_ccodigo:IN',
                value:eventos
            }];

            if(eventos != '') {
                var combostore =Ext.create('Ext.data.Store',{
                    model:model,
                    pageSize: 1000,       
                    remoteFilter: true,
                    filters: filter
                })

                combostore.load({callback: function(){
                    var sel = [];
                    var e;
                    Ext.Array.each(aeventos, function(evento){
                        e = combostore.findRecord('cod_ccodigo', evento);
                        if (e){
                            sel.push(e);
                        }
                            
                    });
                    
                    if(sel[0] != null) {            
                        Ext.Array.each(sel, function(record){
                            if(record){
                                text = text + record.get('cod_cdescripcion')+'\r\n';       
                            }   
                        })
                        
                        var textarea = view.down('#eventos');     
                        if(textarea) {
                            textarea.setValue(text);
                        }
                    }
                }});
            }

            
        },

        //Federico V. Al iniciar la vista muestra el grupo seleccionada si es que lo tiene 
        setAutoprosesaGrupos: function(view){
            /**
             * Cargo los campos con lo del record al iniciar, si existen
             * */
            var grupos = view.record.get('cod_cGrupo');
            var aegrupos = [];
            var filterAlarmas = [];
            var text='';
            
            if (grupos){
                view.down('#gruposhide').setValue(grupos);
                aegrupos = grupos.split(',');
                filterAlarmas = aegrupos;
            }           
            
            var model =  this.getTablasGruposSearchModelModel();
            var filter = [{
                property:'gru_ccodigo:IN',
                value:grupos
            }];

            if(grupos != '') {
                var combostore =Ext.create('Ext.data.Store',{
                    model:model,
                    pageSize: 1000,       
                    remoteFilter: true,
                    filters: filter
                })

                combostore.load({callback: function(){
                    var sel = [];
                    var e;
                    Ext.Array.each(aegrupos, function(grupo){
                        e = combostore.findRecord('gru_ccodigo', grupo);
                        if (e){
                            sel.push(e);
                        }
                            
                    });
                    
                    if(sel[0] != null) {            
                        Ext.Array.each(sel, function(record){
                            if(record){
                                text = text + record.get('gru_cdescripcion')+'\r\n';       
                            }   
                        })
                        
                        var textarea = view.down('#grupos');     
                        if(textarea) {
                            textarea.setValue(text);
                        }
                    }
                }});
            }  

            
        },

        decimalColorToHTMLcolor: function(number ) {
            var intnumber = number - 0;
            var red, green, blue;
            var template = "#000000";
            red = ( intnumber & 0x0000ff ) << 16;
            green = intnumber & 0x00ff00;
            blue = ( intnumber & 0xff0000 ) >>> 16;
            intnumber = red | green | blue;

            var HTMLcolor = intnumber.toString( 16 );
            HTMLcolor = template.substring( 0, 7 - HTMLcolor.length ) + HTMLcolor;

            return HTMLcolor;
        },

        onSaveClick: function(button, event, options ) {
            // cambio la cantidad de columnas al panel
            // accedo al registro y lo salvo
            var myform = button.up( 'form' ).getForm();
            var view = button.up( 'tablascodigosalarmasformview' );
            var win = button.up( 'window' );
            var record = view.record;


            record.setConfig({
                proxy: this.getTablasCodigosAlarmaModelModel().getProxy()
            });

            myform.updateRecord( record );

            //record.set('cod_cGrupo', view.down('#cod_cGrupo').getValue());

            var cheboxvalue = myform.findField( "_nLeeSonido" ).getValue() ? 1 : 0;
            record.set( 'cod_nLeeSonido', cheboxvalue );

            //record.set('cod_ncolor', this.hexToRgb(record.get('cod_ncolor')));
            //record.set('cod_nColorLetra', this.hexToRgb(record.get('cod_nColorLetra')));

            if( myform.isValid() ) {
                console.log(record)
                record.save( {
                    scope: this,

                    view: view,
                    callback: function( record, operation ) {
                        if( operation.success ) {
                            notify( 'Los datos se guardaron correctamente' );
                            if( view.caller )
                                view.caller.fireEvent( 'objectchanged', view.caller, record );
                        } else {
                            notifyError( 'Hubo un error al guardar los datos' );
                        }

                    },
                    button: button
                });
            } else {
                notifyError( 'Por favor corrija los datos inválidos' )
            }
        },
            
        onPlayClick: function(button, event, options ) {
            var myform = button.up( 'form' );
            var urlsonido = '/Gallery/codAlarmSound/' + myform.down( '#urlsonido' ).getValue();
            myform.down( '#play' ).hide();
            myform.down( '#stop' ).show();

            if( !myform.audio )
                myform.audio = new Audio( urlsonido );
            else
                myform.audio.src = urlsonido;

            myform.audio.loop = false;
            myform.audio.onended = function() {
                myform.down( '#play' ).show();
                myform.down( '#stop' ).hide();
            };
            myform.audio.play();
        },
            
        onStopClick: function(button, event, options ) {
            var myform = button.up( 'form' );

            myform.audio.pause();
            myform.down( '#play' ).show();
            myform.down( '#stop' ).hide();
        }
    }
);