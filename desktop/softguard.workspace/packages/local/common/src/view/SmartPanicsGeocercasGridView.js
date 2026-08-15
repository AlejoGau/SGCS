//MIGRADO2024
Ext.define('Common.view.SmartPanicsGeocercasGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.smartpanicsgeocercagridview', 
    title: 'Geocerca',
    itemId: 'smartpanicsgeocercagridview',
    anchor: '100%',
    autoHeight: true,
    columns: [
        {
            dataIndex: 'Name',
            header: 'Nombre',
            sortable: true,
            flex:1
        },
        {
            dataIndex: 'GeoType',
            header: 'Tipo',
            sortable: true,
            width: 150,
            renderer: function(value){
                switch (value){
                    case 'I':
                        return getLocale('Inclusión');
                    break;
                    case 'E':
                        return getLocale('Exclusión');
                    break;
                    case 'X':
                        return getLocale('Inclusión ó Exclusión');
                    break;
                }
            }
        },
        {
            dataIndex: 'Status',
            header: 'Estado',
            sortable: true,
            width: 150,
            renderer: function(value){
                switch (value){
                    case '1':
                        return getLocale('Activa');
                    break;
                    case '0':
                        return getLocale('Inactiva');
                    break;
                }
            }
        }
    
    ],
    
    setRecord: function(record){
        this.record=record;
        this.fireEvent('recordchanged', this);
    },
    initComponent: function () {
        this.callParent(arguments);
        //this.addEvents('recordchanged');
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        var profile = this.module.profile?this.module.profile:this.module.get('profile');
        this.addDocked(pagingtoolbar);
        
       // if (profile >= 2){
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                items: [
                  /*  {
                        text: 'Guardar',
                        iconCls: 'save',
                        action: 'save'
                    },
                    {xtype: 'tbseparator'},*/
                    {
                        iconCls: 'icon-add',
                        text: 'Nueva',
                        action: 'add'
                    }, {
                        iconCls: 'icon-delete',
                        itemId: 'btnDelete',
                        action: 'delete',
                        text: 'Eliminar',
                        disabled: true
                    }/*,'-',
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        displayField: 'Name',
                        itemId: 'geocercaDisponible',
                        fieldLabel: 'Disponibles',
                        lastQuery: '',
                        labelWidth: 60
                    },
                    {
                        text: 'Asignar',
                        action: 'geoAssign'
                    },
                    {
                        text: 'Desasignar',
                        action: 'geoDesAssign'
                    }*/
                ]// cierro items
             }); 
                             
            this.addDocked(toolbar);
      //  }
        
    } // cierro init
});