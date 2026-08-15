Ext.define('Common.view.CuentaSelectorHelperView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.cuentaselectorhelperview',
    title : '',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    autoDestroy:true,
    bodyStyle: {
        background: '#efefef'
    },
    items : [
       
         {
            xtype : 'gridpanel',
    		itemId : 'gridtodos',
            //store: 'SoftguardAlarmasSmsStore',
            flex: 1,
            autoDestroy:true,
            autoScroll : true,
            scroll: true,
            title: 'Disponibles',
           // selModel: Ext.create('Ext.selection.CheckboxModel'),
           selModel: {
               selType : 'rowmodel', // rowmodel is the default selection model
               mode    : 'MULTI'     // Allows selection of multiple rows
            },
            columns : [
                {
                    xtype: 'gridcolumn',
                    header: 'Dealer',
                    dataIndex: 'cue_clinea',
                    flex: 1
                },{
            		xtype : 'gridcolumn',
        			header : 'Cuenta',
        			dataIndex : 'cue_ncuenta',
                    /*renderer:function (value,obj,record) {
                        return record.get('Brand')+' '+record.get('Model')+' '+record.get('avp_cMatricula');
                    },*/
                	flex: 1                  
        		},{
                    xtype: 'gridcolumn',
                    header: 'Nombre',
                    dataIndex:'cue_cnombre',
                    flex: 5
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
                         width:80
                    },{
                        xtype:'button',
                        text: 'Quitar',
                        iconCls: 'icon-cancel',
                        itemId:'quitar',
                         width:80
                    }
                ]
        },{
            xtype : 'gridpanel',
        	itemId : 'gridselecionados',
            flex: 1,
            autoDestroy:true,
            autoScroll : true,
            scroll: true,
            title: 'Seleccionados',

            columns : [
                {
                    xtype: 'gridcolumn',
                    header: 'Dealer',
                    dataIndex: 'cue_clinea',
                    flex: 1
                },{
            		xtype : 'gridcolumn',
        			header : 'Cuenta',
        			dataIndex : 'cue_ncuenta',
                    /*renderer:function (value,obj,record) {
                        return record.get('Brand')+' '+record.get('Model')+' '+record.get('avp_cMatricula');
                    },*/
                	flex: 1                  
        		},{
                    xtype: 'gridcolumn',
                    header: 'Nombre',
                    dataIndex:'cue_cnombre',
                    flex: 5
                }
                
            ],            
           flex:1
       }
    ],

    initComponent: function () {
        this.callParent(arguments);
     
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text:'Listo',
                    iconCls: 'icon-accept',               
                    itemId:'listo'
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