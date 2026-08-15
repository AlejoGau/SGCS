//MIGRADO2024
Ext.define('Common.view.MedicoInfoGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.medicalinfoview', 
    selType: 'checkboxmodel',
    autoHeight: true,
    columns: [
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_iid',
                header: 'Id',
                sortable: true,
    			hidden:true,
                editor: {
                    xtype: 'textfield'
                },
                width: 40
            },{
                xtype: 'gridcolumn',
                dataIndex: 'mnf_cprotegido',
                header: 'Protegido',
                sortable: true,
                editor: {
                    xtype: 'textfield'
                },
                width: 150
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_casociado',
                header: 'Asociado',
                sortable: true,
                editor: {
                    xtype: 'textfield'
                },
                width: 150
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_cdoctor',
                header: 'Médico',
                sortable: true,             				
				renderer: function(value){										
					var store = Ext.data.StoreManager.get('TablaMedicosStore');
					var record = store.findRecord('med_ccodigo', value);
					if(record == undefined)
						return '';
					else					
						return record.get('med_cnombre');
				},
                width: 150
            },
            {
                xtype: 'datecolumn',
                dataIndex: 'mnf_dfechanacimiento',
                format:'d/m/Y h:i',
                header: 'Fecha de Nacimiento',
                /*renderer: function(value){
                    if (value && value.getFullYear()>1900){
                        return Ext.Date.format(value,'d-m-Y');
                    } else{
                        return '';
                    }
                },*/
                sortable: true,
                width: 120
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_nambulancia',
                header: 'Ambulancia',
                sortable: true,
                renderer: function(value){    									
					var store = Ext.data.StoreManager.get('SiNoStore');
					var record = store.findRecord('Value', value);							
					if(record == undefined)
						return '';
					else					
						return record.get('Name');										
				},
                width: 100
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_ndiscapacitado',
                header: 'Discapacitado',
                sortable: true, 
                renderer: function(value){        								
					var store = Ext.data.StoreManager.get('SiNoStore');
					var record = store.findRecord('Value', value);							
					if(record == undefined)
						return '';
					else					
						return record.get('Name');										
				},
                width: 100
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_nedad',
                header: 'Edad',
                sortable: true,
                width: 40
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_nsexo',
                header: 'Género',
                sortable: true,
                renderer: function(value){            							
					var store = Ext.data.StoreManager.get('Common.store.SoftguardGeneroStore');
					var record = store.findRecord('Value', value);							
					if(record == undefined)
						return '';
					else					
						return record.get('Name');										
				},
                width: 50
            },
            {
                xtype: 'booleancolumn',
                dataIndex: 'mnf_nvivesolo',
                header: 'Vive Solo',
                sortable: true,
                renderer: function(value){            							
					var store = Ext.data.StoreManager.get('SiNoStore');
					var record = store.findRecord('Value', value);							
					if(record == undefined)
						return '';
					else					
						return record.get('Name');										
				},
                width: 60
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_tobservaciones',
                header: 'Observaciones',
                sortable: true,
                width: 150
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'mnf_cobrasocial',
                header: 'Seguro medico',
                sortable: true,                 			
				renderer: function(value){										
					var store = Ext.data.StoreManager.get('ComboObrasSocialesStore');
					var record = store.findRecord('med_ccodigo', value);
					if(record == undefined)
						return '';
					else					
						return record.get('med_cnombre');
				},
                width: 150
            }
        ],
        initComponent: function () {

    
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                   items: [
                    /*{
                        text: 'Guardar',
                        iconCls: 'save',
                        action: 'save',
                        itemId: 'save'
                    },
                    {xtype: 'tbseparator'},
                    */
                    {
                        iconCls: 'icon-add',
                        text: 'Agregar',
                        action: 'add'
                    }, {
                        iconCls: 'icon-delete',
                        text: 'Eliminar',
                        disabled: true,
                        action: 'delete',
                        itemId: 'delete'
                    }]
                 }); 
             this.callParent(arguments);
             this.addDocked(toolbar);
             var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
                dock: 'bottom',
                displayInfo: true
            });
            this.addDocked(pagingtoolbar);  
    } // cierro init
});