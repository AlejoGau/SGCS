//MIGRADO2024
Ext.define('Common.view.SerTecAsignacionStockView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtecasignacionstockview'],
    title : '',
    autoHeight : true,   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],
    columns : [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-magnifier',
                tooltip: 'Buscar un deposito que tenga disponible este producto',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecasignacionstockview');
                    var rec = grid.getStore().getAt(rowIndex); 
                    view.fireEvent('buscardeposito',rec,view);
                }
            }]
       },
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'idproducto',
            dataIndex : 'IdProduct',
            hidden:true
    	},{
            xtype : 'gridcolumn',            
            header : 'Cantidad necesaria',
            dataIndex : 'spr_iCantidad',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Stock origen',
            dataIndex : '_stockorigen',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Stock tecnico',
            dataIndex : '_stocktecnico',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Asignar',
            dataIndex : '_falta',
            flex: 1,
            getEditor: function(record) {
                //if (record.get('_falta') >= 0) {
                    return Ext.create('Ext.grid.CellEditor', {
                        field: {
                    		xtype: 'numberfield',
            				name: '_falta'	
            			}
                    });
                //}
            }
        },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: '',
                tooltip: 'Asignar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecasignacionstockview');
                    var rec = grid.getStore().getAt(rowIndex); 
                    
                    
                    if(rec.get('_falta') > rec.get('_stockorigen')) {
                        Ext.MessageBox.show({
                               title:'Asignar productos',
                               translate:false,
                               msg: getLocale('El deposito solo dispone de')+' '+rec.get('_stockorigen')+' '+getLocale('Quiere que se asigne esta cantidad?'),
                               buttons: Ext.MessageBox.YESNO,
                               autoDestroy : true,
                               fn: function (btn, text){                                    
                                    if(btn == 'yes') {
                                       rec.set('_falta',rec.get('_stockorigen')) 
                                       view.fireEvent('asignar',rec,view);
                                    } else if(btn == 'no') {
                                       
                                    } else {
                                        //no hago nada
                                    }
                                },
                               icon: Ext.MessageBox.QUESTION
                           });
                    } else {
                        view.fireEvent('asignar',rec,view);
                    }
                    
                },
                getClass: function(value,metadata,record,a,b,c,view){
                    if(record.get('_falta') <= 0 || record.get('_stockorigen') <= 0  || this.up('servtecasignacionstockview').down('#depositoorigen').getValue() == null|| this.up('servtecasignacionstockview').down('#tecnicodestino').getValue() == null) {
                        return 'x-hide-display'; 
                    } else{
                        return 'icon-user-go';
                    }
                    
                },
            }]
       }
        
        
        
        
    ],
    
    initComponent: function () {
       
        
   
        this.callParent(arguments);     
      
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
            		xtype : 'combo',
                    margin: '0 5 0 0',
        			fieldLabel : 'Deposito Origen',
                    itemId: 'depositoorigen',
        			name : 'cue_clinea',
        			displayField : 'Name',
        			valueField : 'Id',
                    queryMode: 'local',
        			flex : 1
        	    },{
                	xtype : 'combo',
                    margin: '0 5 0 0',
        			fieldLabel : 'Tecnico Destino',
                    itemId: 'tecnicodestino',
        			name : 'cue_clinea',
        			displayField : 'Name',
        			valueField : 'Id',
                    queryMode: 'local',
        			flex : 1
        	    },
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});