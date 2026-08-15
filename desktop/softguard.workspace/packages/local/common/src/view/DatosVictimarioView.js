//MIGRADO2024
Ext.define('Common.view.DatosVictimarioView', {
    extend:'Ext.form.Panel',
    alias : 'widget.datosvictimarioview',
    //frame: true,
    //autoScroll: true,
    //layout: 'vbox',
    style: 'margin: 0 0 0 7px;',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Apellido',
    	    name:'cue_nAutoMonitoreo',
            displayField : 'Name',
            itemId: 'datosApellido',
            width: 200,
            labelWidth: 75,
            // regex: /^[A-Za-z ]+$/,
            // invalidText : 'Ingrese solo letras y espacios',
            // vtype:'alpha',
            validator: function(value) {
                if (value != ''){
                    return true
                }
                return 'Este campo es obligatorio'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
    	    name:'cue_nAutoMonitoreo',
            itemId: 'datosNombre',
            displayField : 'Name',
            width: 200,
            labelWidth: 75,
            // regex: /^[A-Za-z ]+$/,
            // invalidText : 'Ingrese solo letras y espacios',
            // vtype:'alpha',
            validator: function(value) {
                if (value != ''){
                    return true
                }
                return 'Este campo es obligatorio'
            }
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'DNI',
    	    name:'cue_nAutoMonitoreo',
            itemId: 'datosDni',
            displayField : 'Name',
            width: 200,
            labelWidth: 75,
            maxValue: 99999999,
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reestriccion',
            itemId: 'datosRestriccion',
            store:[
                [0, getLocale('No')],
                [1, getLocale('Si')]
            ],
            name:'cue_nPrioridad',
            width: 200,
            labelWidth: 75
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin:'0 0 5 0',
            items:[
                {
                    xtype: 'textfield',
                    fieldLabel: 'Calle',
                    itemId: 'datosCalle',
    	            name:'cue_nAutoMonitoreo',
                    displayField : 'Name',
                    width: 200,
                    labelWidth: 75,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Numero',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'datosNumero',
                    displayField : 'Name',
                    width: 100,
                    labelWidth: 50,
                    style: 'margin: 0 0 0 7px;'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Piso',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'datosPiso',
                    displayField : 'Name',
                    width: 100,
                    labelWidth: 50,
                    style: 'margin: 0 0 0 7px;',
                    maxValue: 20,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Departamento',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'datosDpto',
                    displayField : 'Name',
                    width: 125,
                    labelWidth: 75,
                    style: 'margin: 0 0 0 7px;'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin:'0 0 5 0',
            items:[
                {
                    xtype: 'textfield',
                    fieldLabel: 'Partido',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'datosPartido',
                    displayField : 'Name',
                    width: 200,
                    labelWidth: 75,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Localidad',
    	            name:'cue_nAutoMonitoreo',
                    itemId: 'datosLocalidad',
                    displayField : 'Name',
                    width: 200,
                    labelWidth: 75,
                    style: 'margin: 0 0 0 7px;'
                },
                {
					xtype : 'button',
                    fieldLabel: 'Ubicacion',
					text : 'Seleccionar en Mapa',
					iconCls : 'icon-map',
					action: 'map',
                    style: 'margin: 0 0 0 7px;'
				}
              
            ]
        },
        {
			xtype : 'button',
			text : 'Cargar Foto',
			iconCls : 'icon-photo',
            itemId: 'botonPhoto',
			action: 'photo',
            width: 200,
            labelWidth: 75,
            style: 'margin: 0 0 5px 0;'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Estado',
            itemId: 'datosEstado',
            store:[
                [0, getLocale('Inactivo')],
                [1, getLocale('Activo')]
            ],
            name:'cue_nPrioridad',
            width: 200,
            labelWidth: 75
        },{
            xtype: 'victimarioscuentasview',
            height: 550,
            autoScroll: true
        }/*,
        {
            xtype: 'container',
           
            layout: 'fit',
            items: [
                {
                    xtype : 'grid',
                     title: 'Cuentas Asociadas',
                     bbar: [
                            { xtype: 'button', text: 'Button 1' }
                    ],
                    columns:[
                        {
                            xtype : 'gridcolumn',            
                            header : 'Cuenta',
                            dataIndex : 'vic_cNombre',
                            flex: 1                          
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Nombre Cuenta',
                            dataIndex : 'vic_cNombre',
                            flex: 1                              
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Teléfono',
                            dataIndex : 'vic_cNombre',
                            flex: 1     
                        }                     
                    ]
                }
            ]
			
        } */         
/*,
        {
            xtype: 'panel',
            collapsible: true,
            title: '',
            layout: 'anchor',
            width: '80%',
            heigth: 300,
            items: [
               {
                   xtype: 'smartpanicshelperview',
                    anchor: '100%',
                }
            ]
        }*/
        
        
    ]// cierro items
           
});