//MIGRADO2024
Ext.define('Common.view.TripFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tripformview'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showtoolbar: true,
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 120,
        anchor : '100%',
    	labelAlign: 'left'					
	},
	items : [
        {
            xtype: 'hiddenfield',
            name: 'tgv_estado',
            itemId: 'tgv_estado'
        },
        {
        xtype: 'fieldset',
        title: 'Datos del viaje',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Identificador',
                itemId: 'name',
                name : 'tgv_nombre',
                allowBlank : false,
                labelWidth: 150
            },{
                xtype: 'textfield',
                fieldLabel: 'Numero de viaje',
                itemId: 'codigoexterno',
                name : 'tgv_codigoexterno',
                allowBlank : false,
                labelWidth: 150,
                maskRe: /[A-Za-z0-9]/,
                regex: /[A-Za-z0-9]/,
                regexText: getLocale('Debe ingresar números y/o letras'),
                validator: function(value) {
                    var t = this;
                    var view = this.up('tripformview');
                    var record = view.record;
                    if(value != this.originalValue) {                   
                        var model = 'Common.model.TripSearchModel';
                        var filters = [{
                            property : 'tgv_codigoexterno',
                            value : value
                        }];
                        var tgv_idkey = record.get('tgv_idkey');
                        if (tgv_idkey>0){
                            filters.push({
                                property : 'tgv_idkey:NOT',
                                value : tgv_idkey
                            });
                        }
                
                        var tripSP = Ext.create('Ext.data.Store',{
                            model: model,
                            pageSize: 50,
                            remoteFilter: true,
                            filters: filters
                        })
                        
                        tripSP.load({callback: function (records, operation, success) {
                            if (records.length > 0){
                                t.markInvalid('El numero de viaje ya existe');
                                t.textValid = false;
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }
                        }})
                        } else {
                            t.clearInvalid();
                            t.textValid = true;
                        }
                        return t.textValid;
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Geocercas',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel : 'Inicio',
                    displayField : 'Name', 
                    queryMode: 'local',
                    valueField : 'Id',
                    itemId: 'geoFenceStart',
                    name : 'tgv_geofenseinicio',
                    editable:false,
                    //lastQuery: '',
                    //queryParam:'g.[NAME]',
                    //enableKeyEvents:true,
                
                    labelWidth:120,
                    plugins : ['clearbutton']
                  
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'5 0',
                    items:[
                        {
                            xtype : 'datefield',
                            fieldLabel : 'Programa',
                            name : "tgv_fecha_prg_inicio",
                            bindToModel : false,
                            itemId : 'fechaprgdesde',
                            labelWidth: 120,
                            width: 240
                        },{
                            fieldLabel: 'Hora',
                            xtype: 'timefield',
                            itemId: 'horaprgdesde',
                            format: 'H:i',
                            altFormats:'H:i',
                            increment : 1,
                            labelWidth : 50,
                            width : 120,
                            margin : '0 0 0 10'
                        }
                    ]
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Lugar inicio',
                    name : "tgv_lugar_inicio",
                    itemId : 'tgv_lugar_inicio',
                    labelWidth: 120
                },{
                    xtype: 'combo',
                    fieldLabel : 'Fin',
                    displayField : 'Name', 
                    queryMode: 'local',
                    valueField : 'Id',
                    itemId: 'geoFenceFin',
                    name : 'tgv_geofensefin',
                    lastQuery: '',
                    labelWidth: 120,
                    plugins : ['clearbutton']
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'5 0',
                    items:[
                        {
                            xtype : 'datefield',
                            fieldLabel : 'Programa',
                            name : "tgv_fecha_prg_fin",
                            bindToModel : false,
                            itemId : 'fechaprghasta',
                            labelWidth: 120,
                            width: 240,
                            validator: function(value) {
                                var t = this;
                                var view = this.up('tripformview');
                                var record = view.record;   
                                if(record.get('tgv_fecha_prg_inicio')>record.get('tgv_fecha_prg_fin')){
                                    //t.markInvalid('La fecha de finalización no puede ser anterior a la fecha de inicio');
                                    t.textValid = getLocale('La fecha de finalización no puede ser anterior a la fecha de inicio');   
                                }else{
                                    t.clearInvalid();
                                    t.textValid = true;
                                }
                                return t.textValid;                
                            }                              
                            
                        },{
                            fieldLabel: 'Hora',
                            xtype: 'timefield',
                            itemId: 'horaprghasta',
                            format: 'H:i',
                            altFormats:'H:i',
                            increment : 1,
                            labelWidth : 50,
                            width : 120,
                            margin : '0 0 0 10'
                        }
                    ]
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Lugar fin',
                    name : "tgv_lugar_fin",
                    itemId : 'tgv_lugar_fin',
                    labelWidth: 120
                }
            ]
        }
        ,{
            xtype: 'fieldset',
            title: 'Fechas',
            items: [ 
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'5 0',
                    items:[
                        {
                            xtype : 'datefield',
                            fieldLabel : 'Inicio',
                            name : "tgv_fechainicio",
                            bindToModel : false,
                            itemId : 'fechadesde',
                            labelWidth: 50
                        },{
                            fieldLabel: 'Hora',
                            xtype: 'timefield',
                            itemId: 'horadesde',
                            format: 'H:i',
                            altFormats:'H:i',
                            increment : 1,
                            labelWidth : 50,
                            margin : '0 0 0 10'
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    margin:'0 0 5 0',
                    items:[
                        {
                            xtype : 'datefield',
                            fieldLabel : 'Fin',
                            itemId : 'fechahasta',
                            bindToModel : false,
                            name : "tgv_fechafin",
                            labelWidth : 50,
                            width : 250
                        },{
                            fieldLabel: 'Hora',
                            xtype: 'timefield',
                            itemId: 'horahasta',
                            format: 'H:i',
                            altFormats:'H:i',
                            increment : 1,
                            labelWidth : 50,
                            width : 120,
                            margin : '0 0 0 10'
                        }
                    ]
                }
            ]
        },{
            xtype:'selecterfield',
            itemId:'tgv_cuenta_cliente',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Cliente',
                    field:'Name',
                    searchField:'[Name]'
                },
                selecionado: {
                    title:'Cliente',
                    field:'Name'
                },
                valueField:'Id',
                prefijoParaFiltro:'o',
                modelItems: 'Common.model.OrganizationSearchModel'
            },
            title:'Cliente'
        
        },{
            xtype:'selecterfield',
            itemId:'tgv_movil_transportista',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Transportista',
                    field:'cue_cnombre',
                    searchField:'[cue_cnombre]'
                },
                selecionado: {
                    title:'Transportista',
                    field:'cue_cnombre'
                },
                valueField:'Id',
                prefijoParaFiltro:'',
                modelItems: 'VehicleSearchModel'
            },
            title:'Transportista'
        },{
            xtype: 'combo',
            fieldLabel : 'Responsable',
            displayField : 'usu_cnombre',
            queryMode: 'local',
            valueField : 'usu_iid',
            itemId: 'responsable',
            name : 'tgv_usuiid',
            margin : '0 0 15 10',
            allowBlank : false
        },{
            xtype: 'fieldset',
            width: '100%',
            fieldDefaults : {
                labelWidth : 150,
                anchor : '100%',
                labelAlign: 'left'					
            },
            title: 'Datos extra',
            itemId: 'datosextra'
        }
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text: 'Guardar',
                    action: 'save',
                    iconCls: 'icon-disk'
		        },{
                    xtype: 'button',
                    text: 'Cancelar',
                    action: 'cancel',
                    handler: function(button){
                        var win = button.up('tripformview');
                        if(win)
                            win.close();
                    },
                    iconCls: 'icon-cancel'
		        },'->',{
                    xtype: 'button',
                    text: 'Iniciar',
                    itemId:'btnIniciar',
                    action: 'start',
                    iconCls: 'icon-map-go'
		        },{
                    xtype: 'button',
                    text: 'FInalizar',
                    itemId:'btnFinalizar',
                    action: 'end',
                    iconCls: 'icon-map'
		        }
            ]
         }); 
        if (this.showtoolbar){
            this.addDocked(toolbar);
        } 
	} // cierro init
});