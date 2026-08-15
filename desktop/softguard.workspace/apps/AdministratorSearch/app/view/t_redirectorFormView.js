
Ext.define('AdministratorSearch.view.t_redirectorFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_redirectorformview'],
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
			name : 'trd_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'combo',
            fieldLabel : 'Dealer',
            itemId: 'dealer',
    		name : 'trd_cdealer',
			//store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
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
                    name : 'trd_idestino',
        			displayField : 'rrd_cnombre',
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
        
        /*,{
            xtype:'displayfield',
            value: getLocale('Eventos a reportar')
		},*//*{
            xtype: 'combo',
            itemId: 'comboeventos',
          //  fieldLabel: '',
           // allowBlank: false,
        	name: 'trd_ceventos',
            multiSelect: true,
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
		    valueField: 'cod_ccodigo',
            width:'100%'
        },*/
        
        ,{
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Eventos a reportar',
            itemId:'eventosfieldset',
            items:[
                
                {
                    xtype : 'textarea',
        			fieldLabel : 'Seleccionados',
                    height:120,
        			name: '_eventos',
                    itemId:'eventos'
                    
        		},{
                    xtype:'textfield',
                    hidden:true,
                    name: 'trd_ceventos',
                    itemId:'eventoshide'
                },{
                    xtype:'button',
                    text:'Modificar',
                    itemId:'agregarevento'
                }
            ]
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