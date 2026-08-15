//MIGRADO2024
Ext.define('Common.view.VictimariosView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.victimariosview'],
    //title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
			dataIndex : 'vic_cNombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Apellido',
    		dataIndex : 'vic_cApellido',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'DNI',
            dataIndex : 'vic_cIdentificacion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Localidad',
            dataIndex : 'vic_cLocalidad',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Posee Restriccion',
            dataIndex : 'vic_iRestriccion',
            flex: 1,
            renderer: function (value) {
                switch(parseInt(value)){
                    case 0:
                        return getLocale('NO')
                    break;
                    case 1:
                        return getLocale('SI')
                    break;
                }
                    
            }
        }
    ],
    
    initComponent: function () {
       
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add',
                    itemId:'add'
                },{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fieldName',
                                            fieldLabel: 'Nombre'          
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'fieldApellido',
                                            fieldLabel: 'Apellido'          
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'fieldDni',
                                            fieldLabel: 'DNI'          
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'fieldLocalidad',
                                            fieldLabel: 'Localidad'          
                                        }
                                        
                                        ,{
                                            xtype:'fieldset',                                                    
                                            padding:'0 0 0 0',
                                            border:0,
                                            layout: 'hbox',
                                            margin:'0 0 10 0',
                                            items:[
                                                {
                                                    xtype:'button',
                                                    text     : 'Seleccione una cuenta',
                                                    iconCls: 'icon-find',
                                                    itemId: 'seleccionarcuenta',
                                                    margin:'0 10 0 0',
                                                    action : 'seleccionarCuenta'
                                                },{
                                                    xtype:'button',
                                                    text     : '',
                                                    iconCls: 'icon-cancel',
                                                    itemId: 'sacarcuenta',
                                                    hidden:true,
                                                    margin:'0 5 0 0',
                                                    listeners: {
                                                        click: function(button) {
                                                            button.up('victimariosview').down('#idcuenta').setValue('')
                                                            button.up('victimariosview').down('#nombrecuenta').setValue('')
                                                            button.hide()
                                                        }
                                                    }
                                                },{
                                                    xtype:'displayfield',                                    
                                                    itemId: 'nombrecuenta',
                                                    name:'nombrecuenta'
                                                },{
                                                    xtype:'displayfield',
                                                    hidden:true,                                    
                                                    itemId: 'idcuenta',
                                                    name:'idcuenta'
                                                }
                                            ]
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },
               /* {
                    iconCls: 'icon-find',
                    text: 'Tecnicos',
                    scope: this,
                    action: 'searchtecnicos'
                },
                {
                    iconCls: 'icon-find',
                    text: 'Instaladores',
                    scope: this,
                    action: 'searchinstaladores'
                },*/'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});