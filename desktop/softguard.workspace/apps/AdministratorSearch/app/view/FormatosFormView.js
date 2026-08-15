Ext.define('AdministratorSearch.view.FormatosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.formatosformview'],
    preventHeader: true,
    frame: true,
    autoHeight : true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        anchor : '100%'
	},
     layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [
        {
        	xtype : 'textfield',
			name : 'for_cformato',
            fieldLabel: 'Formato'
		},{
			xtype : 'textfield',
			name : 'for_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
           // regex: /^[A-Za-z0-9 \.\,\-\_\/]*$/,
            //regexText:getLocale('Los caracteres válidos son<br/>- Números<br/>- Letras mayúsculas y minúsculas<br>- Espacios y caracteres .,-_/')  
		},{
            xtype: 'fieldset',
            layout: 'hbox',
            title: 'Alarma',
            margin:'0 0 5 0',
            items:[{
                        xtype: 'button',
                        text:'Seleccionar alarma',
                        iconCls: 'icon-bell',
                        itemId:'evento',
                        margin:'0 5 0 0'
                    },{
                        xtype:'displayfield',
                        itemId:'nombreevento',
                        width:220
                    },{
                        xtype:'button',
                        text:'',
                        itemId:'limpiarevento',
                        iconCls: 'icon-cancel'
                    },{
                        xtype:'displayfield',
                        itemId:'codevento',                        
    		            name : 'for_calarma',
                        hidden:true
                    }
                ]
        },{
            xtype:'container',
            itemId:'selectores',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items:[
                    {
                        xtype : 'gridpanel',
                    	itemId : 'gridtodos',
                        flex: 1,
                        autoScroll : true,
                        scroll: true,
                        title: 'Disponibles',
                        selType:'checkboxmodel',
                            selModel: {
                                checkOnly: true,
                                mode: "MULTI"
                            },
                        columns : [
                            {
                        		xtype : 'gridcolumn',
                    			header : 'Receptores',
                    			dataIndex : 'rec_cdescripcion',
                                sorter : true,
                            	flex:1                    
                    		}
                            
                        ]
                    },{
                        xtype:'container',
                        layout:'vbox',
                        margin:'120 5 0 5',
                        itemId:'botones',
                        items: [
                                {
                                    xtype:'button',
                                    text: 'Agregar',
                                    iconCls: 'icon-add',       
                                    itemId:'agregar',
                                     margin:'0 0 5 0',
                                     width:120
                                },{
                                    xtype:'button',
                                    text: 'Quitar',
                                    iconCls: 'icon-cancel',
                                    itemId:'quitar',
                                    width:120
                                }
                            ]
                    },{
                        xtype : 'gridpanel',
                    	itemId : 'gridselecionados',
                        flex: 1,
                        autoScroll : true,
                        scroll: true,
                        title: 'Seleccionados',
                        selType:'checkboxmodel',
                            selModel: {
                                checkOnly: true,
                                mode: "MULTI"
                            },
                        columns : [
                            {
                            	xtype : 'gridcolumn',
                    			header : 'Receptores',
                    			dataIndex : 'rec_cdescripcion',
                                sorter : true,
                            	flex:1                    
                    		}
                            
                        ],            
                       flex:1
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
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         
         
          var toolbarTodos = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype:'textfield',
                    fieldLabel : '',                    
                    itemId:'query',
                    flex:1
                    
                },{
                    xtype:'button',
                    text:'Buscar',
                    itemId:'buscar'
                },{
                    xtype:'button',
                    text:'Todos',
                    itemId:'todos'
                }
            ]// cierro items
         }); 

         this.down('#gridtodos').addDocked(toolbarTodos);
	} // cierro init
});