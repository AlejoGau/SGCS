//MIGRADO2024
Ext.define('Common.view.m_telefonoBulkChangeGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.m_telefonosbulkchangegridview',
    title: 'Telefonos',
    autoHeight: true,   
    columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'cue_cnombre',
                header: 'Cuenta',
                sortable: true,
                flex:1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'tel_cnombre',
                header: 'Nombre',
                sortable: true,
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'tel_ctelefono',
                header: 'Teléfono',
                sortable: true,
                width: 100
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'tel_cobservacion',
                header: 'Observación',
                sortable: true,
                hidden: true,
                flex:1
            }
        ],
    initComponent: function () {
        this.callParent(arguments);
            
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Modificar todos',
                    iconCls: 'save',
                    action: 'save',
                    hidden: false
                }
            ]// cierro items
         }); 
         
         this.addDocked(toolbar);
    } // cierro init
});