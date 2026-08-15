Ext.define('WebRemoto.view.PosponerCierreView', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.posponercierreview', 
    autoScroll: true,
    autoHeight: true,
    title: '',   
	//layout: 'vbox',
    //minHeight: 300,
    items: [
            {
            xtype: 'grid',
            flex:1,           
            autoScroll: true,
            emptyText: getLocale('No hay horarios configurados'),           
            layout: 'anchor',
            itemId:'gridHorarios',
            title:'Horarios',
            tbar:["->",{
                xtype:'container',
                itemId:'timezone' 
            }],
            columns: [
            	{
        			xtype: 'gridcolumn',
        			dataIndex: 'hor_ndiaapertura',
        			header: 'Dia Apertura',
                    renderer: function(value){										
        				var store = Ext.data.StoreManager.get('TablaDiasStore');
        				var record = store.findRecord('Value', value);							
        				if(record == undefined)
        					return value;
        				else					
        					return record.get('Name');										
        			}
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'hor_choraapertura',
        			header: 'Hora Apertura',
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'hor_ndiacierre',
        			header: 'Dia Cierre',
                    renderer:  function(value){										
        				var store = Ext.data.StoreManager.get('TablaDiasStore');
        				var record = store.findRecord('Value', value);							
        				if(record == undefined)
        					return value;
        				else					
        					return record.data.Name;										
        			}
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'hor_choracierre',
        			header: 'Hora Cierre'
        		}]
            },{
            xtype: 'grid',
            flex:1,           
            autoScroll: true,
            itemId:'grid', 
            emptyText: getLocale('No hay horarios configurados'),
            title:'Horarios Alternativos',
            tbar:["->",{
                xtype:'container',
                itemId:'timezone2' 
            }],
            columns: [
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'alt_ndiaapertura',
        			header: 'Dia Apertura',
                    renderer: function(value){										
        				var store = Ext.data.StoreManager.get('TablaDiasStore');
        				var record = store.findRecord('Value', value);							
        				if(record == undefined)
        					return value;
        				else					
        					return record.get('Name');										
        			}
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'alt_choraapertura',
        			header: 'Hora Apertura',
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'alt_ndiacierre',
        			header: 'Dia Cierre',
                    renderer:  function(value){										
        				var store = Ext.data.StoreManager.get('TablaDiasStore');
        				var record = store.findRecord('Value', value);							
        				if(record == undefined)
        					return value;
        				else					
        					return record.data.Name;										
        			}
        		},
        		{
        			xtype: 'gridcolumn',
        			dataIndex: 'alt_choracierre',
        			header: 'Hora Cierre'
        		}]
            },{
                xtype:'container',
                layout:'hbox',
                itemId:'setminutes',
                disabled:true,
                height: 80,
                items:[
                    {
                        xtype:'numberfield',
                        minValue:0,
                        maxValue:1435,
                        labelWidth: 100,
                        fieldLabel:'Minutos para nueva accion',
                        itemId:'minutos'
                    },{
                        xtype:'displayfield',
                        itemId:'fecha',
                        margin:'2 0 0 10'
                    }
                ]
            }
	],
    
    initComponent: function () {
       
        
         this.callParent(arguments);
          var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                    { xtype: 'button', text: 'Aceptar', action: 'save', itemId:'save', iconCls: 'save', disabled:true},
                ]
                
          })
         
         this.addDocked(toolbar);
    }
    });