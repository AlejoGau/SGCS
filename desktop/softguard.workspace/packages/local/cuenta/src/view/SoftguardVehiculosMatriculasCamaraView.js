Ext.define('Cuenta.view.SoftguardVehiculosMatriculasCamaraView', {
    extend:'Ext.grid.GridPanel',
    alias: 'widget.gridmatriculascamaraview',
    itemId: 'gridvehicle',
    collapsed: false,
    //autoHeight: true,
    //store: "SoftguardUsuarioStore",
    
    columns: [
            {
                xtype: 'gridcolumn',
                header: 'Matrícula',
                sortable: true,
				dataIndex: "LicensePlate",
                width: 100
            },
            {
                xtype: 'datecolumn',
                header: 'Fecha Creación',
                width: 250,
                format: 'd/m/Y',
                sortable: true,
				dataIndex: "createTime",
                renderer: function(value, metadata,record){
                    if(!value.indexOf('0000-00-00T')){
                        return '';
                    }
                    var date = new Date(value);
                    return Ext.Date.format(date, "d/m/Y h:i:s");
                },
                
            }
        ],
    
 
        initComponent: function () {
            this.callParent(arguments);




           } // cierro initS
});