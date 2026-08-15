//MIGRADO2024
Ext.define( 'Common.controller.EventObservacionesFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablasObservacionesStore', 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore' ],
    models: [ 'TablasCategorizacionSearchModel', 'TablasObservacionesSearchModel', 'TablasResolucionesSearchModel' ],
    views: [ 'EventObservacionesFormView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'eventobservacionesformview': {
                afterrender: this.preInitview
            },
            'eventobservacionesformview button[action="agregar-observacion"]': {
                click: this.onAgregarObservacionClick
            },
            'eventobservacionesformview button[action="save"]': {
                click: this.onAgregarObservacionClick
            },
            'eventobservacionesformview #observaciones': {
                select: this.onSelectPredefinidas
            },
            'eventobservacionesformview #categorizacion': {
                change: this.onChangeCategorizacion
            },
            'eventobservacionesformview #resolucion': {
                change: this.onChangeResolucion
            },
            'eventobservacionesformview button[action="openView"]': {
                click: this.onOpenViewClick
            }
        });
    }, // cierro init
    onOpenViewClick: function(btn) {
        var view = btn.up( 'eventobservacionesformview' );
        var newView = Ext.widget(btn.view,{
            record: view.record,
            preventHeader: true,
            module: {profile: 1}
        });
        
        var myWindow = Ext.widget('window',{
            title: newView.title,
            height: 600,
            width: 800,
            items: newView,
            layout: 'fit',
            closable: true,
            closeAction: 'destroy'
        }).show();
    },
    onSelectPredefinidas: function(combo, records ) {
        var view = combo.up( 'eventobservacionesformview' );
        var textarea = view.down( '#obsfield' );
        // dedalo 12/11/2019 a padido de Fer, se agrega predefinida a textarea.
        if( combo.getValue() ) {
            textarea.setValue( combo.getValue() );
        }
    },
        
    preInitview: function (view ) {
        var controller = this;
        var resolucionesStore = Ext.create( 'Ext.data.Store', {
            model: this.getTablasResolucionesSearchModelModel(),
            pageSize: 99999,
            remoteFilter: true,
            remoteSort: true,
            sorters: [ { "property": "res_cdescripcion", "direction": "ASC" }],
            filters: [
                {
                    property: 'res_nEstado',
                    value: 0
                }
            ]
        });
        view.down( '#categorizacion' ).bindStore( resolucionesStore )
        resolucionesStore.load( {
            callback: function() {
                var categorizacionStore = Ext.create( 'Ext.data.Store', {
                    model: controller.getTablasCategorizacionSearchModelModel(),
                    pageSize: 99999,
                    remoteFilter: true,
                    remoteSort: true,
                    autoload: false,
                    sorters: [ { "property": "cat_cDescripcion", "direction": "ASC" }],
                    filters: [
                        {
                            property: 'cat_iEstado',
                            value: 1
                        }
                    ]
                });
                view.down( '#resolucion' ).bindStore( categorizacionStore )
                categorizacionStore.load( {
                    callback: function() {
                        ///esto lo pongo por que me rompe el buscador en el combo
                        categorizacionStore.remoteFilter = false;
                        resolucionesStore.remoteFilter = false;
                        controller.initview( view )
                    }
                })
            }
        })
    },
    initview: function(view ) {
        if( view.record ) {
            view.loadRecord( view.record );
        }
        //defino si el campo es obligatorio o no
        var resolucionRequerida = getParametro( 'RESOLUCIONOBLIGATORIA' )
        var resolucionCombo = view.down( '#resolucion' )
        if( resolucionRequerida == 1 ) {
            resolucionCombo.allowBlank = false;
            resolucionCombo.setValue( resolucionCombo.getStore().first() );
            resolucionCombo.validateValue( resolucionCombo.getValue() );
        } else if( resolucionRequerida == 2 ) {
            resolucionCombo.allowBlank = false;
            resolucionCombo.setValue( '' );
            resolucionCombo.validateValue( resolucionCombo.getValue() );
        } else {
            resolucionCombo.allowBlank = true;
            resolucionCombo.setValue( '' );
        }
        if( !view.procesar ) {
            view.down( '#resolucion' ).hide();
        }
        /******************************** */
        if (Ext.util.Format.trim(view.record.get('rec_calarma'))!=''){
            var txtColor = this.decimalColorToHTMLcolor(view.record.get('cod_ncolorletra'));
            var backColor = this.decimalColorToHTMLcolor(view.record.get('cod_ncolor'));
            
            view.down('#panelDisplayKey').setBodyStyle('background-color:' + backColor);
            view.down("#dspkey").setFieldStyle('color:' + txtColor);
            view.down('#dspcuentaprueba').setFieldStyle('color:' + txtColor);
            view.down('#dspcuentaeliminar').setFieldStyle('color:' + txtColor);
            view.down('#dspfalsaalarma').setFieldStyle('color:' + txtColor);
            view.down('#dspmoroso').setFieldStyle('color:' + txtColor);
            view.down('#dspatencion').setFieldStyle('color:' + txtColor);            
        } else {
            view.down('#panelDisplayKey').setBodyStyle('background-color:transparent');
            view.down("#dspkey").setFieldStyle('color:#333');
            view.down('#dspcuentaprueba').setFieldStyle('color:#333');
            view.down('#dspcuentaeliminar').setFieldStyle('color:#333');
            view.down('#dspfalsaalarma').setFieldStyle('color:#333');
            view.down('#dspmoroso').setFieldStyle('color:#333');
            view.down('#dspatencion').setFieldStyle('color:#333');              
        }        
        if (view.record.get('cue_nsonidoul')==1){
            view.down('#panelDisplayKey').show();    
        }
        if(view.record.get('situacion_cuenta') == 'Prueba') {
            view.down('#dspcuentaprueba').show()
        }
        
        if(view.record.get('situacion_cuenta') == 'Prueba x Zonas ') {
            view.down('#dspzonaprueba').show()
        }
        
        if(view.record.get('situacion_cuenta') == 'Eliminar') {
            view.down('#dspcuentaeliminar').show()
        }
        Ext.Function.defer(function() {
            if(view.record.get('fal_nmargen') != 0 && !view.eventoformverticalview==true) {
               if(view.record.get('sta_ncontadorfa') > view.record.get('fal_nmargen')) {    
                   view.down('#dspfalsaalarma').show();
                   notify('Se superaro la cantidad de falsas alarma para esta cuenta')
               }
           }
           if( 
                !view.down('#dspcuentaeliminar').isHidden() ||
                !view.down('#dspcuentaprueba').isHidden() ||
                !view.down('#dspzonaprueba').isHidden() ||
                !view.down('#dspfalsaalarma').isHidden() ||
                !view.down('#dspmoroso').isHidden() ) {
                view.down('#dspatencion').show()
            }
         }, 1000, this, arguments);
        if(view.record.get('cli_nsituacion') > 0){
            view.down('#dspmoroso').show()  
        }   
        /*************************************************** */     
        /*if(view.down('#categorizacion').getValue() == '0' || view.down('#categorizacion').getValue() == 0 || !view.down('#categorizacion').getValue()) {
            view.down('#categorizacion').setValue(view.down('#categorizacion').getStore().getAt(0));
        }*/
        var categorizacionRequerida = getParametro( 'CATEGORIZACIONOBLIGATORIA' )
        var cateogrizacionCombo = view.down( '#categorizacion' )
        if( categorizacionRequerida == 1 ) {
            cateogrizacionCombo.allowBlank = false;
            cateogrizacionCombo.setValue( cateogrizacionCombo.getStore().first() );
            cateogrizacionCombo.validateValue( cateogrizacionCombo.getValue() );
        } else if( categorizacionRequerida == 2 ) {
            cateogrizacionCombo.allowBlank = false;
            cateogrizacionCombo.setValue( '' );
            cateogrizacionCombo.validateValue( cateogrizacionCombo.getValue() );
        } else {
            cateogrizacionCombo.allowBlank = true;
            cateogrizacionCombo.setValue( '' );
        }
    },    
   decimalColorToHTMLcolor : function(number) {
        var intnumber = number - 0;
        var red, green, blue;
        var template = "#000000";
            red = (intnumber&0x0000ff) << 16;
        green = intnumber&0x00ff00;
        blue = (intnumber&0xff0000) >>> 16;
            intnumber = red|green|blue;
    
        var HTMLcolor = intnumber.toString(16);
        HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
    
        return HTMLcolor;
    },    
    onChangeCategorizacion: function(combo ) {
        var view = combo.up( 'eventobservacionesformview' );
        view.record.set( 'rec_idresolucion', combo.getValue() )
        view.fireEvent( 'selectionChange' )
    },
        
    onChangeResolucion: function(combo ) {
        var view = combo.up( 'eventobservacionesformview' );
        view.record.set( 'rec_ccategorizacion', combo.getValue() )
        view.fireEvent( 'selectionChange' )
    },
        
    onAgregarObservacionClick: function(button, object, options ) {
        var view = button.up( 'eventobservacionesformview' );
        var record = view.record;
        var rec_iid = record.get( 'rec_iid' );
        var observaciones = view.down( '#obsfield' );
        var observacion = observaciones.getValue();
        if( observacion != '' ) {
            var categorizacion = view.down( '#categorizacion' ).getValue();
            var observaciones = view.down( '#obsfield' ).getValue();
            var resolucion = view.down( '#resolucion' ).getValue();
            var rec_iid = record.get( 'rec_iid' );
            /*  if(categorizacion) {*/
            Ext.Ajax.request( {
                /*url: '/rest/search/AtencionEventoProcesar',
                params: { 
                    rec_iid: rec_iid, 
                    rec_idResolucion : Ext.String.leftPad(categorizacion, 3, '0'),
                    rec_cObservaciones: observaciones,
                    rec_cCategorizacion: Ext.String.leftPad(resolucion, 3, '0')
                    
                },*/
                url: '/rest/search/AtencionEventoObservacion',
                params: {
                    rec_iid: rec_iid,
                    rec_cObservaciones: observacion
                },
                method: 'GET',
                scope: this,
                success: function( response ) {
                    //actualizo las pantallas
                    notify( 'Los datos se guardaron con éxito' );
                    if( view.caller ) {
                        view.caller.fireEvent( 'refreshTimeline', view.caller )
                    }
                    view.down( '#obsfield' ).setValue( '' );
                }
            });
            if( view.up( 'window' ) ) {
                view.up( 'window' ).close();
            }
        } else {
            notifyError( 'Debe completar la observación antes de guardar!' );
        }
    }
});