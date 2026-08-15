
Ext.define('AdministratorSearch.view.t_autoridadesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_autoridadesformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor: '100%'
    },
    items : [
        {
			xtype : 'textfield',
			name : 'aut_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'combo',
            fieldLabel : 'Dealer',
            itemId: 'dealer',
    		name : 'aut_cdealer',
			//store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            queryMode: 'local'
	    },{
                
            xtype : 'combo',
        	fieldLabel : 'Provincia / Estado',
            itemId: 'provincia',
			name : 'aut_cprovincia',			
        	displayField : 'pro_cdescripcion',
    		valueField : 'pro_ccodigo',
            anchor : '100%',
            queryMode: 'local'
		},
        {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype : 'combo',
                    fieldLabel : 'Destino',
                    itemId: 'destino',
                    name : 'aut_idestino',
        			displayField : 'tad_cnombre',
                    multiSelect: false,
        			valueField : 'Id',
                    flex:1,
                    queryMode: 'local'
        	    },
                {
                    xtype: 'button',
                    margin: '0 0 0 5',
                    itemId: 'destinoconfig',
                    text: 'Configurar destino',
                    hidden: true
                }
            ]
        }
        
        ,{
            xtype:'displayfield',
            value: getLocale('Eventos a reportar manualmente')
		},{
            xtype: 'combo',
            itemId: 'comboeventos',
          //  fieldLabel: '',
           // allowBlank: false,
        	name: 'aut_meventos',
            multiSelect: true,
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
		    valueField: 'cod_ccodigo',
            width:'100%'
        },
        {
            xtype : 'textarea',
			fieldLabel : '',
			name: '_eventos'
		},{
            xtype:'displayfield',
            value: getLocale('Eventos a reportar automaticamente')
    	},{
            xtype: 'combo',
            itemId: 'comboeventosauto',
           // fieldLabel: '',
           // allowBlank: false,
            name: 'aut_meventosauto',
            multiSelect: true,
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
		    valueField: 'cod_ccodigo',
            width:'100%'
        },
        {
            xtype : 'textarea',
			fieldLabel : '',
			name: '_eventosauto',
            itemId: '_eventosauto'
		},{
            xtype:'displayfield',
            value: getLocale('Eventos a reportar autoprocesados')
        },{
            xtype: 'combo',
            itemId: 'comboeventosreportatautoprocesados',
           // fieldLabel: '',
           // allowBlank: false,
            name: 'aut_cautoprocesados',
            multiSelect: true,
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
		    valueField: 'cod_ccodigo',
            width:'100%'
        },
        {
            xtype : 'textarea',
			fieldLabel : '',
			name: '_eventosreportatautoprocesados',
            itemId: '_eventosreportatautoprocesados'
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});