Ext.define('IPRSManager.view.IprsCommGridView', {
    extend : 'Ext.grid.GridPanel',
    alias: 'widget.iprscommgridview',
    title: 'Datos',
    columns: [
        {
            text: 'Fecha',
            xtype: 'datecolumn',
            format:'Y-m-d G:i:s',
            dataIndex: 'TRawFechaHora',
            width: 200
        }, {
            text: 'AssemblyClassName',
            dataIndex: 'AssemblyClassName',
            width: 120,
            renderer: function(v){
                // limpio el packetparser del nombre
                return v.replace('PacketParser','');
            }
        },
        {
            text: 'Data',
            dataIndex: 'Data',
            renderer : function(value, metadata, record, colIndex,store, view) {
                if (record.get('Error_code')>0) {
            		metadata.tdAttr  = 'bgcolor="red"';
    			}												
				return value; 
			},
            flex: 1
        }
        
    ],
    
    initComponent: function () {
                
        this.callParent(arguments);     
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: '',
                    text: 'Comunes',
                    enableToggle: true,
                    toggleGroup: 'filtro',
                    itemId:'filtroComunes'
                },{
                    iconCls: '',
                    text: 'Errores',
                    enableToggle: true,
                    toggleGroup: 'filtro',
                    itemId:'filtroErrores'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    }
});