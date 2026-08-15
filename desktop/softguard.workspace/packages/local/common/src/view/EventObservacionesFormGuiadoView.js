Ext.define( 'Common.view.EventObservacionesFormGuiadoView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.eventobservacionesformguiadoview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    
    
    items: [
        /**************https://basecamp.com/2249105/projects/14758734/todos/409178133***** */
        {
            xtype: 'panel',
            itemId: 'panelDisplayKey',
            hidden: true,
            layout: 'hbox',
            //bodyStyle:'background-color:#ffff00 ',            
            items:[
                {
                    xtype: 'displayfield',
                    fieldLabel: '',
                    itemId: 'dspkey',
                    
                    
                    value: '<img src="/resources/global/images/icons/key.png">'+getLocale("Atención - Posee llave")+'</img>'
                },{
                    xtype:'displayfield'
                    , value:getLocale('ATENCION')
                    , hidden:true
                    , itemId: 'dspatencion'
                    , cls:'blink'
                },{ 
                    xtype: 'displayfield', value: getLocale('Se supero la cantidad de falsas alarma para esta cuenta')
                    , hidden:true
                    , itemId:'dspfalsaalarma' ,iconCls: 'icon-date-error'
                     
                },
                { xtype: 'displayfield', value: getLocale('Zona en prueba'), hidden:true, itemId:'dspzonaprueba' ,iconCls: 'icon-layout-error' },
                { xtype: 'displayfield', value: getLocale('Cuenta en prueba'), hidden:true, itemId:'dspcuentaprueba' ,iconCls: 'icon-vcard-delete'
                            },
                { xtype: 'displayfield', value: 'Moroso', hidden:true, action: 'msgmoroso', itemId:'dspmoroso' ,iconCls: 'icon-moneyguard-16'
                         },
                { xtype: 'displayfield', value: 'Solicitud de eliminacion de cuenta', hidden:true, itemId:'dspcuentaeliminar' ,iconCls: 'icon-vcard-delete'
                         },
                /************************************* */           
            ]
        }, {
            xtype:'panel',
    tbar: [
        {
            tooltip : 'Gestión -> Llamadas',
            iconCls : 'icon-telephone-go',
            view : 'llamadagridview',
            itemId: 'informeLlamada',
            hidden: true,
            action: 'openView'
        }, {
            tooltip : 'Sms transmitidos',
            iconCls : 'icon-phone-sound',
            view : 'notificacionestabpanelview',
            itemId: 'informeNotificaciones',
            hidden: true,
            action: 'openView'
        }, {
            tooltip : 'informe -> Multimedia',
            iconCls : 'icon-photos',
            view : 'multimediaeventospanelview',
            itemId: 'informeMultimedia',
            hidden: true,
            action: 'openView'
        }, {
            tooltip : 'Servicio Tecnico',
            iconCls : 'icon-wrench-orange',
            view : 'multicuentaserviciotecnicoextdelaersearchgridview',
            itemId: 'informeSertec',
            hidden: true,
            action: 'openView'
        },{
            tooltip : 'Reporte Histórico',
            iconCls : 'icon-reportes',
            view : 'recepcionview',
            itemId: 'informeHistorico',
            hidden: true,
            action: 'openView'
        }
    ]
            
        },
        {
            xtype: 'container',
            itemId: 'obscontainer',
            hidden: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 5 0',
            flex: 1,
            items: [
                {
                    xtype: 'textareafield',
                    itemId: 'obsfield',

                    emptyText: getLocale( 'Ingrese un nuevo comentario.' ),
                    minHeight: 65,
                    maxHeight: 300,
                    flex: 1
                }/*, {
                    xtype: 'button',
                    iconCls: 'icon-disk',
                    action: 'agregar-observacion',
                    minHeight: 65,
                    maxHeight: 300
                }*/
            ]
        }, {
            fieldLabel: 'Predefinidas',
            xtype: 'combobox',
            itemId: 'observaciones',
            store: "TablasObservacionesStore",
            multiselect: false,
            editable: true,
            forceSelection: true,
            queryMode: 'local',
            anchor: '100%',
            displayField: 'obs_cdescripcion',
            lastQuery: '',
            hidden: true,
            valueField: 'obs_mobservacion'
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Categorización',
            hidden: true,
            itemId: 'categorizacion',
            store: "TablasResolucionesStore",
            //multiselect: false,
            // editable : false,
            queryMode: 'local',
            anchor: '100%',
            displayField: 'res_cdescripcion',
            valueField: 'res_ccodigo',
            lastQuery: '',
            allowBlank: false,
            typeAhead: true,
           // plugins: [ 'clearbutton' ],
            forceSelection: true
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Resolución',
            itemId: 'resolucion',
            anchor: '100%',
            store: "TablasCategorizacionStore",
            //multiselect: false,
            // editable : false,
            queryMode: 'local',
            displayField: 'cat_cDescripcion',
            valueField: 'cat_cCodigo',
            lastQuery: '',
            typeAhead: true,
            //allowBlank: false, // pedido por leo 22/11/2016
            //plugins: [ 'clearbutton' ],
            forceSelection: true
        }
    ],
    buttons: [
        {
            text: getLocale('Confirmar'),
            iconCls: 'save',
            action: 'confirm',
            itemId: 'confirm',
            
        },{
            text: getLocale('Cancelar'),
            iconCls: 'icon-cancel',
            action: 'cancel',
            itemId: 'cancel'
        }
    ],
    initComponent: function() {
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save',
                    itemId: 'save',
                    hidden: true
                }
            ]// cierro items
        });
        //this.addDocked( toolbar );
    } // cierro init
});