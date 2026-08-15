Ext.define('AccessControl.view.AC_AccesoPersonaVehiculosView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.ac_accesopersonavehiculosview'],
    title: '',
    
    //autoHeight: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
        
        
    },

    height:300,
    scrollable:true,
    activeHelp: true,
    columns: [
         
		{
			xtype:'actioncolumn', 
			header: 'Foto',
			width:50,
			renderer: function(_, __, record){
                var data = record.getData();
				var	photo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+';
                if (data.usu_cmetadata) {
                    var metadata = JSON.parse(data.usu_cmetadata);
                    return '<img src="/gallery/' + metadata.photo + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >';
                }
                return '<img src="' + photo + '" width="16" heigth="16" class="img-thumbnail" style="float:right" >';
			},
			
			iconCls: 'icon-photo',  // Use a URL in the icon config
			tooltip: 'Ver imagen',
			handler: function(grid, rowIndex, colIndex) {
				var record = grid.getStore().getAt(rowIndex);
                var data = record.getData();
				var	photo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuNSA3Yy4yNzYgMCAuNS4yMjQuNS41di41MTFjMCAuNzkzLS45MjYuOTg5LTEuNjE2Ljk4OWwtMS4wODYtMmgyLjIwMnptLTEuNDQxIDMuNTA2Yy42MzkgMS4xODYuOTQ2IDIuMjUyLjk0NiAzLjY2NiAwIDEuMzctLjM5NyAyLjUzMy0xLjAwNSAzLjk4MXYxLjg0N2MwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMWgtMTN2MWMwIC41NTItLjQ0OCAxLTEgMWgtMS41Yy0uNTUyIDAtMS0uNDQ4LTEtMXYtMS44NDdjLS42MDgtMS40NDgtMS4wMDUtMi42MTEtMS4wMDUtMy45ODEgMC0xLjQxNC4zMDctMi40OC45NDYtMy42NjYuODI5LTEuNTM3IDEuODUxLTMuNDUzIDIuOTMtNS4yNTIuODI4LTEuMzgyIDEuMjYyLTEuNzA3IDIuMjc4LTEuODg5IDEuNTMyLS4yNzUgMi45MTgtLjM2NSA0Ljg1MS0uMzY1czMuMzE5LjA5IDQuODUxLjM2NWMxLjAxNi4xODIgMS40NS41MDcgMi4yNzggMS44ODkgMS4wNzkgMS43OTkgMi4xMDEgMy43MTUgMi45MyA1LjI1MnptLTE2LjA1OSAyLjk5NGMwLS44MjgtLjY3Mi0xLjUtMS41LTEuNXMtMS41LjY3Mi0xLjUgMS41LjY3MiAxLjUgMS41IDEuNSAxLjUtLjY3MiAxLjUtMS41em0xMCAxYzAtLjI3Ni0uMjI0LS41LS41LS41aC03Yy0uMjc2IDAtLjUuMjI0LS41LjVzLjIyNC41LjUuNWg3Yy4yNzYgMCAuNS0uMjI0LjUtLjV6bTIuOTQxLTUuNTI3cy0uNzQtMS44MjYtMS42MzEtMy4xNDJjLS4yMDItLjI5OC0uNTE1LS41MDItLjg2OS0uNTY2LTEuNTExLS4yNzItMi44MzUtLjM1OS00LjQ0MS0uMzU5cy0yLjkzLjA4Ny00LjQ0MS4zNTljLS4zNTQuMDYzLS42NjcuMjY3LS44NjkuNTY2LS44OTEgMS4zMTUtMS42MzEgMy4xNDItMS42MzEgMy4xNDIgMS42NC4zMTMgNC4zMDkuNDk3IDYuOTQxLjQ5N3M1LjMwMS0uMTg0IDYuOTQxLS40OTd6bTIuMDU5IDQuNTI3YzAtLjgyOC0uNjcyLTEuNS0xLjUtMS41cy0xLjUuNjcyLTEuNSAxLjUuNjcyIDEuNSAxLjUgMS41IDEuNS0uNjcyIDEuNS0xLjV6bS0xOC4yOTgtNi41aC0yLjIwMmMtLjI3NiAwLS41LjIyNC0uNS41di41MTFjMCAuNzkzLjkyNi45ODkgMS42MTYuOTg5bDEuMDg2LTJ6Ii8+PC9zdmc+';
                if (data.usu_cmetadata) {
                    var metadata = JSON.parse(data.usu_cmetadata);
                    var photo = '/gallery/' + metadata.photo;
                }
				
				var tbar = [];
			
				var w = Ext.widget('window', {
					title : 'Foto: ',
					height : 252,
					width : 360,
					closeAction : 'destroy',
					border : false,
					layout : 'fit',
					record: record,
					tbar:tbar,
					items : [
						{
							xtype:'image',
							src : photo,
							id: 'fotoImage'
						}
					],
					autoShow: true,
					modal:true
				});
			}
		},



//-------------------------------		

         {
            xtype: 'gridcolumn',
            header: 'Marca',
            dataIndex: 'usu_cmetadata',
            flex: 1,
            renderer: function(_, __, record) {
                var data = record.getData();
                if (!data.usu_cmetadata) {
                    return '---';
                }
                var metadata = JSON.parse(data.usu_cmetadata);
                return metadata.brand;
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Modelo',
            dataIndex: 'usu_cmetadata',
            flex: 1,
            renderer: function(_, __, record) {
                var data = record.getData();
                if (!data.usu_cmetadata) {
                    return '---';
                }
                var metadata = JSON.parse(data.usu_cmetadata);
                return metadata.model;
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Matrícula',
            dataIndex: 'usu_cmetadata',
            flex: 1,
            renderer: function(_, __, record) {
                var data = record.getData();
                if (!data.usu_cmetadata) {
                    return '---';
                }
                var metadata = JSON.parse(data.usu_cmetadata);
                return metadata.domain;
            }

        }, {
            xtype: 'gridcolumn',
            header: 'Año',
            dataIndex: 'usu_cmetadata',
            flex: 1,
            renderer: function(_, __, record) {
                var data = record.getData();
                if (!data.usu_cmetadata) {
                    return '---';
                }
                var metadata = JSON.parse(data.usu_cmetadata);
                return metadata.year;
            }
        }    

    ],

    initComponent: function () {
        var comboSearch = [
            ['fir_ccuenta', getLocale('Cuenta')],
            ['fir_cnombre', getLocale('Nombre')]
        ];



        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add'
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                disabled: true,
                action: 'delete',
                itemId: 'delete'
            }            
            ] // cierro items
        });
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action=delete]').setDisabled(selections.length === 0);
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        this.addDocked(toolbar);
        if(this.hideAddEdit){
            toolbar.hide();

        }
    }
});