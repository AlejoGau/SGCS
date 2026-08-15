//MIGRADO2024
Ext.define('Common.view.DispositivoMovilWidgetView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dispositivomovilwidgetview',
    title : 'Dispositivo Móvil',
    fieldDefaults: {
        anchor: '100%',
        labelWidth: 80,
        labelStyle: 'font-weight:bold;'
    },
    items : [
        {
            xtype : 'container',
            itemId:'velocimetro',
            layout:'hbox',
            style: {
                background:'#000',
                height: '125px'
            },
            items:[
                    {
                        xtype: 'image',
                        itemId: 'icon',
                        style: {
                            padding: '44px 0px 44px 42px',
                            right: 'auto',
                            top: '0px',
                            margin: '0px',
                            left: '0px'
                        },
                    },{
                        xtype:'displayfield',
                        value:'0',
                        itemId:'kmhora',
                        renderer: function (v) {
                            return v+' km/h';
                        },
                        fieldStyle: {
                            fontSize: '50px',
                            color:'#f1f1f1',
                            padding:'30px'
                        }
                    }
                ]
        },{
          xtype:'container',
          itemId:'iconblock',
          layout:'hbox',
          items: [
                {
                    xtype: 'displayfield',
                    itemId: 'iconmsg',
                    margin:'8 0 0 10'
                }
              ]
        },
        {   
            xtype: 'container',
            //title: 'Informacion',
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Cuenta',
                    name : 'cue_cnombre',
                    renderer: function(value, metadata, record){ 
                        var rec = this.up('dispositivomovilwidgetview').record
                        return rec.get('cue_clinea')+'-'+rec.get('cue_ncuenta')+' '+rec.get('cue_cnombre')
                    }
            	},
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Velocidad',
                    name: 'gps_iVelocidad',
                    renderer: function (value) {
                       
                            return value+' km/h';
                        
                    },
                    itemId:'velocidad',
                    hidden: true
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Dirección',
                    name: 'direccion',
                    itemId: 'direccion',
                    renderer: function (value) {
                        if(value != '') {
                            return value;
                        } else {
                            return 'No definida';
                        }
                    },
                    
                    hidden: false
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Ultima alerta',
                    name : 'sta_dFechaUltimaAlerta',
                    itemId:'ultimaalerta',
                    hidden: true,
                    renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items: [
                        {
                            xtype : 'displayfield',
                            fieldLabel : 'Fecha',
                            name : 'gps_isofechahora',
                            itemId:'fecha',
                            hidden: true,
                            renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
                            margin:'0 10 0 0'
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Fecha GPS',
                            name : 'gps_isorawfechahora',
                            itemId:'fechagps',
                            hidden: true,
                            renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')
                    	}
                        
                    ]
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Alerta',
                    renderer: function(value, metadata, record, rowindex, colindex, store, view){
                        return record.get('sta_cUltimaAlerta')+'-'+record.get('cod_cdescripcion');
                    
                    },
                    itemId:'alerta',
                    hidden: true
            	},{
                    xtype : 'displayfield',
                    fieldLabel : 'Odometro',
                    name : 'gps_iOdometro',
                    itemId:'odometro',
                    hidden: true
                }
            ]
        },
        {   
            xtype: 'container',
            hidden: false,
            itemId: 'cuentaFields',
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tipo',
                    name: 'tip_cdescripcion' ,
                    itemId:'tipo'
                }/*,{
                    xtype : 'displayfield',
                    fieldLabel : 'Dealer',
                    name : 'cue_clinea'
        		}*/
            ]
        },
        {   
            xtype: 'container',
          //  title: 'Datos del Vehiculo',
            hidden: true,
            itemId: 'vehicleFields',
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Marca',
                    name: 'BrandName' 
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Modelo',
                    name: 'ModelName'
                },{
                    xtype: 'displayfield',
                    name: 'Year',
                    fieldLabel: 'Año'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Matrícula',
        			name : 'Domain'
        		},{
                    xtype : 'displayfield',
                    fieldLabel : 'Color',
                    name : 'Colour'
        		},{
                	xtype:'image',
                    maxWidth: 200,
                    itemId: 'photo',
                    hidden: true
        		},{
                	xtype:'box',
                    itemId: 'noImage',
                    html: getLocale('No hay Imagen cargada.'),
                    hidden: true
        		}
            ]
        },
        {   
            xtype: 'container',
        //    title: 'Datos de la Persona',
            itemId: 'personaFields',
            hidden: true,
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype: 'displayfield',
                    name: 'PersonaFechaNacimiento',
                    fieldLabel: 'Nacimiento',
                    //renderer: function(value){
                    //    return value.slice(0, 10);
                    //}
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Documento',
                	name : 'PersonaDNI'
        		},{
                    xtype: 'combobox',
                    fieldLabel: 'Género',
                    store: ['Masculino','Femenino'],
                    //multiselect : false,
                    editable : false,
                    queryMode: 'local',
                    disabled: true,
                    typeAhead: false,
                    name: 'PersonaGenero'
                }
            ]
        },
        {   
            xtype: 'container',
         //   title: 'Datos de la Mascota',
            itemId: 'mascotaFields',
            hidden: true,
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype: 'displayfield',
                    name: 'MascotaFechaNacimiento',
                    fieldLabel: 'Fecha de Nacimiento'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Raza',
                    name : 'MascotaRaza'
        		},{
                    xtype : 'displayfield',
                    fieldLabel : 'Color',
                    name : 'MascotaColor'
        		},{
                    xtype: 'combobox',
                    fieldLabel: 'Sexo',
                    store: ['Masculino','Femenino'],
                    //multiselect : false,
                    editable : false,
                    queryMode: 'local',
                    typeAhead: false,
                    disabled: true,
                    name: 'MascotaGenero'
                }
            ]
        },
        {   
            xtype: 'container',
          //  title: 'Datos del dispositivo móvil',
            itemId: 'otroFields',
            hidden: true,
            anchor: '100%',
            layout: 'anchor',
            items: [
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Otros datos',
                    name : 'OtroTextolibre',      
                    itemId:'OtroTextolibre',
            		allowBlank : false
        		}
            ]
        },{
            xtype: 'container',
            hidden: true,
           // title: 'Datos compañía telefónica',
            layout: 'anchor',
            items: [
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Sim card GPRS 1',
                    name : 'SIM1'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Compañía 1',
                    name : 'CompaniaSIM1'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Sim card GPRS 2',
                    name : 'SIM2'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Compañía 2',
                    name : 'CompaniaSIM2'
                }
            ]
        }
    ],
    // cierro items
    initComponent: function(){
        this.callParent();
    }
});